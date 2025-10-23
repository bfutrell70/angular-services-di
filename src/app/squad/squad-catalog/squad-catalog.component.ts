import { Component, Host, Inject, Optional, Self, SkipSelf } from '@angular/core';
import { Product } from '@shared/product.model';
import { engineers } from './engineers';
import { CartService } from '@core/cart.service';
import {
  IProductsService,
  IProductsServiceToken,
} from '@shared/products-service.interface';
import { Observable } from 'rxjs';
import { EngineersService } from '../engineers.service';

@Component({
  selector: 'bot-catalog',
  standalone: false,
  templateUrl: './squad-catalog.component.html',
  styleUrls: ['./squad-catalog.component.css'],
  providers: [
    // provides a unique instance of the EngineersService to this component
    {
      // have to use a custom injection token because interfaces can't be
      // a provider
      provide: IProductsServiceToken,
      useClass: EngineersService,
    },
  ],
})
export class SquadCatalogComponent {
  squad: Observable<Product[]> = this.engineersService.getProducts();

  constructor(
    private cartService: CartService,
    // -- @Self indicates the object must be provided from the component's provider
    @Self() @Inject(IProductsServiceToken) private engineersService: IProductsService
    // -- @SkipSelf ignores providers from the component
    // @SkipSelf() @Inject(IProductsServiceToken) private engineersService: IProductsService
    // -- @Host refers to the component that hosts this component, provider comes from the host
    // @Host() @Inject(IProductsServiceToken) private engineersService: IProductsService
    // -- normally a DI is required, and will throw an exception if not found
    // -- @Optional indicates that if the provider isn't found to assign null
    // @Optional() @Inject(IProductsServiceToken) private engineersService: IProductsService
  ) {}

  addToCart(engineer: Product) {
    this.cartService.add(engineer);
  }
}
