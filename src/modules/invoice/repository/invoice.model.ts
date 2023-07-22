import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
    id?: Id;
    name: string;
    price: number;
}

@Table({
    tableName: "invoices",
    timestamps: false,
})
    
export class InvoiceModel extends Model {
    @PrimaryKey
    @Column({allowNull: false})
    id: string;
    
    @Column({ allowNull: false })
    name: string;

    @Column({allowNull: false})
    document: string;
    
    @Column({ allowNull: false })
    street: string;

    @Column({ allowNull: false })
    number: string;

    @Column({ allowNull: false })
    complement: string;

    @Column({ allowNull: false })
    city: string;

    @Column({ allowNull: false })
    state: string;

    @Column({ allowNull: false })
    zipCode: string;

    @Column({ allowNull: false, type: DataType.JSON })
    items: ProductProps[];

    @Column({ allowNull: false, field: "created_at" })
    createdAt: Date;
    
    @Column({ allowNull: false, field: "updated_at" })
    updatedAt: Date;
}