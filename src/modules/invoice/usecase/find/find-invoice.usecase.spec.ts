import Address from "../../../@shared/domain/value-object/address.value-object";
import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import Product from "../../domain/product.entity";
import FindInvoiceUseCase from "./find-invoice.usecase";
//import Product from "../../product-adm/domain/product.entity";

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
        find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
        generate: jest.fn(),
    };
};

describe("Find invoid usecase unit test", () => {

    it("Should find a invoice", async () => {
        const repository = MockRepository();
        const usecase = new FindInvoiceUseCase(repository);

        const input = {
            id: "1",
        };

        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toBe("1");
        expect(result.name).toBe("Invoice 1");
        expect(result.document).toBe("Document 1");
        expect(result.address.street).toBe("Street 1");
        expect(result.address.number).toBe("1");
        expect(result.address.complement).toBe("Complement 1");
        expect(result.address.city).toBe("City 1");
        expect(result.address.state).toBe("State 1");
        expect(result.address.zipCode).toBe("123");
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