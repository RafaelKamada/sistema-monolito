export interface PlaceOrderFacadeInputDto {
    id?: string;
    clientId: string;
    products: {
        productId: string;
    }[];
}

export interface PlaceOrderFacadeOutputDto {
    id: string;
    invoiceId: string;
    status: string;
    total: number;
    products: {
        productId: string;
    }[];
}

export interface FindOrderFacadeInputDto {
    orderId: string;
}

export interface FindOrderFacadeOutputDto {
    orderId: string;
    clientId: string;
    products: {
        productId: string;
    };
}