import { AddClientAdmFacadeInputDto, FindClientAdmFacadeInputDto, FindClientAdmFacadeOutputDto } from "./client-adm.facade.dto";

export default interface ClientAdmFacadeInterface {
    add(input: AddClientAdmFacadeInputDto): Promise<void>;
    find(input: FindClientAdmFacadeInputDto): Promise<FindClientAdmFacadeOutputDto>;
}