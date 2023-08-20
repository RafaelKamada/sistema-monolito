import { Sequelize } from "sequelize-typescript";
import Id from "../../../modules/@shared/domain/value-object/id.value-object";
import Client from "../../../modules/client-adm/domain/client.entity";
import ClientModel from "../../../modules/client-adm/repository/client.model";
import Product from "../../../modules/product-adm/domain/product.entity";
import ProductStorage from "../../../modules/store-catalog/domain/product.entity";
import ProductModelAdm  from "../../../modules/product-adm/repository/product.model";
import { app } from "../express";
import request from "supertest";
import { Umzug } from "umzug"
import { migrator } from "../../../test-migrations/config-migrations/migrator";
import ProductModelStorage from "../../../modules/store-catalog/repository/product.model";
import ClientAdmFacade from "../../../modules/client-adm/facade/client-adm.facade";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";
import CheckoutModel from "../../../modules/checkout/repository/checkout.model";

describe("E2E test for checkout", () => {
    
    let sequelize: Sequelize;

    let migration: Umzug<any>; 
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            //storage: ":memory:",
            storage: "sequelize",
            logging: false
        });
        sequelize.addModels([ClientModel, ProductModelAdm, ProductModelStorage, CheckoutModel]);
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
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        
        ClientModel.create({
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

        const productStorageProps: ProductStorage[] = [
            new ProductStorage({
                id: new Id("1"),
                name: "Product 1",
                description: "Description 1",
                salesPrice: 100,
            }),
            new ProductStorage({
                id: new Id("2"),
                name: "Product 2",
                description: "Description 2",
                salesPrice: 200,
            }),
        ];

        productStorageProps.map((product) => {
            ProductModelStorage.create({
                id: product.id.id,
                name: product.name,
                description: product.description,
                salesPrice: product.salesPrice,
            });
        });

        const productAdmProps: Product[] = [
            new Product({
                id: new Id("1"),
                name: "Product 1",
                description: "Description 1",
                purchasePrice: 10,
                stock: 100,
            }),
            new Product({
                id: new Id("2"),
                name: "Product 2",
                description: "Description 2",
                purchasePrice: 200,
                stock: 200,
            }),
        ];
        
        productAdmProps.map(async (product) => {
            const prod = await ProductModelAdm.findByPk(product.id.id);
            if (prod) {
                prod.purchasePrice = product.purchasePrice;
                prod.stock = product.stock;
                prod.updatedAt = new Date();
                await prod.save();
            }
        });

        const response = await request(app)
            .post("/checkout")
            .send({
                clientId: "1",
                products: [{productId: "1"}, {productId: "2"}],
            });

        if (response.status != 200) {
            console.log("---------------------error------------------------");
            console.log(response.error);
        }
        else {
            console.log(response.body);
        }
    
        expect(response.status).toBe(200);
        expect(response.body.id).toBeDefined();
        expect(response.body.invoiceId).toBeDefined();
        expect(response.body.status).toBe("approved");
        expect(response.body.total).toBe(300);
        expect(response.body.products[0].productId).toBe("1");
        expect(response.body.products[1].productId).toBe("2");
    });
});