import { InjectionToken } from "@angular/core";
import { Product } from "@catalog/product.model";
import { Observable } from "rxjs";

export interface IProductsService {
  getProducts(): Observable<Product[]>
}

export const IProductsServiceToken = new InjectionToken<IProductsService>("IProductsService");
