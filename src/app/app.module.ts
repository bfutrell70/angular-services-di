import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { SiteHeaderComponent } from '@core/site-header/site-header.component';
import { AppRoutingModule } from './app-routing.module';
import { CatalogModule } from '@catalog/catalog.module';
import { HttpClientModule } from '@angular/common/http';
import { CART_SERVICE_TOKEN, CartService } from '@core/cart.service';

@NgModule({
  declarations: [
    AppComponent,
    SiteHeaderComponent,
  ],
  // HttpClientModule is deprecated - what is it replaced with?
  imports: [BrowserModule, AppRoutingModule, FormsModule, CatalogModule, HttpClientModule],
  providers: [
    // causes a second instance of the CartService to be created
    // caused by using a different provider token than the default method
    {
      provide: CART_SERVICE_TOKEN,
      useClass: CartService
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
