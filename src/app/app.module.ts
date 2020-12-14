import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AgGridModule } from 'ag-grid-angular';
import { DateTimeRenderer } from './cellRenderers/DateTimeRenderer';

import { TradesComponent } from './trades/trades.component';
import { HoldingsComponent } from './holdings/holdings.component';
import { PricesComponent } from './prices/prices.component';
import { WhiskeySetupComponent } from './static/whiskey-setup/whiskey-setup.component';
import { DropDownListRendererComponent } from './cellRenderers/drop-down-list-renderer/drop-down-list-renderer.component';
import { AdminComponent } from './static/admin/admin.component';
import { DeleteButtonComponent } from './cellRenderers/delete-button/delete-button.component';

@NgModule({
  declarations: [
    AppComponent,
    TradesComponent,
    HoldingsComponent,
    PricesComponent,
    WhiskeySetupComponent,
    DropDownListRendererComponent,
    AdminComponent,
    DeleteButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AgGridModule.withComponents([DateTimeRenderer, DropDownListRendererComponent, DeleteButtonComponent]),
    FontAwesomeModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
