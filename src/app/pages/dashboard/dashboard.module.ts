import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { ChannelsComponent } from '../channels/channels.component';
import { DoctorRegistrationRequestsComponent } from '../doctor-registration-requests/doctor-registration-requests.component';
import { DoctorsComponent } from '../doctors/doctors.component';
import { FoodRecipesComponent } from '../food-recipes/food-recipes.component';
import { HomeComponent } from '../home/home.component';
import { OnlineShopComponent } from '../online-shop/online-shop.component';
import { PatientsComponent } from '../patients/patients.component';
import { PaymentsComponent } from '../payments/payments.component';
import { YogaClassesComponent } from '../yoga-classes/yoga-classes.component';
import { YogaPosesComponent } from '../yoga-poses/yoga-poses.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [
    DashboardComponent,
    DoctorsComponent,
    PatientsComponent,
    ChannelsComponent,
    AppointmentsComponent,
    YogaPosesComponent,
    YogaClassesComponent,
    FoodRecipesComponent,
    DoctorRegistrationRequestsComponent,
    PaymentsComponent,
    OnlineShopComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule, 
    FormsModule,
    ImageCropperModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
  ]
})
export class DashboardModule { }
