import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Address from "../../@shared/domain/value-object/address.value-object";
import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "./product.entity";

type InvoiceProps = {
    id: Id,
    name: string,
    document: string,
    address: Address,
    items: Product[],
};

export default class Invoice extends BaseEntity implements AggregateRoot {
    private _name: string
    private _document: string
    private _address: Address // value object
    private _items: Product[] // Product entity

    constructor(props: InvoiceProps) {
        super(props.id);
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
        let total = 0;
        for (const product of this._items) {
            total += product.price;
        }
        return total;
    }
}