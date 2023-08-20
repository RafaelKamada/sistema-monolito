import { FindOrderFacadeInputDto, FindOrderFacadeOutputDto, PlaceOrderFacadeInputDto, PlaceOrderFacadeOutputDto } from "./checkout.facade.dto";

export default interface CheckoutFacadeInterface {
    placeOrder(input: PlaceOrderFacadeInputDto): Promise<PlaceOrderFacadeOutputDto>;
    findOrder(input: FindOrderFacadeInputDto): Promise<FindOrderFacadeOutputDto>;
}