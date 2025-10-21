import { Product } from "@shared/product.model";
import { productsArray } from "./products-data";
import { Injectable } from "@angular/core";

// must have the @Injectable({ providedIn: 'root'}) decorator to be able to
// inject the service into other components/modules
@Injectable({ providedIn: 'root'})
export class ProductsService {
  private products: Product[] = [];

  getProducts(): Product[] {
    // return productsArray;
    return this.products;
  }

  refreshProducts() {
    this.products = productsArray;
  }
}
