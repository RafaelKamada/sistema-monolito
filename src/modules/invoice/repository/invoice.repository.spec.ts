import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import Product from "../domain/product.entity";
import Id from '../../@shared/domain/value-object/id.value-object';
import Invoice from "../domain/invoice.entity";
import Address from "../../@shared/domain/value-object/address.value-object";

type ProductProps = {
    id?: Id;
    name: string;
    price: number;
}

describe("Invoice repository unit test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([InvoiceModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });


    it("should find an invoice", async () => {
        const repository = new InvoiceRepository();
      
        const product1 = new Product({
            id: new Id("1"),
            name: "Product 1",
            price: 10,
        });
       
        const product2 = new Product({
            id: new Id("2"),
            name: "Product 2",
            price: 20,
        });

        const items = [product1, product2].map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
        }));
      
        const invoice = await InvoiceModel.create({
            id: "1",
            name: "John Doe",
            document: "12345",
            street: "Street 1",
            number: "1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "123",
            items: items,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
      
        const result = await repository.find("1");
       
        expect(result.id.id).toEqual(invoice.id);
        expect(result.name).toEqual(invoice.name);
        expect(result.document).toEqual(invoice.document);
        expect(result.address.street).toBe(invoice.street);
        expect(result.address.number).toBe(invoice.number);
        expect(result.address.complement).toBe(invoice.complement);
        expect(result.address.city).toBe(invoice.city);
        expect(result.address.state).toBe(invoice.state);
        expect(result.address.zipCode).toBe(invoice.zipCode);
        expect(result.items.length).toBe(2);
        expect(result.items[0].id).toBeDefined();
        expect(result.items[0].name).toBe(product1.name);
        expect(result.items[0].price).toBe(product1.price);
        expect(result.items[1].id).toBeDefined();
        expect(result.items[1].name).toBe(product2.name);
        expect(result.items[1].price).toBe(product2.price);
        expect(result.total).toBe(30);
    });

    it("should generate an invoice", async () => {
        const repository = new InvoiceRepository();
      
        const product1 = new Product({
            id: new Id("1"),
            name: "Product 1",
            price: 10,
        });
       
        const product2 = new Product({
            id: new Id("2"),
            name: "Product 2",
            price: 20,
        });

        const items = [product1, product2].map((product) => new Product({
            id: product.id,
            name: product.name,
            price: product.price,
        }));

        const props = {
            id: new Id("1"),
            name: "John Doe",
            document: "12345",
            address: new Address(
                "Street 1",
                "1",
                "Complement 1",
                "City 1",
                "State 1",
                "123",
            ),
            items: items,
            createdAt: new Date(),
            updatedAt: new Date(),
        };
        
        const invoice = new Invoice(props);      
        const result = await repository.generate(invoice);
        
        const invoiceDb = await InvoiceModel.findOne({
            where: { id: invoice.id.id },
        });

        const itensDb: Product[] = invoiceDb.items.map((item: ProductProps) => {
            return new Product({ id: item.id, name: item.name, price: item.price });
        });
        
        expect(invoice.id.id).toEqual(invoiceDb.id);
        expect(invoice.name).toEqual(invoiceDb.name);
        expect(invoice.document).toEqual(invoiceDb.document);
        expect(invoice.address.street).toBe(invoiceDb.street);
        expect(invoice.address.number).toBe(invoiceDb.number);
        expect(invoice.address.complement).toBe(invoiceDb.complement);
        expect(invoice.address.city).toBe(invoiceDb.city);
        expect(invoice.address.state).toBe(invoiceDb.state);
        expect(invoice.address.zipCode).toBe(invoiceDb.zipCode);
        expect(itensDb.length).toBe(2);
        expect(itensDb[0].id).toBeDefined();
        expect(itensDb[0].name).toBe(invoiceDb.items[0].name);
        expect(itensDb[0].price).toBe(invoiceDb.items[0].price);
        expect(itensDb[1].id).toBeDefined();
        expect(itensDb[1].name).toBe(invoiceDb.items[1].name);
        expect(itensDb[1].price).toBe(invoiceDb.items[1].price);
        expect(invoice.total).toBe(30);
    });
});