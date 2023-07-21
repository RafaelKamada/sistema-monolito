import { Sequelize } from "sequelize-typescript";
import TransactionModel from "../repository/transaction.model";
import TransactionRepostiory from "../repository/transaction.repository";
import ProcessPaymentoUseCase from "../usecase/process-payment/process-paymento.usecase";
import PaymentFacade from "./payment.facade";

describe("Payment facade unit test", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
        dialect: "sqlite",
        storage: ":memory:",
        logging: false,
        sync: { force: true },
        });

        await sequelize.addModels([TransactionModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });
    
    it("Should create a transaction", async () => {
        const repository = new TransactionRepostiory();
        const usecase = new ProcessPaymentoUseCase(repository);
        const facade = new PaymentFacade(usecase);

        const input = {
            orderId: "order-1",
            amount: 100,
        };

        const output = await facade.process(input);

        expect(output.transactionId).toBeDefined();
        expect(output.orderId).toBe(input.orderId);
        expect(output.amount).toBe(input.amount);
        expect(output.status).toBe("approved");
    });
});