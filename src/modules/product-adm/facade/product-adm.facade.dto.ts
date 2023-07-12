export interface AddProductFacadeInputDto {
    id?: string;
    name: string;
    description: string;
    purchasePrice: number;
    stock: number;
}

export interface CheckProductFacadeInputDto {
    productId: string;
}

export interface CheckProductFacadeOutputDto {
    productId: string;
    stock: number;
}