'use server'
import { prisma } from "@/lib/prisma";
import { CnD } from "@/models/CnD";
import { IOrder, IOrderItem } from "@/models/Order";
import { PaymentMethod, PaymentStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";


async function createDiscount(discount: CnD) {
    const createdDiscount = await prisma.discount.create({
        data: {
            description: discount.description,
            amount: discount.amount,
        },
    });
    return createdDiscount;
}


async function createCharge(charge: CnD) {
    const createdCharge = await prisma.charges.create({
        data: {
            description: charge.description,
            amount: charge.amount,
        },
    });
    return createdCharge;
}


function calculatePayableAmount(items: { price: number; quantity: number }[], chargeAmount: number, discountAmount: number) {
    const itemsTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

    const discountedAmount = (discountAmount / 100) * itemsTotal;
    return itemsTotal + chargeAmount - discountedAmount;
}


export async function createOrder(input: IOrder):Promise<IOrder> {
    const { customerId, discount, charge, items } = input;

    if (!items || items.length === 0) {
        throw new Error("Order must contain at least one item.");
    }

    if (items.some((item) => item.quantity <= 0)) {
        throw new Error("Order items must have a quantity greater than zero.");
    }

    try {
        const variantIds = items.map((item) => item.variantId);
        const variants = await prisma.variant.findMany({
            where: { id: { in: variantIds } },
        });

        if (variants.length !== variantIds.length) {
            const missingVariantIds = variantIds.filter(
                (id) => !variants.some((variant) => variant.id === id)
            );
            throw new Error(
                `Some items reference non-existing variants: ${missingVariantIds.join(", ")}`
            );
        }

        const insufficientStock = variants.filter((variant) =>
            items.some(
                (item) => item.variantId === variant.id && variant.quantity < item.quantity
            )
        );

        if (insufficientStock.length > 0) {
            throw new Error(
                `Cannot create order. Insufficient stock for variants: ${insufficientStock
                    .map((v) => v.id)
                    .join(", ")}`
            );
        }

        let discountId = null;
        let chargeId = null;

        if (discount) {
            const createdDiscount = await createDiscount(discount);
            discountId = createdDiscount.id;
        }

        if (charge) {
            const createdCharge = await createCharge(charge);
            chargeId = createdCharge.id;
        }

        const paymentAmount = items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        const payableAmount = calculatePayableAmount(
            items,
            charge?.amount || 0,
            discount?.amount || 0
        );

        const [order] = await prisma.$transaction([
            prisma.order.create({
                data: {
                    customerId,
                    paymentAmount,
                    paidAmount: 0,
                    payableAmount,
                    status: "PENDING",
                    paymentStatus: "INITIAL",
                    paymentMethod: "INITIAL",
                    discountId,
                    chargeId,
                    items: {
                        create: items.map((item) => ({
                            variantId: item.variantId,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                    },
                },
                include: { items: true },
            }),
            ...items.map((item) =>
                prisma.variant.update({
                    where: { id: item.variantId },
                    data: { quantity: { decrement: item.quantity } },
                })
            ),
        ]);
        revalidatePath("/pos");

        return order;
    } catch (error) {
        console.error("Error creating order:", error);
        throw new Error(`Database error: `);
    }
}
