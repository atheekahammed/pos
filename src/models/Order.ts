import { OrderStatus, PaymentMethod, PaymentStatus } from "@prisma/client";
import { CnD } from "./CnD";
import { Customer } from "./Customer";
import { IVariant } from "./Variant";



export interface IOrderItem {
    id: number;
    variantId: number;
    quantity: number;
    price: number
    variant?: IVariant
}

export interface IOrder {
    id: number;
    customerId?: number | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;

    status: OrderStatus;

    items: IOrderItem[];
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
