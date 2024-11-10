import { prisma } from "@/lib/prisma";
import { IVariant } from "@/models/Variant";

export async function getVariants(): Promise<IVariant[]> {
    try {
        return await prisma.variant.findMany({
            include: {
                attributes: true,
                product: {
                    include: {
                        categories: true, 
                    },
                },
            },
        });
    } catch (error) {
       throw new Error("Faild to load variants");
       
    }
}