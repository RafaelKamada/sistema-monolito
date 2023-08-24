import { Sequelize } from "sequelize-typescript";
import { app } from "../express";
import { Umzug } from "umzug";
import { migrator } from "../../../test-migrations/config-migrations/migrator";
import request from "supertest";
import ClientModel from "../../../modules/client-adm/repository/client.model";
import CheckoutModel from "../../../modules/checkout/repository/checkout.model";
import ProductModelStorage from "../../../modules/store-catalog/repository/product.model";
import ProductModelAdm  from "../../../modules/product-adm/repository/product.model";
import Invoice from "../../../modules/invoice/domain/invoice.entity";

describe("E2E test for invoice", () => {
    let sequelize: Sequelize;

    let migration: Umzug<any>; 
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
            //storage: "sequelize",
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

    const inputProducts = [
        {
            id: "1",
            name: "Product 1",
            description: "Description 1",
            purchasePrice: 10,
            salesPrice: 100,
            stock: 100,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            id: "2",
            name: "Product 2",
            description: "Description 2",
            purchasePrice: 200,
            salesPrice: 200,
            stock: 200,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    ];

    const inputClient = {
        id: "1",
        name: "Client 1",
        email: "e@e.com",
        document: "Document 1",
        street: "Street 1",
        number: "123",
        complement: "",
        city: "City 1",
        state: "State 1",
        zipCode: "12345",
    }
  
    it("should get an invoice", async () => {

        const responseClient = await request(app)
            .post("/clients")
            .send({
                id: inputClient.id,
                name: inputClient.name,
                email: inputClient.email,
                document: inputClient.document,
                street: inputClient.street,
                number: inputClient.number,
                complement: inputClient.complement,
                city: inputClient.city,
                state: inputClient.state,
                zipCode: inputClient.zipCode,
            });        
        expect(responseClient.status).toBe(200);
        
        const responseProduct = await request(app).post("/products").send({ products: inputProducts });
        expect(responseProduct.status).toBe(200);

        const responseCheckout = await request(app)
            .post("/checkout")
            .send({
                clientId: responseClient.body.id,
                products: [{productId: responseProduct.body[0].id}, {productId: responseProduct.body[1].id}],
            });
        expect(responseCheckout.status).toBe(200);

        const responseInvoice = await request(app).get("/invoice/" + responseCheckout.body.invoiceId);
        
        console.log("------------------------responseCheckout------------------------------");
        console.log(responseCheckout.body);
        console.log("------------------------responseInvoice------------------------------");
        console.log(responseInvoice.body);
        
        const invoiceJson = Invoice.fromJson(JSON.stringify(responseInvoice.body));

        console.log("------------------------invoiceJson------------------------------");
        console.log(invoiceJson);
        console.log(invoiceJson.items[0].id.id);
        console.log(invoiceJson.items[0].name);

        expect(responseInvoice.status).toBe(200);
        expect(responseInvoice.body.name).toBe(inputClient.name);
        expect(responseInvoice.body.document).toBe(inputClient.document);
        expect(responseInvoice.body.total).toBe(responseCheckout.body.total);
        //expect(responseInvoice.body.createdAt).toBe(responseCheckout.body.createdAt);

        expect(invoiceJson.address.street).toBe(inputClient.street);
        expect(invoiceJson.address.number).toBe(inputClient.number);
        expect(invoiceJson.address.complement).toBe(inputClient.complement);
        expect(invoiceJson.address.city).toBe(inputClient.city);
        expect(invoiceJson.address.state).toBe(inputClient.state);
        expect(invoiceJson.address.zipCode).toBe(inputClient.zipCode);
        
        expect(responseInvoice.body.items[0].id).toBe(responseProduct.body[0].id);
        expect(responseInvoice.body.items[0].name).toBe(responseProduct.body[0].name);
        expect(responseInvoice.body.items[0].price).toBe(inputProducts[0].salesPrice);
        expect(responseInvoice.body.items[1].id).toBe(responseProduct.body[1].id);
        expect(responseInvoice.body.items[1].name).toBe(responseProduct.body[1].name);
        expect(responseInvoice.body.items[1].price).toBe(inputProducts[1].salesPrice);
    });
});