import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InquiriesComponent } from './pages/inquiries/inquiries.component';
import { QuillModule } from 'ngx-quill';
import { OrdersComponent } from './pages/orders/orders.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import{TokenInterceptorService} from '../app/token-interceptor.service';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    InquiriesComponent,
    OrdersComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule, 
    ToastrModule.forRoot(), 
    [NgbModule],
    [NgbPaginationModule, NgbAlertModule],
    QuillModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptorService,
    multi: true
    }, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }


