import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { HomeComponent } from './components/home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { NgRedux, NgReduxModule } from "ng2-redux";
import { AppState } from './redux/appState';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductsCardComponent } from './components/products-card/products-card.component';
import { Reducer } from './redux/reducer';
import { CartCardComponent } from './components/cart-card/cart-card.component';
import { OrderComponent } from './components/order/order.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { ModalComponent } from './components/modal/modal.component';
import { Page404Component } from './components/page404/page404.component';

@NgModule({
  declarations: [
    LayoutComponent,
    HomeComponent,
    MainComponent,
    HeaderComponent,
    CartComponent,
    ProductsCardComponent,
    CartCardComponent,
    OrderComponent,
    RegistrationComponent,
    AdminPanelComponent,
    ModalComponent,
    Page404Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgReduxModule,
  ],
  providers: [],
  bootstrap: [LayoutComponent]
})
export class AppModule {
  public constructor(redux: NgRedux<AppState>) {
    redux.configureStore(Reducer.reduce, new AppState());
  }

}