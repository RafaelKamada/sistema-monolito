import { FindOrderFacadeInputDto, FindOrderFacadeOutputDto, PlaceOrderFacadeInputDto } from "./checkout.facade.dto";

export default interface CheckoutFacadeInterface {
    placeOrder(input: PlaceOrderFacadeInputDto): Promise<void>;
    findOrder(input: FindOrderFacadeInputDto): Promise<FindOrderFacadeOutputDto>;
}