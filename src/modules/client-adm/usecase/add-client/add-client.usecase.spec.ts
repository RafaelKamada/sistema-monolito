import AddClientUseCase from "./add-client.usecase";

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn(),
    };
};


describe("Add Cliente usecase unit test", () => {

    it("Add a cliente", async () => {
        const clientRepository = MockRepository();
        const usecase = new AddClientUseCase(clientRepository);

        const input = {
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
        };

        const result = await usecase.execute(input);
        
        expect(clientRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined;
        expect(result.name).toBe(input.name);
        expect(result.email).toBe(input.email);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipCode).toBe(input.zipCode);
    });
});