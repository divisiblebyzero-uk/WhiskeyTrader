import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PositionsComponent } from './positions/positions.component';
import { PricesComponent } from './prices/prices.component';
import { AdminComponent } from './static/admin/admin.component';
import { WhiskeySetupComponent } from './static/whiskey-setup/whiskey-setup.component';
import { TradesComponent } from './trades/trades.component';

const routes: Routes = [
  {path: 'prices', component: PricesComponent},
  {path: 'positions', component: PositionsComponent},
  {path: 'trades', component: TradesComponent},
  {path: 'whiskey-setup', component: WhiskeySetupComponent},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
