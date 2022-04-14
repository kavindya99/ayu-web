import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BooksComponent } from './books/books.component';
import { AddbookComponent } from './addbook/addbook.component';
import { ToastrModule } from 'ngx-toastr';
import { NgbAlertModule, NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { InquiriesComponent } from './pages/inquiries/inquiries.component';
import { QuillModule } from 'ngx-quill';


@NgModule({
  declarations: [
    LoginComponent,
    AppComponent,
    BooksComponent,
    AddbookComponent,
    InquiriesComponent,

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
    QuillModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }


