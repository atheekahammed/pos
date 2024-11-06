'use server'

import { prisma } from "@/lib/prisma"
import { ICategory } from "@/models/Category";
import { revalidatePath } from "next/cache";


export async function getCategories(): Promise<ICategory[]> {
    try {
        return await prisma.category.findMany();
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function createCategory(category: ICategory): Promise<ICategory> {
    try {
        const cat = await prisma.category.create({
            data: {
                name: category.name,
                description: category.description,
                parentId: category.parentId ?? null
            },

        });
        revalidatePath("/categories")

        return cat
    } catch (error) {
        throw new Error('Failed to create category');
    }
}

export async function updateCategory(id: number, category: Partial<ICategory>): Promise<ICategory | null> {
    try {
        const updatedCategory = await prisma.category.update({
            where: { id },
            data: {
                name: category.name,
                description: category.description,
                parentId: category.parentId ?? null,
            },
        });

        return updatedCategory;
    } catch (error) {
        console.error(error);
        throw new Error("Faild to update category");
    }
}

export async function deleteCategory(id: number): Promise<boolean> {
    try {
        await prisma.category.delete({
            where: {
                id,
            },
        });
        revalidatePath("/categories")

        return true;
    } catch (error) {
        console.error(error);
        throw new Error("Faild to delete category");

    }
}