import { Component, Inject, OnInit } from '@angular/core';
import { Product } from './product.model';
import { ProductsService } from './products.service';
import { CART_SERVICE_TOKEN, CartService } from '@core/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'bot-catalog',
  standalone: false,
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent  {
  products: Observable<Product[]> = this.productService.getProducts();
  private cart: Product[] = [];
  constructor(
    private productService: ProductsService,
    @Inject(CART_SERVICE_TOKEN) private cartService: CartService) { }


  addToCart(product: Product) {
    this.cartService.add(product);
  }
}
