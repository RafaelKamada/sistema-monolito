import { Sequelize } from "sequelize-typescript";
import ProductModelAdm  from "../../../modules/product-adm/repository/product.model";
import { app } from "../express";
import request from "supertest";
import { Umzug } from "umzug"
import { migrator } from "../../../test-migrations/config-migrations/migrator";
import ProductModelStorage from "../../../modules/store-catalog/repository/product.model";

describe("E2E test for products", () => {
    
    let sequelize: Sequelize;

    let migration: Umzug<any>; 
    
    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ":memory:",
    //        storage: "sequelize",
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
  
    it("should create a product", async () => {

        const input = [
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
                purchasePrice: 20,
                salesPrice: 200,
                stock: 200,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        ];

        const response = await request(app)
            .post("/products")
            .send({
                products: input,
            });

        if (response.status != 200) {
            console.log("---------------------error------------------------");
            console.log(response.error);
        }
        else {
            console.log(response.body);
        }
    
        expect(response.status).toBe(200);
        expect(response.body[0].id).toBe(input[0].id);
        expect(response.body[0].name).toBe(input[0].name);
        expect(response.body[0].description).toBe(input[0].description);
        expect(response.body[0].purchasePrice).toBe(input[0].purchasePrice);
        expect(response.body[0].stock).toBe(input[0].stock);
        expect(response.body[0].createdAt).toBeDefined();
        expect(response.body[0].updatedAt).toBeDefined();
        
        expect(response.body[1].id).toBe(input[1].id);
        expect(response.body[1].name).toBe(input[1].name);
        expect(response.body[1].description).toBe(input[1].description);
        expect(response.body[1].purchasePrice).toBe(input[1].purchasePrice);
        expect(response.body[1].stock).toBe(input[1].stock);
        expect(response.body[1].createdAt).toBeDefined();
        expect(response.body[1].updatedAt).toBeDefined();
    });
});