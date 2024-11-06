export interface IAttribute {
    id: number;
    name: string;
    parentId?: number | null;
    parent?: IAttribute | null;
    children?: IAttribute[];
}
