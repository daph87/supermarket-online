import { Cart } from './cart';

export class Item {
    public constructor(
        public _id?: string,
        public productID?: any,
        public amount?: number | 0,
        public totalPrice?: number,
        public cartID?: Cart | string

    ) { }
}
