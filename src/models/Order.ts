import { CnD } from "./CnD";
import { Customer } from "./Customer";
import { IVariant } from "./Variant";

export enum OrderStatus {
    INITIAL,
    PENDING,
    COMPLETED,
    CANCELED,
    SHIPPED,
    PAID,
    FAILED,
}

enum PaymentStatus {
    PENDING,
    COMPLETED,
    FAILED,
    REFUNDED,
}

enum PaymentMethod {
    CREDIT_CARD,
    DEBIT_CARD,
    PAYPAL,
    BANK_TRANSFER,
    CASH_ON_DELIVERY,
}


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
