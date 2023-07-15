export interface AddClientAdmFacadeInputDto {
    id?: string,
    name: string,
    email: string,
    address: string,
}

export interface FindClientAdmFacadeInputDto {
    id: string,
}

export interface FindClientAdmFacadeOutputDto {
    id: string,
    name: string,
    email: string,
    address: string,
    createdAt: Date,
    updatedAt: Date,
}