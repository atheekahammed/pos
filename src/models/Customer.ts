export interface Customer {
    id: number;
    name: string;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
    createdAt: Date;
    updatedAt?: Date | null;
  }
  