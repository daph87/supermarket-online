import { Customer } from './customer';
import { Cart } from './cart';

export class Order {
    public constructor(
        public _id?: string,
        public customerID?: Customer | string,
        public cartID?: Cart | string,
        public finalPrice?: number,
        public deliveryCity?: string,
        public deliveryStreet?: string,
        public deliveryDate?: string,
        public houseNumber?: number,
        public creditCardNumber?: number

    ) { }
}
