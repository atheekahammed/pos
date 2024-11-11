'use server'
import { prisma } from "@/lib/prisma"
import { IOrder } from "@/models/Order";
import { Sale } from "@/models/Sale";
import { PaymentMethod, PaymentStatus } from "@prisma/client";

export const saleAction = async (): Promise<Sale[]> => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                items: {
                    include: {
                        variant: {
                            include: {
                                attributes: true,
                            },
                        },
                    },
                },
                Customer: true,
                charge: true,
                discount: true,
            },
        });
        return orders

    } catch (error) {
        throw new Error("Faild to load Sales");
    }
}


export const saleUpdateAction = async (
    saleId: number,
    paidAmount: number,
    paymentMethodIn: PaymentMethod,
    paymentAmount: number
): Promise<void> => {
    try {
        if (paymentAmount < paidAmount) {
            throw new Error("Invalid ");
        }

        const payableAmount = paymentAmount - paidAmount;

        let paymentStatus: PaymentStatus;
        if (Number(paidAmount) === Number(paymentAmount)) {
            paymentStatus = PaymentStatus.COMPLETED;
        } else if (Number(paidAmount) > 0 && Number(paidAmount) < Number(paymentAmount)) {
            paymentStatus = PaymentStatus.PARTIAL;
        } else {
            paymentStatus = PaymentStatus.PENDING;
        }


        console.log(paidAmount, paymentAmount, paymentStatus)


        let paymentMethod: PaymentMethod
        if (paymentMethodIn === 'CASH') {
            paymentMethod = PaymentMethod.CASH;
        } else if (paymentMethodIn === 'CARD') {
            paymentMethod = PaymentMethod.CARD;
        } else if (paymentMethodIn === 'BANK') {
            paymentMethod = PaymentMethod.BANK;
        } else {
            paymentMethod = PaymentMethod.INITIAL;
        }



        const updatedSale = await prisma.order.update({
            where: {
                id: saleId,
            },
            data: {
                paidAmount: Number(paidAmount),
                paymentStatus: paymentStatus,
                paymentMethod: paymentMethod,
                payableAmount: Number(payableAmount),
                paymentAmount: Number(paymentAmount),
                updatedAt: new Date(),
            },
        });


    } catch (error: any) {
        console.error("Error updating sale:", error);
        throw new Error(`Failed to update Sale with ID ${saleId}: ${error.message}`);
    }
};
