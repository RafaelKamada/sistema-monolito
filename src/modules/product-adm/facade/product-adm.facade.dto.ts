export interface AddProductFacadeInputDto {
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export interface AddProductFacadeOutputDto {
    id: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface CheckProductFacadeInputDto {
    productId: string;
}

export interface CheckProductFacadeOutputDto {
    productId: string;
    stock: number;
}