import UseCaseInterface from "../../../@shared/usecase/usecase.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
    private _clientFacade: ClientAdmFacadeInterface;
    private _productFacade: ProductAdmFacadeInterface;

    constructor(clientFacade: ClientAdmFacadeInterface, productFacade: ProductAdmFacadeInterface) {
        this._clientFacade = clientFacade;
        this._productFacade = productFacade;
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        // buscar o client. Caso não encontre -> client not foud
        const client = await this._clientFacade.find({ id: input.clientId });
        if (!client) {
            throw new Error("Client not found");
        }

        // validar produto. //funcao a parte
        await this.validateProducts(input);

        // recuperar os products.

        // criar o objeto do client.
        // criar o objeto da order (client, products).
        
        // processpayment -> paymentfacade.process (orderId, amount).

        //caso o pagamento seja aprovado. -> Gerar invoice.
        // mudar o status da minha order para "approved".
        // returnar dto.


        return {
            id: "",
            invoiceId: "",
            status: "",
            total: 0,
            products: [],
        };
    }    

    private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
        if (input.products.length === 0) {
            throw new Error("No products selected");
        }

        for (const p of input.products) {
            const product = await this._productFacade.checkStock({
                productId: p.productId,
            });

            if (product.stock <= 0) {
                throw new Error(`Product ${product.productId} is not available in stock`);
            }
        }
    }
}