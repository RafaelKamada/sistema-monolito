import express, { Request, Response } from "express";
import ProductAdmFacadeFactory from "../../../modules/product-adm/factory/facade.factory";
import { AddProductFacadeOutputDto } from "../../../modules/product-adm/facade/product-adm.facade.dto";

export const productsRoute = express.Router();

productsRoute.post('/', async (req: Request, res: Response) => {
    try {        
        const facade = ProductAdmFacadeFactory.create();
        let output: AddProductFacadeOutputDto[] = [];
        
        await Promise.all(req.body.products.map(async (product: any) => {
            const productDto = {
                id: product.id,
                name: product.name,
                description: product.description,
                purchasePrice: product.purchasePrice,
                stock: product.stock,
                createdAt: product.createdAt,
                updatedAt: product.updatedAt,
            };

            output.push(await facade.addProduct(productDto));
        }));
        
        res.send(output);
    } catch (err) {
        console.log("---------------------productsRoute------------------------");
        console.log(err);
        res.status(500).send(err);
    }
});