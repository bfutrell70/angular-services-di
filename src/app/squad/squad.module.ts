import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SquadRoutingModule } from './squad-routing.module';
import { SquadCatalogComponent } from './squad-catalog/squad-catalog.component';
import { CART_OPTIONS_TOKEN, CartOptions, CartService } from '@core/cart.service';
import { IProductsService, IProductsServiceToken } from '@shared/products-service.interface';
import { EngineersService } from './engineers.service';


@NgModule({
  declarations: [SquadCatalogComponent],
  imports: [SharedModule, SquadRoutingModule],
  // module is lazily loaded, this provides a new instance of the service
  providers: [
    CartService,
    {
      provide: CART_OPTIONS_TOKEN,
      useValue: { persistenceType: 'local', persistenceKey: 'squad-cart' },
      // used in directives with the same provider token
      multi: false
    },
    {
      provide: CartService,
      useFactory: (cartOptions: CartOptions) => { return new CartService(cartOptions); },
      deps: [CART_OPTIONS_TOKEN],
      multi: false
    },
    // {
    //   // have to use a custom injection token because interfaces can't be
    //   // a provider
    //   provide: IProductsServiceToken,
    //   useClass: EngineersService
    // },
  ],
})
export class SquadModule { }
