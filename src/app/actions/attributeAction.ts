import { prisma } from "@/lib/prisma";
import { IAttribute } from "@/models/Attribute";
import { revalidatePath } from "next/cache";


export const getAttributes = async (): Promise<IAttribute[]> => {
    try {
        return await prisma.attributes.findMany()
    } catch (error) {
        throw new Error("Faild to load attributes");
    }
}


export const createAttribute = async (attribute: IAttribute) => {
    try {
        const attributes = await prisma.attributes.create({
            data: {
                name: attribute.name,
                parentId: attribute.parentId ?? null
            }
        })
        revalidatePath("/attributes")
        return attributes
    } catch (error) {
        throw new Error("Faild to create attribute");
    }
}