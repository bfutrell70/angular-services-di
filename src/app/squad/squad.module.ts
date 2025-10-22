import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SquadRoutingModule } from './squad-routing.module';
import { SquadCatalogComponent } from './squad-catalog/squad-catalog.component';
import { CartService } from '@core/cart.service';
import { IProductsService, IProductsServiceToken } from '@shared/products-service.interface';
import { EngineersService } from './engineers.service';

@NgModule({
  declarations: [SquadCatalogComponent],
  imports: [SharedModule, SquadRoutingModule],
  // module is lazily loaded, this provides a new instance of the service
  providers: [
    CartService,
    {
      // have to use a custom injection token because interfaces can't be
      // a provider
      provide: IProductsServiceToken,
      useClass: EngineersService
    }
  ],
})
export class SquadModule { }
