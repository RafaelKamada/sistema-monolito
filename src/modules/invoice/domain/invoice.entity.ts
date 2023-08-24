import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "./product.entity";

type InvoiceProps = {
    id?: Id;
    name: string;
    document: string;
    address: Address;
    items: Product[];
    createdAt?: Date;
    updatedAt?: Date;
};

export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string
    private _document: string
    private _address: Address // value object
    private _items: Product[] // Product entity

    constructor(props: InvoiceProps) {
        super(props.id, props.createdAt, props.updatedAt);
        this._name = props.name;
        this._document = props.document;
        this._address = props.address;
        this._items = props.items;
    }

    get name(): string {
        return this._name;
    }

    get document(): string {
        return this._document;
    }

    get address(): Address {
        return this._address;
    }

    get items(): Product[] {
        return this._items;
    }

    get total(): number {
        return this._items.reduce((total, product) => {
            return total + product.price;
        }, 0);
    }

    static fromJson(json: string): Invoice {
        const data = JSON.parse(json);
        return new Invoice({
            id: data.id,
            name: data.name,
            document: data.document,
            address: new Address(
                data.address._street,
                data.address._number,
                data.address._complement,
                data.address._city,
                data.address._state,
                data.address._zipCode
            ),
            items: data.items.map((item: Product) => {
                return new Product({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                });
            }),
        });
    }
}