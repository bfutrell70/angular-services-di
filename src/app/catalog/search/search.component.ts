import { Component, Inject, OnInit } from '@angular/core';
import { Product } from '../product.model';
import { ProductsService } from '@catalog/products.service';
import { CART_SERVICE_TOKEN, CartService } from '@core/cart.service';

@Component({
  selector: 'bot-search',
  standalone: false,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';

  constructor(
    private productService: ProductsService,
    @Inject(CART_SERVICE_TOKEN) private cartService: CartService) { }

  ngOnInit() {
    this.productService.getProducts().subscribe((products) => this.products = products);
  }

  addToCart(product: Product) {
    this.cartService.add(product);
  }

  filter(event: Event) {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
  }

  getFilteredProducts() {
    return this.searchTerm === ''
      ? this.products
      : this.products.filter(
        (product: Product) => product.name.toLowerCase().includes(this.searchTerm)
      );
  }
}
