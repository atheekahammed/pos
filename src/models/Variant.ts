import { IAttribute } from "./Attribute";
import { IProduct } from "./Product";

export interface IVariant {
    id: number;
    sku: string;
    price: number;
    quantity: number;
    productId: number;
    product?: IProduct;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    attributes: IAttribute[] | number[];
    default?: string
}