import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
    id?: Id;
    name: string;
    price: number;
}

export default class Product extends BaseEntity implements AggregateRoot {
    private _name: string;
    private _price: number;
    
    constructor(props: ProductProps) {
        super(props.id);
        this._name = props.name;
        this._price = props.price;
    }

    get name(): string {
        return this._name;
    }

    get price(): number {
        return this._price;
    }

    static fromJson(json: string): ProductProps {
        const data = JSON.parse(json);
        return new Product({
            id: new Id(data?._id?._id) || new Id(data.id._id),
            name: data?._name || data.name,
            price: data?._price || data.price,
        });
    }
}