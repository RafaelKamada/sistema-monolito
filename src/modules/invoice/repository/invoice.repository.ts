import Id from '../../@shared/domain/value-object/id.value-object';
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceModel } from "./invoice.model";
import Address from '../../@shared/domain/value-object/address.value-object';
import Product from '../domain/product.entity';

type ProductProps = {
    id?: Id;
    name: string;
    price: number;
}

export default class InvoiceRepository implements InvoiceGateway {
    
    async find(id: string): Promise<Invoice> {
        const invoice = await InvoiceModel.findOne({
            where: { id },
        });

        if (!invoice) {
            throw new Error(`Invoice with id ${id} not found`);
        }

        const address = new Address(
            invoice.street,
            invoice.number,
            invoice.complement,
            invoice.city,
            invoice.state,
            invoice.zipCode,
        );

        const itens: Product[] = invoice.items.map((item: ProductProps) => {
            return new Product({ id: item.id, name: item.name, price: item.price });
        });

        return new Invoice({
            id: new Id(invoice.id),
            name: invoice.name,
            document: invoice.document,
            address: address,
            items: itens,
            createdAt: invoice.createdAt,
            updatedAt: invoice.updatedAt,
        });
    }

    async generate(input: Invoice): Promise<void> {
        await InvoiceModel.create({
            id: input.id.id,
            name: input.name,
            document: input.document,
            street: input.address.street,
            number: input.address.number,
            complement: input.address.complement,
            city: input.address.city,
            state: input.address.state,
            zipCode: input.address.zipCode,
            items: input.items,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
        });
    }

}
