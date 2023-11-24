import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TradesComponent } from './trades/trades.component';
import { PositionsComponent } from './positions/positions.component';
import { PricesComponent } from './prices/prices.component';
import { WhiskeySetupComponent } from './static/whiskey-setup/whiskey-setup.component';
import { DropDownListRendererComponent } from './cellRenderers/drop-down-list-renderer/drop-down-list-renderer.component';
import { AdminComponent } from './static/admin/admin.component';
import { DeleteButtonComponent } from './cellRenderers/delete-button/delete-button.component';
import { DatePickerRendererComponent } from './cellRenderers/date-picker-renderer/date-picker-renderer.component';
import { FormsModule } from '@angular/forms';
import { WhiskeyDetailsComponent } from './whiskey-details/whiskey-details.component';
import { TableModule } from 'primeng/table';
import { PriceGraphComponent } from './price-graph/price-graph.component';

import { AuthModule } from '@auth0/auth0-angular';
import { AuthButtonComponent } from './auth/auth-button/auth-button.component';
import { AccountInformationComponent } from './auth/account-information/account-information.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { environment as env } from '../environments/environment';

import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthHttpInterceptor } from '@auth0/auth0-angular';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [
    AppComponent,
    TradesComponent,
    PositionsComponent,
    PricesComponent,
    WhiskeySetupComponent,
    DropDownListRendererComponent,
    AdminComponent,
    DeleteButtonComponent,
    DatePickerRendererComponent,
    WhiskeyDetailsComponent,
    PriceGraphComponent,
    AuthButtonComponent,
    AccountInformationComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    //AgGridModule.withComponents([DateTimeRenderer, DropDownListRendererComponent, DeleteButtonComponent, DatePickerRendererComponent]),
    FormsModule,
    AuthModule.forRoot({
      ...env.auth,
      httpInterceptor: {
        allowedList: [`${env.api.serverUrl}/api/data/*`],
      },
    }),
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    TableModule,
    ButtonModule,
    InputTextModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptor,
    multi: true,
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
