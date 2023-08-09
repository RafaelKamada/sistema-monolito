import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";
import { PlaceOrderFacadeInputDto, FindOrderFacadeInputDto, FindOrderFacadeOutputDto } from "./checkout.facade.dto";
import CheckoutFacadeInterface from "./checkout.facade.interface";

export interface UseCaseProps {
    placeOrderUseCase: PlaceOrderUseCase;
    findOrderUseCase: any;
}

export default class CheckoutFacade implements CheckoutFacadeInterface {
    
    private _placeOrderUseCase: PlaceOrderUseCase;
    private _findOrderUseCase: any;

    constructor(props: UseCaseProps) {
        this._placeOrderUseCase = props.placeOrderUseCase;
        this._findOrderUseCase = props.findOrderUseCase;
    }
    
    async placeOrder(input: PlaceOrderFacadeInputDto): Promise<void> {
        await this._placeOrderUseCase.execute(input);
    }

    async findOrder(input: FindOrderFacadeInputDto): Promise<FindOrderFacadeOutputDto> {
        throw new Error("Method not implemented.");
    }

    get placeOrderUseCase(): PlaceOrderUseCase {
        return this._placeOrderUseCase;
    }
}
