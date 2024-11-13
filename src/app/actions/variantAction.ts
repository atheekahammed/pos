'use server'

import { prisma } from "@/lib/prisma";
import { IVariant } from "@/models/Variant";

export async function getVariants(searchQuery?: string): Promise<IVariant[]> {
    try {
        return await prisma.variant.findMany({
            where: {
                OR: [
                    {
                        product: {
                            name: {
                                contains: searchQuery,
                                mode: "insensitive", 
                            },
                        },
                    },
                    {
                        product: {
                            categories: {
                                some: {
                                    name: {
                                        contains: searchQuery,
                                        mode: "insensitive",
                                    },
                                },
                            },
                        },
                    },
                    {
                        attributes: {
                            some: {
                                name: {
                                    contains: searchQuery,
                                    mode: "insensitive",
                                },
                            },
                        },
                    },
                ],
            },
            include: {
                attributes: true,
                product: {
                    include: {
                        categories: true,
                    },
                },
            },
        });
    } catch (error:any) {
        console.error("Error fetching variants:", error.message, error.stack);

        throw new Error("Failed to load variants");
    }
}
