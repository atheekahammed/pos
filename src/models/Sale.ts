import { OrderStatus, PaymentMethod, PaymentStatus } from "@prisma/client";
import { CnD } from "./CnD"
import { Customer } from "./Customer"
import { IVariant } from "./Variant"






export interface Sale {
    id: number;
    customerId?: number | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;

    status: OrderStatus;

    items: Item[];
    discountId?: number | null;
    chargeId?: number | null;
    charge?: CnD | null;
    discount?: CnD | null;
    customer?: Customer | null;


    paymentAmount?: number;
    paidAmount?: number;
    payableAmount?: number;


    paymentStatus?: PaymentStatus;
    paymentMethod?: PaymentMethod;
}

export interface Item {
    id: number
    variantId: number
    quantity: number
    price: number
    orderId: number
    variant?: IVariant
}

