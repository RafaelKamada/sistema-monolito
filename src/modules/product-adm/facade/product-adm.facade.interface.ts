import { AddProductFacadeInputDto, AddProductFacadeOutputDto, CheckProductFacadeInputDto, CheckProductFacadeOutputDto } from './product-adm.facade.dto';

export default interface ProductAdmFacadeInterface {
    addProduct(input: AddProductFacadeInputDto): Promise<AddProductFacadeOutputDto>;
    checkStock(input: CheckProductFacadeInputDto): Promise<CheckProductFacadeOutputDto>;
}