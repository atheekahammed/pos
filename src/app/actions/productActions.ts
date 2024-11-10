'use server'

import { prisma } from "@/lib/prisma";
import { IProduct } from "@/models/Product";

export const getProducts = async (): Promise<IProduct[]> => {
    try {
        const products = await prisma.product.findMany({
            include: {
                categories: true,
            },
        });
        return products;
    } catch (error) {
        throw new Error("Failed to load Products");
    }
};


// export const createProduct = async (product: IProduct) => {
//     console.log(product)
//     try {
//         const newProduct = await prisma.product.create({
//             data: {
//                 name: product.name,
//                 productCode: product.productCode,
//                 description: product.description,
//                 brand: product.brand,
//                 categories: {
//                     connect: product.categories?.map((category) => (
//                         typeof category === 'object' ? { id: category.id } : { id: category }
//                     )),
//                 },
//                 variants: {
//                     create: product.variants?.map((v) => (
//                         {
//                             price: v.price,
//                             quantity: v.quantity,
//                             sku: v.sku,
//                             attributes: {
//                                 connect: v.attributes.map((a) => (
//                                     typeof a === 'object' ? { id: a.id } : { id: a }
//                                 ))
//                             },


//                         }
//                     ))
//                 }
//             },
//         });
//         console.log("Product created:");
//     } catch (error) {
//         console.error("Error creating product:", error);
//     }
// };




export const createProduct = async (product: IProduct) => {
    console.log(product);
    try {
        const newProduct = await prisma.product.create({
            data: {
                name: product.name,
                productCode: product.productCode,
                description: product.description,
                brand: product.brand,
                categories: {
                    connect: product.categories?.map((category) =>
                        typeof category === 'object' ? { id: category.id } : { id: category }
                    ),
                },
            },
        });


        if (product.variants?.length) {
            const createdVariants = await Promise.all(
                product.variants.map((v) =>
                    prisma.variant.create({
                        data: {
                            price: Number(v.price),
                            quantity: v.quantity,
                            sku: v.sku,
                            productId: newProduct.id,
                            attributes: {
                                connect: (v.attributes as number[]).map((a) => ({ id: a })), // Corrected syntax
                            },
                        },
                    })
                )
            );

        }
    } catch (error) {
        console.error("Error creating product or variants:", error);
    }
};
