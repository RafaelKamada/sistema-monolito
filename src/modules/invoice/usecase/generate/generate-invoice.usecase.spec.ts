import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

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

const invoice = new Invoice({
    id: new Id("1"),
    name: "Invoice 1",
    document: "Document 1",
    address: new Address(
        "Street 1",
        "1",
        "Complement 1",
        "City 1",
        "State 1",
        "123",
    ),
    items: [product1, product2],
});

const MockRepository = () => {
    return {
        find: jest.fn(),
        generate: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    };
};

describe("Generate invoice usecase unit test", () => {

    it("Should create an invoice", async () => {
        const repository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(repository);

        const item1 = {
            id: "1",
            name: "Product 1",
            price: 10,
        };
        
        const item2 = {
            id: "2",
            name: "Product 2",
            price: 20,
        };

        const input = {
            name: "Invoice 1",
            document: "Document 1",
            street: "Street 1",
            number: "1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "123",
            items: [ item1, item2 ],
        };

        const result = await usecase.execute(input);

        expect(repository.generate).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toBe("Invoice 1");
        expect(result.document).toBe("Document 1");
        expect(result.street).toBe("Street 1");
        expect(result.number).toBe("1");
        expect(result.complement).toBe("Complement 1");
        expect(result.city).toBe("City 1");
        expect(result.state).toBe("State 1");
        expect(result.zipCode).toBe("123");
        expect(result.items.length).toBe(2);
        expect(result.items[0].id).toBe("1");
        expect(result.items[0].name).toBe("Product 1");
        expect(result.items[0].price).toBe(10);
        expect(result.items[1].id).toBe("2");
        expect(result.items[1].name).toBe("Product 2");
        expect(result.items[1].price).toBe(20);
        expect(result.total).toBe(30);
    });
});