import { IAttribute } from "./Attribute";
import { IProduct } from "./Product";

export interface IVariant {
    id: number;
    sku: string;
    price: number;
    quantity: number;
    productId: number;
    product: IProduct;
    createdAt: Date;
    updatedAt: Date;
    attributesId?: number | null;
    variants: IAttribute[];
}