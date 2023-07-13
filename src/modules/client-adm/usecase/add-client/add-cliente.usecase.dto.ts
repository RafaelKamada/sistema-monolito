export interface AddClienteInputDto {
    id?: string,
    name: string,
    email: string,
    address: string,
}

export interface AddClienteOutputDto {
    id: string,
    name: string,
    email: string,
    address: string,
    createdAt: Date,
    updatedAt: Date,
}