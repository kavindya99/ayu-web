import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppointmentsComponent } from '../appointments/appointments.component';
import { ChannelsComponent } from '../channels/channels.component';
import { DoctorRegistrationRequestsComponent } from '../doctor-registration-requests/doctor-registration-requests.component';
import { DoctorsComponent } from '../doctors/doctors.component';
import { FoodRecipesComponent } from '../food-recipes/food-recipes.component';
import { HomeComponent } from '../home/home.component';
import { InquiriesComponent } from '../inquiries/inquiries.component';
import { OnlineShopComponent } from '../online-shop/online-shop.component';
import { PatientsComponent } from '../patients/patients.component';
import { PaymentsComponent } from '../payments/payments.component';
import { YogaClassesComponent } from '../yoga-classes/yoga-classes.component';
import { YogaPosesComponent } from '../yoga-poses/yoga-poses.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch:'full'},
  { path: 'dashboard', component: DashboardComponent, /*canActivate:['AuthGuard'],*/
      children: [
        { path: '', component: HomeComponent },
        { path: 'channels', component: AppointmentsComponent,/*canActivate:['AuthGuard'],*/ },
        { path: 'online-consultation', component: ChannelsComponent,/*canActivate:['AuthGuard'],*/ },
        { path: 'doctor-registration', component: DoctorRegistrationRequestsComponent,/*canActivate:['AuthGuard'],*/},
        { path: 'doctors', component: DoctorsComponent ,/*canActivate:['AuthGuard'],*/},
        { path: 'food-recipes', component: FoodRecipesComponent, /*canActivate:['AuthGuard'],*/},
        { path: 'online-shop', component: OnlineShopComponent , /*canActivate:['AuthGuard'],*/},
        { path: 'patients', component: PatientsComponent , /*canActivate:['AuthGuard'],*/},
        { path: 'payments', component: PaymentsComponent , /*canActivate:['AuthGuard'],*/},
        { path: 'yoga-class', component: YogaClassesComponent ,/*canActivate:['AuthGuard'],*/},
        { path: 'yoga-poses', component: YogaPosesComponent ,/*canActivate:['AuthGuard'],*/},
        { path: 'inquiries', component: InquiriesComponent ,/*canActivate:['AuthGuard'],*/}, 
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
