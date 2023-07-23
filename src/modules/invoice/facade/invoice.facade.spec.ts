import { Sequelize } from "sequelize-typescript";
import { InvoiceModel } from "../repository/invoice.model";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from '../domain/product.entity';
import InvoiceFacadeFactory from "../factory/facade.factory";

type ProductProps = {
    id?: Id;
    name: string;
    price: number;
}

describe("Invoice facade unit test", () => {    
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

    it("Should generate an invoice", async () => {
        const facade = InvoiceFacadeFactory.create();
        
        const product1 = {
            id: "1",
            name: "Product 1",
            price: 10,
        };
       
        const product2 = {
            id: "2",
            name: "Product 2",
            price: 20,
        };

        const items = [product1, product2].map((item) => ({
            id: item.id,
            name: item.name,
            price: item.price,
        }));

        const input = {
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
        };
        
        const result = await facade.generate(input);

        const invoice = await InvoiceModel.findOne({
            where: { id: input.id },
        });

        const itensInvoice = invoice.items.map((item) => {
            return (Product.fromJson(JSON.stringify(item)));
        });
        
        expect(invoice).toBeDefined();
        expect(invoice.id).toBe(input.id);
        expect(invoice.name).toEqual(input.name);
        expect(invoice.document).toEqual(input.document);
        expect(invoice.street).toBe(input.street);
        expect(invoice.number).toBe(input.number);
        expect(invoice.complement).toBe(input.complement);
        expect(invoice.city).toBe(input.city);
        expect(invoice.state).toBe(input.state);
        expect(invoice.zipCode).toBe(input.zipCode);
        expect(itensInvoice.length).toBe(2);
        expect(itensInvoice[0].id).toBeDefined();
        expect(itensInvoice[0].name).toBe(product1.name);
        expect(itensInvoice[0].price).toBe(product1.price);
        expect(itensInvoice[1].id).toBeDefined();
        expect(itensInvoice[1].name).toBe(product2.name);
        expect(itensInvoice[1].price).toBe(product2.price);
    });
});