import Client from "../domain/client.entity";

export default interface ClientGateway {
    add(product: Client): Promise<void>;
    find(id: string): Promise<Client>;
}