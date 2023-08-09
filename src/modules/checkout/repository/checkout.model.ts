import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

type ProductsIds = {
    productId: string;
}

@Table({
    tableName: "orders",
    timestamps: false,
})
export default class CheckoutModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string;
    
    @Column({ allowNull: false, field: "client_id" })
    clientId: string;

    @Column({ allowNull: false, field: "products", type: DataType.JSON })
    products: ProductsIds[];
    
    @Column({ allowNull: false, field: "created_at" })
    createdAt: Date;
    
    @Column({ allowNull: false, field: "updated_at" })
    updatedAt: Date;
}