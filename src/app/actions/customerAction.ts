import { prisma } from "@/lib/prisma";
import { Customers } from "@/models/Customers";

export const getCustomers = async (): Promise<Customers[]> => {
    try {
        return await prisma.customer.findMany()
    } catch (error) {
        throw new Error("Faild to load customers");

    }
}


export const createCustomer = async (customerData:Customers): Promise<Customers> => {
    try {
        const newCustomer = await prisma.customer.create({
            data: {
                Name: customerData.Name,
                email: customerData.email,
                phone: customerData.phone,
                address: customerData.address,
            },
        });
        return newCustomer;
    } catch (error) {
        console.error("Error creating customer:", error);
        throw new Error("Failed to create customer");
    }
};