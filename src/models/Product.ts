import { ICategory } from "./Category";
import { IVariant } from "./Variant";

export interface IProduct {
    id?: number;
    name: string;
    productCode: string;
    description?: string | null;
    brand?: string | null;
    createdAt?: Date | null;
    updatedAt?: Date | null;
    variants?: IVariant[];
    categories: ICategory[] | number[];
}


