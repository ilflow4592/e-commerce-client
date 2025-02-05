export interface Product {
  id: number;
  name: string;
  description: string;
  unitPrice: number;
  stockQuantity: number;
  category: string;
  size: string;
  shopDisplayable?: boolean;
  fileUrl: string;
  fileName: string;
  createdAt: Date;
}
