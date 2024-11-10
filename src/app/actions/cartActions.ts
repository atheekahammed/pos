import { prisma } from "@/lib/prisma";
import { CnD } from "@/models/CnD";
import { IOrder, IOrderItem } from "@/models/Order";
import { PaymentMethod, PaymentStatus } from "@prisma/client";


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




export async function createOrder(input: IOrder) {
    const { customerId, discount, charge, items } = input;

    // Validate input
    if (!items || items.length === 0) {
        throw new Error("Order must contain at least one item.");
    }

    // Check for zero or negative item quantity
    if (items.some((item) => item.quantity <= 0)) {
        throw new Error("Order items must have a quantity greater than zero.");
    }

    try {
        // Validate variants' availability
        const variantIds = items.map((item) => item.variantId);
        const variants = await prisma.variant.findMany({
            where: {
                id: { in: variantIds },
            },
        });

        if (variants.length !== variantIds.length) {
            throw new Error("Some items reference non-existing variants.");
        }

        const insufficientStock = variants.filter((variant) =>
            items.some(
                (item) => item.variantId === variant.id && variant.quantity === 0
            )
        );

        if (insufficientStock.length > 0) {
            throw new Error(
                `Cannot create order. Some variants have no stock: ${insufficientStock
                    .map((v) => v.id)
                    .join(", ")}.`
            );
        }
        let discountId: number | null = null;
        let chargeId: number | null = null;

        if (discount) {
            const createdDiscount = await createDiscount(discount);
            discountId = createdDiscount.id;
        }

        if (charge) {
            const createdCharge = await createCharge(charge);
            chargeId = createdCharge.id;
        }

        const chargeAmount = charge ? charge.amount : 0;
        const discountAmount = discount ? discount.amount : 0;
        const paymentAmount = items.reduce((total, item) => total + (item.price * item.quantity), 0); // Sum of item prices
        const payableAmount = calculatePayableAmount(items, chargeAmount, discountAmount);
        const paidAmount = 0;

        // const order = await prisma.order.create({
        //     data: {
        //         customerId,
        //         paymentAmount,
        //         paidAmount,
        //         payableAmount,
        //         status: 'PENDING',
        //         paymentStatus: 'PENDING',
        //         paymentMethod: 'INITIAL',
        //         discountId,
        //         chargeId,
        //         items: {
        //             create: items.map((item) => ({
        //                 variantId: item.variantId,
        //                 quantity: item.quantity,
        //                 price: item.price,
        //             })),
        //         }

        //     },
        //     include: { items: true },
        // });

        // await Promise.all(
        //     items.map(async (item) => {
        //         const variant = await prisma.variant.findUnique({
        //             where: { id: item.variantId },
        //         });

        //         if (!variant) {
        //             throw new Error(`Variant with ID ${item.variantId} not found.`);
        //         }

        //         if (variant.quantity < item.quantity) {
        //             throw new Error(
        //                 `Insufficient stock for Variant with ID ${item.variantId}. Available: ${variant.quantity}, Requested: ${item.quantity}`
        //             );
        //         }

        //         await prisma.variant.update({
        //             where: { id: item.variantId },
        //             data: {
        //                 quantity: variant.quantity - item.quantity,
        //             },
        //         });
        //     })
        // );


        const [order] = await prisma.$transaction([
            prisma.order.create({
                data: {
                    customerId,
                    paymentAmount,
                    paidAmount,
                    payableAmount,
                    status: 'PENDING',
                    paymentStatus: 'PENDING',
                    paymentMethod: 'INITIAL',
                    discountId,
                    chargeId,
                    items: {
                        create: items.map((item) => ({
                            variantId: item.variantId,
                            quantity: item.quantity,
                            price: item.price,
                        })),
                    }

                },
                include: { items: true },
            }),
            ...items.map((item) =>
                prisma.variant.update({
                    where: { id: item.variantId },
                    data: {
                        quantity: {
                            decrement: item.quantity,
                        },
                    },
                })
            ),
        ]);

        return order;

    } catch (error) {
        throw new Error("Failed to create order");
    }
}
