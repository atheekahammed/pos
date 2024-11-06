export interface ICategory {
    id: number;
    name: string;
    description?: string | null;
    parentId?: number | null;
    parent?: ICategory | null;
    children?: ICategory[];
}
