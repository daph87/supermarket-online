import { Customer } from './customer';

export class Cart {
  public constructor(
    public _id?: string,
    public customerID?: Customer | string,
    public creationDate?: string | Date
  ) { }
}
