import { Sequelize } from "sequelize-typescript";
import CheckoutModel from "../repository/checkout.model";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";
import Product from "../domain/product.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import { PlaceOrderInputDto } from "../usecase/place-order/place-order.dto";
import ClientModel from "../../client-adm/repository/client.model";
import CheckoutFacade from "./checkout.facade";

describe("CheckoutFacade test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([CheckoutModel, ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    const clientProps = {
        id: "1c",
        name: "Client 0",
        document: "0000",
        email: "cleint@user.com",
        street: "some address",
        number: "1",
        complement: "",
        city: "some city",
        state: "some state",
        zipCode: "000",
    };

    const mockClientFacade = {
        find: jest.fn().mockResolvedValue(clientProps),
    };

    const mockPaymentFacade = {
        process: jest.fn(),
    };

    const mockCheckoutRepo = {
        addOrder: jest.fn(),
    };

    const mockInvoiceFacade = {
        generate: jest.fn().mockResolvedValue({ id: "1i" }),
    };

    const placeOrderUseCase = new PlaceOrderUseCase(
        mockClientFacade as any,
        null,
        null,
        mockCheckoutRepo as any,
        mockInvoiceFacade as any,
        mockPaymentFacade
    );

    const products = {
        "1": new Product({
            id: new Id("1"),
            name: "Product 1",
            description: "some description",
            salesPrice: 40,
        }),
        "2": new Product({
            id: new Id("2"),
            name: "Product 2",
            description: "some description",
            salesPrice: 30,
        }),
    };

    const mockValidateProducts = jest
        //@ts-expect-error - spy on private method
        .spyOn(placeOrderUseCase, "validateProducts")
        //@ts-expect-error - spy on private method
        .mockResolvedValue(null);
    
    const mockGetProduct = jest
        //@ts-expect-error - spy on private method
        .spyOn(placeOrderUseCase, "getProduct")
        //@ts-expect-error - not return never
        .mockImplementation((productId: keyof typeof products) => {
            return products[productId];
        });
    
    it("Should place an order", async () => { 
        const facade = new CheckoutFacade({
            placeOrderUseCase: placeOrderUseCase,
            findOrderUseCase: null,
        });

        mockPaymentFacade.process = mockPaymentFacade.process.mockReturnValue({
            transactionId: "1t",
            orderId: "1o",
            amount: 100,
            status: "approved",
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const input: PlaceOrderInputDto = {
            id: "1",
            clientId: "1c",
            products: [{ productId: "1" }, { productId: "2" }],
        };

        let output = await facade.placeOrderUseCase.execute(input);
        
        expect(output.invoiceId).toBe("1i");
        expect(output.total).toBe(70);
        expect(output.products).toStrictEqual([
            { productId: "1" },
            { productId: "2" },
        ]);
        expect(mockClientFacade.find).toHaveBeenCalledTimes(1);
        expect(mockClientFacade.find).toHaveBeenCalledWith({ id: "1c" });
        expect(mockValidateProducts).toHaveBeenCalledTimes(1);
        expect(mockGetProduct).toHaveBeenCalledTimes(2);
        expect(mockCheckoutRepo.addOrder).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledTimes(1);
        expect(mockPaymentFacade.process).toHaveBeenCalledWith({
            orderId: output.id,
            amount: output.total,
        });
        expect(mockInvoiceFacade.generate).toHaveBeenCalledTimes(1);
        expect(mockInvoiceFacade.generate).toHaveBeenCalledWith({
            name: clientProps.name,
            document: clientProps.document,
            street: clientProps.street,
            number: clientProps.number,
            complement: clientProps.complement,
            city: clientProps.city,
            state: clientProps.state,
            zipCode: clientProps.zipCode,
            items: [
                {
                    id: products["1"].id.id,
                    name: products["1"].name,
                    price: products["1"].salesPrice,
                },
                {
                    id: products["2"].id.id,
                    name: products["2"].name,
                    price: products["2"].salesPrice,
                }
            ],
        });
    });

});