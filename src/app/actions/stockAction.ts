'use server'

import { prisma } from "@/lib/prisma";
import { IStockBatch } from "@/models/Stock";
import { revalidatePath } from "next/cache";

export async function getStocks(): Promise<IStockBatch[]> {
    try {
        const stocks = await prisma.stockBatch.findMany({
            include: {
                variant: {
                    include: {
                        attributes: true,
                    },
                },
            },
        });
        return stocks as IStockBatch[];
    } catch (error) {
        throw new Error("Faild to load Stocks");

    }
}

export async function createStockBatch(stock: IStockBatch): Promise<IStockBatch[]> {
    try {
      // Validate and convert cost and quantity to numbers
      const cost = Number(stock.cost);
      const quantity = Number(stock.quantity);
  
      if (isNaN(cost) || isNaN(quantity)) {
        throw new Error("Cost or Quantity is not a valid number");
      }
  
      if (stock.variantsIds?.length) {
        const batches: IStockBatch[] = stock.variantsIds.map(id => ({
          cost,
          quantity,
          variantId: id
        }));
  
        // Create stock batches in the database
        await prisma.stockBatch.createMany({
          data: batches,
          skipDuplicates: true,
        });
  
        // Fetch current quantities for each variant
        const variants = await prisma.variant.findMany({
          where: {
            id: { in: stock.variantsIds },
          },
          select: {
            id: true,
            quantity: true,
          },
        });
  
        // Update the variant quantities
        const updatedVariants = variants.map(variant => {
          const newQuantity = variant.quantity + quantity; // Add batch quantity to existing quantity
          return prisma.variant.update({
            where: { id: variant.id },
            data: { quantity: newQuantity },
          });
        });
  
        // Wait for all variant updates to complete
        await Promise.all(updatedVariants);
  
        // Revalidate the cache
        revalidatePath("/stocks");
  
        // Fetch the created batches from the database
        const createdBatches = await prisma.stockBatch.findMany({
          where: {
            variantId: { in: stock.variantsIds },
          },
        });
  
        return createdBatches;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error creating stock:", error);  // Log the error
      throw new Error(`Failed to create stock`);  // Provide detailed error
    }
  }
  