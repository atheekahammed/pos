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


export const createProduct = async (product: IProduct) => {
    try {
        const newProduct = await prisma.product.create({
            data: {
                name: product.name,
                productCode: product.productCode,
                description: product.description,
                brand: product.brand,
                categories: {
                    connect: product.categories?.map((category) => (
                        typeof category === 'object' ? { id: category.id } : { id: category }
                    )),
                },
            },
        });
        console.log("Product created:", newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
    }
};



export const createProductWithCategoriesAndVariants = async () => {
    try {
        const newProduct = await prisma.product.create({
            data: {
                name: "New Product with Categories and Variants",
                productCode: "ascsdfds52",
                description: "A description of the product",
                brand: "BrandName",
                categories: {
                    connect: [
                        { id: 1 },  // Connect to Category with ID 1
                        { id: 2 },  // Connect to Category with ID 2
                    ],
                },
                variants: {
                    create: [
                        {
                            sku: "VARfds123",
                            price: 50.0,
                            quantity: 100,
                            attributesId: 1,  // If applicable
                        },
                        {
                            sku: "VARfdsfs124",
                            price: 55.0,
                            quantity: 150,
                            attributesId: 2,  // If applicable
                        },
                    ],
                },
            },
        });
        console.log("Product created with categories and variants:", newProduct);
    } catch (error) {
        console.error("Error creating product with categories and variants:", error);
    }
};
