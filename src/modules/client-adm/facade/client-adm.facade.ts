import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import { AddClientAdmFacadeInputDto, FindClientAdmFacadeInputDto, FindClientAdmFacadeOutputDto } from "./client-adm.facade.dto";
import ClientAdmFacadeInterface from "./client-adm.facade.interface";

export interface UseCasesProps {
    addUseCase: UseCaseInterface;
    findUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements ClientAdmFacadeInterface {
    
    private _addUsecase: UseCaseInterface;
    private _findUsecase: UseCaseInterface;

    constructor(usecaseProps: UseCasesProps) {
        this._addUsecase = usecaseProps.addUseCase;
        this._findUsecase = usecaseProps.findUseCase;
    }

    async add(input: AddClientAdmFacadeInputDto): Promise<void> {
        return await this._addUsecase.execute(input);
    }

    async find(input: FindClientAdmFacadeInputDto): Promise<FindClientAdmFacadeOutputDto> {
        return await this._findUsecase.execute(input);
    }

}