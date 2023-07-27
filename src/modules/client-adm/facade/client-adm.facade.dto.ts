export interface AddClientAdmFacadeInputDto {
    id?: string,
    name: string,
    email: string,
    document: string;
    street: string,
    number: string,
    complement: string,
    city: string,
    state: string,
    zipCode: string,
}

export interface FindClientAdmFacadeInputDto {
    id: string,
}

export interface FindClientAdmFacadeOutputDto {
    id: string,
    name: string,
    email: string,
    document: string;
    street: string,
    number: string,
    complement: string,
    city: string,
    state: string,
    zipCode: string,
    createdAt: Date,
    updatedAt: Date,
}