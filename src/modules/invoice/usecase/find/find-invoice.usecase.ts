import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import Product from "../../domain/product.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from "./find-invoice.dto";

export default class FindInvoiceUseCase implements UseCaseInterface {
    
    constructor(private invoiceRepository: InvoiceGateway) {}
    
    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const invoice = await this.invoiceRepository.find(input.id);

        // const itens = invoice.items.map((item: Product) => ({
        //     id: item.id.id,
        //     name: item.name,
        //     price: item.price,
        // }));

        const itens = invoice.items.map((item) => {
            const prod = Product.fromJson(JSON.stringify(item));
            return {
                id: prod.id.id,
                name: prod.name,
                price: prod.price,
            };
        });

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            address: invoice.address,
            items: itens,
            total: invoice.total,
            createdAt: invoice.createdAt,
        };
    }

}