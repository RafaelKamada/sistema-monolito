import Order from "../domain/order.entity";
import CheckoutGateway from "../gateway/checkout.gateway";
import CheckoutModel from "./checkout.model";

export default class CheckoutRepository implements CheckoutGateway {
    
    async addOrder(order: Order): Promise<void> {
        await CheckoutModel.create({
            id: order.id.id,
            clientId: order.client.id.id,
            products: order.products.map((p) => {
                return { productId: p.id.id };
            }),
            createdAt: order.createdAt,
            updatedAt: order.updatedAt,
        });
    }

    async findOrder(id: string): Promise<Order> {
        throw new Error("Method not implemented.");
    }

}