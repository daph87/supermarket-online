import { Component, OnInit, Input } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { AppState } from 'src/app/redux/appState';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  public categories: Category[];
  public category: Category;
  public image: File;
  public newProduct = new Product();
  public modalMessage: string;
  public headingMessage: string;


  constructor(public redux: NgRedux<AppState>, private productsService: ProductsService, private categoriesServices: CategoriesService) { }

  ngOnInit() {

    this.categoriesServices.getAllCategories().subscribe(
      categories => this.categories = categories,
      err => console.log(err));
  }

  // Update Product in DataBase
  public updateProduct(): void {
    let updatedProduct = {
      _id: this.redux.getState().productToUpdate._id,
      productName: this.redux.getState().productToUpdate.productName,
      price: this.redux.getState().productToUpdate.price,
      categoryID: this.redux.getState().productToUpdate.categoryID,
    }

    this.productsService.updateProduct(updatedProduct._id, updatedProduct).subscribe(() => {
      this.redux.getState().productToUpdate.categoryID = updatedProduct.categoryID;
    })

    this.redux.getState().modal = "block";
    this.redux.getState().closedModal = false;
    this.headingMessage = "Well Done";
    this.modalMessage = "This product has been updated";
    this.redux.getState().display = true;
  }

  // Update image in DataBase
  public updateImage(event) {
    this.image = <File>event.target.files[0];
    const fd = new FormData();
    fd.append("myImage", this.image);
    fd.append("theProduct", this.image.name);
    fd.append("product_id", this.redux.getState().productToUpdate._id);
    this.productsService.patchImage(fd).subscribe(() => {

    },
      err => console.log(err));

  }

  // Set Image
  public setImage($event): void {
    this.image = <File>$event.target.files[0];
  }

  // Add Product to the DataBase 
  public addProduct(): void {
    this.newProduct.pictureName = this.image.name;
    const fd = new FormData();
    fd.append("myImage", this.image, this.image.name);
    fd.append("newProduct", JSON.stringify(this.newProduct));
    this.productsService.postImage(fd).subscribe(p => p, err => console.log());
    this.redux.getState().modal = "block";
    this.redux.getState().closedModal = false;
    this.headingMessage = "Well Done";
    this.modalMessage = "This product has been added";
    this.redux.getState().display = false;

  }

  // Display Form by clicking on button
  public displayAddingForm(): void {
    this.redux.getState().display = true;
  }

}

