import UseCaseInterface from "../../@shared/usecase/usecase.interface";
import { AddProductFacadeInputDto, CheckProductFacadeInputDto, CheckProductFacadeOutputDto } from "./product-adm.facade.dto";
import ProductAdmFacadeInterface from "./product-adm.facade.interface";

export interface UseCasesProps {
    addUseCase: UseCaseInterface;
    stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {

    private _addUsecase: UseCaseInterface;
    private _checkStockUsecase: UseCaseInterface;

    constructor(usecaseProps: UseCasesProps) {
        this._addUsecase = usecaseProps.addUseCase;
        this._checkStockUsecase = usecaseProps.stockUseCase;
    }

    addProduct(input: AddProductFacadeInputDto): Promise<void> {
        return this._addUsecase.execute(input);
    }

    checkStock(input: CheckProductFacadeInputDto): Promise<CheckProductFacadeOutputDto> {
        return this._checkStockUsecase.execute(input);
    }    
}