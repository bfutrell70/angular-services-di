import { Product } from "@shared/product.model";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { IProductsService } from "@shared/products-service.interface";

// must have the @Injectable({ providedIn: 'root'}) decorator to be able to
// inject the service into other components/modules
@Injectable({ providedIn: 'root' })
export class ProductsService implements IProductsService {

  constructor(private httpClient: HttpClient) {

  }

  getProducts(): Observable<Product[]> {
    // if using fetch, have to get json data from response
    // then using next to emit a new value
    // fetch("/api/products")
    //   .then((resp) => resp.json()
    //     .then((productsArray) => {
    //       this.products.next(productsArray)
    //     })
    //   );
    return this.httpClient.get<Product[]>("/api/products");
  }
}
