import Product from "../entity/product"
import ProductGateway from "../gateway/product.gateway"
import { AddProductInputDto, AddProductOutputDto } from "./add-product.dto"

export default class AddProductUseCase {

    private productRepository: ProductGateway;

    constructor(productRepository: ProductGateway) {
        this.productRepository = productRepository;
    }

    async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {

        const props = {
            id: input.id,
            name: input.name,
            description: input.description,
            salesPrice: input.salesPrice
        };

        const product = new Product(props.id, props.name, props.description, props.salesPrice);

        await this.productRepository.create(product);

        return {
            id: product.id,
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice
        };
    }
}