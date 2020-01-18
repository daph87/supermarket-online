import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainComponent } from './components/main/main.component';
import { OrderComponent } from './components/order/order.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { Page404Component } from './components/page404/page404.component';



const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "main", component: MainComponent },
  { path: "orders", component: OrderComponent },
  { path: "register", component: RegistrationComponent },
  { path: "page404", component: Page404Component },
  { path: "", redirectTo: "/home", pathMatch: "full" },
  { path: "**", redirectTo: "/page404", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
