import { Sequelize } from "sequelize-typescript";
import ClientModel from "./client.model";
import Id from '../../@shared/domain/value-object/id.value-object';
import ClientRepository from "./client.repository";
import Client from "../domain/client.entity";

describe("ClientRepository unit test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ClientModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    
    it("Should find a client", async () => {
        const client = await ClientModel.create({
            id: "1",
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

        const repository = new ClientRepository();
        const result = await repository.find(client.id);

        expect(result.id.id).toEqual(client.id);
        expect(result.name).toEqual(client.name);
        expect(result.email).toEqual(client.email);
        expect(result.document).toBe(client.document);
        expect(result.street).toBe(client.street);
        expect(result.number).toBe(client.number);
        expect(result.complement).toBe(client.complement);
        expect(result.city).toBe(client.city);
        expect(result.state).toBe(client.state);
        expect(result.zipCode).toBe(client.zipCode);
        expect(result.createdAt).toStrictEqual(client.createdAt);
        expect(result.updatedAt).toStrictEqual(client.updatedAt);
        
    });

    it("Should create a client", async () => {
        const client = new Client({
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

        const repository = new ClientRepository();
        await repository.add(client);
        
        const clientDb = await ClientModel.findOne({ where: { id: "1" } });
        
        expect(clientDb).toBeDefined();
        expect(clientDb.id).toEqual(client.id.id);
        expect(clientDb.name).toEqual(client.name);
        expect(clientDb.email).toEqual(client.email);
        expect(clientDb.document).toBe(client.document);
        expect(clientDb.street).toBe(client.street);
        expect(clientDb.number).toBe(client.number);
        expect(clientDb.complement).toBe(client.complement);
        expect(clientDb.city).toBe(client.city);
        expect(clientDb.state).toBe(client.state);
        expect(clientDb.zipCode).toBe(client.zipCode);
        expect(clientDb.createdAt).toStrictEqual(client.createdAt);
        expect(clientDb.updatedAt).toStrictEqual(client.updatedAt);
    });
});