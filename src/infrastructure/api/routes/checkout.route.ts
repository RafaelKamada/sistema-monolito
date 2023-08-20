import express, { Request, Response } from "express";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";
import PlaceOrderUseCase from "../../../modules/checkout/usecase/place-order/place-order.usecase";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import StoreCatalogFacadeFactory from '../../../modules/store-catalog/factory/facade.factory';
import InvoiceFacadeFactory from "../../../modules/invoice/factory/facade.factory";
import PaymentFacadeFactory from "../../../modules/payment/factory/facade.factory";
import PlaceOrderRepository from "../../../modules/checkout/repository/checkout.repository";
import CheckoutFacadeFactory from "../../../modules/checkout/factory/checkout.facade.factory";

export const checkoutRoute = express.Router();

checkoutRoute.post('/', async (req: Request, res: Response) => {
    try {        
        const facade = CheckoutFacadeFactory.create();

        // const usecase = new PlaceOrderUseCase(
        //     ClientAdmFacadeFactory.create(),
        //     ProductAdmFacadeFactory.create(),
        //     StoreCatalogFacadeFactory.create(),
        //     new PlaceOrderRepository(),
        //     InvoiceFacadeFactory.create(),
        //     PaymentFacadeFactory.create());
        
        const checkoutDto = {
            clientId: req.body.clientId,
            products: req.body.products,
        };
        
        //const output = await usecase.execute(checkoutDto);
        const output = await facade.placeOrder(checkoutDto);
        res.send(output);
    } catch (err) {
        console.log("---------------------checkoutRoute------------------------");
        console.log(err);

        res.status(500).send(err);
    }
});