import { Customer } from '../models/customer';
import { Item } from '../models/item';
import { Product } from '../models/product';
import { Manager } from '../models/manager';

export class AppState {
    public connectedUser: Customer;
    public items: Item[] | undefined;
    public finalPrice: number = 0;
    public productToUpdate: Product;
    public display: boolean;
    public modal: string = "none";
    public closedModal: boolean = true;
    public connectedAdmin: Manager;

}