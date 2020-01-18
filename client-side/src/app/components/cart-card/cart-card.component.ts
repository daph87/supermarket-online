import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/models/category';
import { Item } from 'src/app/models/item';
import { ItemsService } from 'src/app/services/items.service';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { ActionType } from 'src/app/redux/actionType';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-cart-card',
  templateUrl: './cart-card.component.html',
  styleUrls: ['./cart-card.component.css']
})
export class CartCardComponent implements OnInit {
  @Input() item: Item;
  @Input() appearance: boolean
  public imgUrl: string;
  public categories: Category[];
  public categoryName: String;
  constructor(private categoriesService: CategoriesService, private itemsService: ItemsService, public redux: NgRedux<AppState>) { }

  ngOnInit() {

    this.categoriesService.getAllCategories().subscribe(allCategories => {
      this.categories = allCategories
      this.categories.map(c => {
        if (c._id === this.item.productID.categoryID) {
          this.categoryName = c.categoryName
        }
        this.imgUrl = 'http://localhost:3000/assets/' + this.item.productID.pictureName;

      });

    });
  }
  // Delete one item of customer's cart
  public deleteOneItem(): void {
    this.itemsService
      .deleteItem(this.item._id)
      .subscribe(
        () => {
          const action = { type: ActionType.deleteItemFromCart, payload: this.item };
          this.redux.dispatch(action);
          this.redux.getState().finalPrice -= this.item.totalPrice;

        }
      )
  }
}

