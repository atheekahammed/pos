import { IVariant } from "./Variant";

export interface IStockBatch {
    id?: number;
    quantity: number;
    variantId: number;
    cost: number;
    createdAt?: Date;
    variant?: IVariant
    variantsIds?: number[]
}
