import { Category } from './category';

export class Product {
    public constructor(
        public _id?: string,
        public productName?: string,
        public categoryID?: Category,
        public price?: number,
        public pictureName?: string,

    ) { }
}
