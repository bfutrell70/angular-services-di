import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SquadRoutingModule } from './squad-routing.module';
import { SquadCatalogComponent } from './squad-catalog/squad-catalog.component';
import { CartService } from '@core/cart.service';

@NgModule({
  declarations: [SquadCatalogComponent],
  imports: [SharedModule, SquadRoutingModule],
  // module is lazily loaded, this provides a new instance of the service
  providers: [CartService],
})
export class SquadModule { }
