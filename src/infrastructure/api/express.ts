import express, { Express } from "express";
import { Sequelize } from "sequelize-typescript";
import ClientModel from "../../modules/client-adm/repository/client.model";
import { InvoiceModel } from "../../modules/invoice/repository/invoice.model";
import TransactionModel from "../../modules/payment/repository/transaction.model";
import ProductModel from "../../modules/store-catalog/repository/product.model";
import { clientRoute } from "./routes/client.route";
import { checkoutRoute } from "./routes/checkout.route";
import { productsRoute } from "./routes/products.route";

export const app: Express = express();
app.use(express.json());
app.use("/clients", clientRoute);
app.use("/checkout", checkoutRoute);
app.use("/products", productsRoute);

export let sequelize: Sequelize;

async function setupDb() {
    sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
    });

    await sequelize.addModels([ClientModel, InvoiceModel, TransactionModel, ProductModel]);
    await sequelize.sync();
}

setupDb();