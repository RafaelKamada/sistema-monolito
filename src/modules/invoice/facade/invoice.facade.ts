import FindInvoiceUseCase from "../usecase/find/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate/generate-invoice.usecase";
import { GenerateInvoiceFacadeInputDto, FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, GenerateInvoiceFacadeOutputDto } from "./invoice.facade.dto";
import InvoiceFacadeInterface from "./invoice.facade.interface";

export interface UseCaseProps {
    findUseCase: FindInvoiceUseCase;
    generateUseCase: GenerateInvoiceUseCase;
}

export default class InvoiceFacade implements InvoiceFacadeInterface {

    private _findUseCase: FindInvoiceUseCase;
    private _generateUseCase: GenerateInvoiceUseCase;

    constructor(props: UseCaseProps) {
        this._findUseCase = props.findUseCase;
        this._generateUseCase = props.generateUseCase;
    }

    async generate(input: GenerateInvoiceFacadeInputDto): Promise<GenerateInvoiceFacadeOutputDto> {
        return await this._generateUseCase.execute(input);
    }

    async find(id: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        return await this._findUseCase.execute(id);
    }
}