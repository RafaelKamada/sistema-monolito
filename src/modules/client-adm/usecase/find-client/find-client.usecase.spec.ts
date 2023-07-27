import Id from "../../../@shared/domain/value-object/id.value-object";
import Client from "../../domain/client.entity";
import FindClienteUseCase from "./find-client.usecase";

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

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client)),
    };
};


describe("Find a client usecase unit test", () => {
    it("Should find a client", async () => {
        const repository = MockRepository();
        const usecase = new FindClienteUseCase(repository);

        const input = {
            id: "1",
        };

        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled();
        expect(result.id).toBe(input.id);
        expect(result.name).toBe(client.name);
        expect(result.email).toBe(client.email);
        expect(result.document).toBe(client.document);
        expect(result.street).toBe(client.street);
        expect(result.number).toBe(client.number);
        expect(result.complement).toBe(client.complement);
        expect(result.city).toBe(client.city);
        expect(result.state).toBe(client.state);
        expect(result.zipCode).toBe(client.zipCode);
    });
});