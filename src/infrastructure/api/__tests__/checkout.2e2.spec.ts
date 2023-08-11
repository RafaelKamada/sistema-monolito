import { Sequelize } from "sequelize-typescript";
import Id from "../../../modules/@shared/domain/value-object/id.value-object";
import Client from "../../../modules/client-adm/domain/client.entity";
import ClientModel from "../../../modules/client-adm/repository/client.model";
import Product from "../../../modules/product-adm/domain/product.entity";
import ProductModelAdm  from "../../../modules/product-adm/repository/product.model";
import { app } from "../express";
import request from "supertest";
import { Umzug } from "umzug"
import { migrator } from "../../../test-migrations/config-migrations/migrator";
import ProductModelStorage from "../../../modules/store-catalog/repository/product.model";

describe("E2E test for checkout", () => {
    
    let migration: Umzug<any>;    
    let sequelize: Sequelize;
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            logging: false
        });
        sequelize.addModels([ProductModelAdm, ProductModelStorage]);
        migration = migrator(sequelize);
        await migration.up();
    });
    
    afterAll(async () => {
        if (!migration || !sequelize) {
            return;
        }
        migration = migrator(sequelize)
        await migration.down();
        await sequelize.close();
    });
  
    it("should place an order", async () => {
        const clientProps = new Client({
            id: new Id("1"),
            name: "Client 1",
            email: "x@x.com",
            document: "12345",
            street: "Street 1",
            number: "1",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "123",
        });

        await ClientModel.create({
            id: clientProps.id.id,
            name: clientProps.name,
            email: clientProps.email,
            document: clientProps.document,
            street: clientProps.street,
            number: clientProps.number,
            complement: clientProps.complement,
            city: clientProps.city,
            state: clientProps.state,
            zipCode: clientProps.zipCode,
            createdAt: new Date(),
            updatedAt: new Date(),
        });

        const productProps: Product[] = [
            new Product({
                id: new Id("1"),
                name: "Product 1",
                description: "Description",
                purchasePrice: 10,
                stock: 10,
            }),
            new Product({
                id: new Id("2"),
                name: "Product 2",
                description: "Description",
                purchasePrice: 20,
                stock: 20,
            }),
        ];

        productProps.map(async (product) => {
            await ProductModelAdm.create({
                id: product.id.id,
                name: product.name,
                description: product.description,
                purchasePrice: product.purchasePrice,
                stock: product.stock,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
        });


        

        const response = await request(app)
            .post("/checkout")
            .send({
                clientId: "1c",
                products: [{productId: "1p"}, {productId: "2p"}],
            });

        //id?: string;
        //console.log(response);
    
        expect(response.status).toBe(200);
        // expect(response.body.name).toBe("Client 1");
        // expect(response.body.email).toBe("e@e.com");
        // expect(response.body.document).toBe("Document 1");
        // expect(response.body.street).toBe("Street 1");
        // expect(response.body.number).toBe("123");
        // expect(response.body.complement).toBe("");
        // expect(response.body.city).toBe("City 1");
        // expect(response.body.state).toBe("State 1");
        // expect(response.body.zipCode).toBe("12345");
    });
});