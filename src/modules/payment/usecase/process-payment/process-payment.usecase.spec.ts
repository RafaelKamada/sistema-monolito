import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction";
import ProcessPaymentoUseCase from "./process-paymento.usecase";


const transaction = new Transaction({
    id: new Id("1"),
    amount: 100,
    orderId: "1",
    status: "approved",
});

const MockRepository = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
    };
}

const transactionDeclined = new Transaction({
    id: new Id("1"),
    amount: 50,
    orderId: "1",
    status: "declined",
});

const MockRepositoryDeclined = () => {
    return {
        save: jest.fn().mockReturnValue(Promise.resolve(transactionDeclined)),
    };
}

describe("Process payment usecase unit test", () => {

    it("Should create a payment", async () => {
        const paymentRepository = MockRepository();
        const usecase = new ProcessPaymentoUseCase(paymentRepository);
        const input = {
            orderId: "1",
            amount: 100,
        };

        const result = await usecase.execute(input);

        expect(result.transactionId).toBe(transaction.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe("approved");
        expect(result.amount).toBe(100);
        expect(result.orderId).toBe("1");
        expect(result.createdAt).toBe(transaction.createdAt);
        expect(result.updatedAt).toBe(transaction.updatedAt);
    });

    it("Should decline a transaction", async () => {
        const paymentRepository = MockRepositoryDeclined();
        const usecase = new ProcessPaymentoUseCase(paymentRepository);
        const input = {
            orderId: "1",
            amount: 50,
        };

        const result = await usecase.execute(input);

        expect(result.transactionId).toBe(transactionDeclined.id.id);
        expect(paymentRepository.save).toHaveBeenCalled();
        expect(result.status).toBe("declined");
        expect(result.amount).toBe(50);
        expect(result.orderId).toBe("1");
        expect(result.createdAt).toBe(transactionDeclined.createdAt);
        expect(result.updatedAt).toBe(transactionDeclined.updatedAt);
    });
});