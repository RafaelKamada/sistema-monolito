import { Sequelize } from "sequelize-typescript";
import Order from "../domain/order.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from '../domain/product.entity';
import Client from "../domain/client.entity";
import CheckoutModel from "./checkout.model";
import CheckoutRepository from "./checkout.repository";
import ClientModel from "../../client-adm/repository/client.model";

describe("Place order repository test", () => {
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

    it("should place an order", async () => {
        const orderProps = new Order({
            id: new Id("1"),
            client: new Client({
                id: new Id("c1"),
                name: "Client 1",
                email: "e@e.com",
                address: "Addres 1",
            }),
            products: [
                new Product({
                    id: new Id("p1"),
                    name: "Product 1",
                    description: "some description",
                    salesPrice: 40,
                }),
                new Product({
                    id: new Id("p2"),
                    name: "Product 2",
                    description: "some description",
                    salesPrice: 30,
                }),
            ],
        });

        orderProps.approved();
        
        const repository = new CheckoutRepository();
        const result = await repository.addOrder(orderProps);

        const orderDb = await CheckoutModel.findOne({
            where: { id: orderProps.id.id },
        });

        expect(orderProps.id.id).toBe(orderDb.id);
        expect(orderProps.status).toBe("approved");
        expect(orderProps.client.id.id).toBe(orderDb.clientId);
        expect(orderProps.products[0].id.id).toBe(orderDb.products[0].productId);
        expect(orderProps.products[1].id.id).toBe(orderDb.products[1].productId);
  });
});