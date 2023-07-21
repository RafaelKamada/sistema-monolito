import PaymentFacadeInterface from "../facade/facade.interface";
import PaymentFacade from "../facade/payment.facade";
import TransactionRepostiory from "../repository/transaction.repository";
import ProcessPaymentoUseCase from "../usecase/process-payment/process-paymento.usecase";

export default class PaymentFacadeFactory {
    static create(): PaymentFacadeInterface {
        const repository = new TransactionRepostiory();
        const processPaymentoUseCase = new ProcessPaymentoUseCase(repository);
        const facade = new PaymentFacade(processPaymentoUseCase);
        return facade;
    };
}