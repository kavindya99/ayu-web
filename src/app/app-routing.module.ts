import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { ChannelsComponent } from './pages/channels/channels.component';
import { DoctorRegistrationRequestsComponent } from './pages/doctor-registration-requests/doctor-registration-requests.component';
import { DoctorsComponent } from './pages/doctors/doctors.component';
import { FoodRecipesComponent } from './pages/food-recipes/food-recipes.component';
import { LoginComponent } from './login/login.component';
import { OnlineShopComponent } from './pages/online-shop/online-shop.component';
import { PatientsComponent } from './pages/patients/patients.component';
import { PaymentsComponent } from './pages/payments/payments.component';
import { YogaClassesComponent } from './pages/yoga-classes/yoga-classes.component';
import { YogaPosesComponent } from './pages/yoga-poses/yoga-poses.component';
import { BooksComponent } from './books/books.component';
import { AddbookComponent } from './addbook/addbook.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: LoginComponent },
      { path: 'books', component: BooksComponent ,/*canActivate:['AuthGuard']*/},
      { path: 'addbook', component: AddbookComponent },
    ],
  },

  {
    path: '',
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then(
        (m) => m.DashboardModule,
      ),/*canActivate:['AuthGuard'],*/
  },

  { path: '**', redirectTo: '', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
