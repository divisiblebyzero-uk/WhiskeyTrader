import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { AccountInformationComponent } from './auth/account-information/account-information.component';
import { PositionsComponent } from './positions/positions.component';
import { PricesComponent } from './prices/prices.component';
import { AdminComponent } from './static/admin/admin.component';
import { WhiskeySetupComponent } from './static/whiskey-setup/whiskey-setup.component';
import { TradesComponent } from './trades/trades.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { WhiskeyFullDetailsComponent } from './widgets/whiskey-full-details/whiskey-full-details.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'prices', component: PricesComponent, canActivate: [AuthGuard]},
  {path: 'positions', component: PositionsComponent, canActivate: [AuthGuard]},
  {path: 'trades', component: TradesComponent, canActivate: [AuthGuard]},
  {path: 'whiskey-setup', component: WhiskeySetupComponent, canActivate: [AuthGuard]},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'whiskey-details/:id', component: WhiskeyFullDetailsComponent, canActivate: [AuthGuard]},
  {path: 'account-information', component: AccountInformationComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
