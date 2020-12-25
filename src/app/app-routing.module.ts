import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PositionsComponent } from './positions/positions.component';
import { PricesComponent } from './prices/prices.component';
import { AdminComponent } from './static/admin/admin.component';
import { WhiskeySetupComponent } from './static/whiskey-setup/whiskey-setup.component';
import { TradesComponent } from './trades/trades.component';
import { WhiskeyDetailsComponent} from './whiskey-details/whiskey-details.component';

const routes: Routes = [
  {path: 'prices', component: PricesComponent},
  {path: 'positions', component: PositionsComponent},
  {path: 'trades', component: TradesComponent},
  {path: 'whiskey-setup', component: WhiskeySetupComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'whiskey-details/:id', component: WhiskeyDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
