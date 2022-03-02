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
  { path: 'dashboard', component: DashboardComponent,
      children: [
        { path: '', component: HomeComponent },
        { path: 'appointments', component: AppointmentsComponent },
        { path: 'channels', component: ChannelsComponent },
        { path: 'doctor-registration', component: DoctorRegistrationRequestsComponent},
        { path: 'doctors', component: DoctorsComponent },
        { path: 'food-recipes', component: FoodRecipesComponent },
        { path: 'online-shop', component: OnlineShopComponent },
        { path: 'patients', component: PatientsComponent },
        { path: 'payments', component: PaymentsComponent },
        { path: 'yoga-class', component: YogaClassesComponent },
        { path: 'yoga-poses', component: YogaPosesComponent },
        { path: 'inquiries', component: InquiriesComponent },
  ]},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
