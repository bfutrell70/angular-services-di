import { Product } from "@shared/product.model";
import { Injectable } from "@angular/core";
import { Observable, of, Subject } from "rxjs";
import { IProductsService } from "@shared/products-service.interface";
import { engineers } from "./squad-catalog/engineers";

// must have the @Injectable({ providedIn: 'root'}) decorator to be able to
// inject the service into other components/modules
@Injectable({ providedIn: 'root' })
export class EngineersService implements IProductsService {

  getProducts(): Observable<Product[]> {
    return of(engineers);
  }
}
