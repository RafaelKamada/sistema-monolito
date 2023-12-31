import ClientAdmFacade from "../facade/client-adm.facade";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import FindClientUseCase from "../usecase/find-client/find-client.usecase";

export default class ClientAdmFacadeFactory {
    static create() {
        const repository = new ClientRepository();
        const addClientUseCase = new AddClientUseCase(repository);
        const findClientkUseCase = new FindClientUseCase(repository);
        const clientFacade = new ClientAdmFacade({
            addUseCase: addClientUseCase,
            findUseCase: findClientkUseCase,
        });

        return clientFacade;
    };
}