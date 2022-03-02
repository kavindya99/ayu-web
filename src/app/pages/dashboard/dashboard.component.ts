import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Event as NavigationEvent } from "@angular/router";
import { environment } from 'src/environments/environment';
import * as $ from 'jquery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  title: string | undefined;

  constructor( private router: Router) { 

    // TODO : Get the Current Router & Change the Title
    this.router.events.subscribe(( event: NavigationEvent ) : void => {
      this.router = router;
      if ( event instanceof NavigationEnd ) {
        if (this.router.isActive("dashboard", true )) {
          this.title = "admin dashboard"
        }
        if (this.router.isActive("dashboard/doctors", true )) {
          this.title = "doctors"
        }
        if (this.router.isActive("dashboard/patients", true )) {
          this.title = "patients"
        }
        if (this.router.isActive("dashboard/channels", true )) {
          this.title = "channels"
        }

        if (this.router.isActive("dashboard/appointments", true )) {
          this.title = "appointments"
        }
        if (this.router.isActive("dashboard/yoga-poses", true )) {
          this.title = "yoga poses"
        }
        if (this.router.isActive("dashboard/yoga-class", true )) {
          this.title = "yoga classes"
        }
        if (this.router.isActive("dashboard/food-recipes", true )) {
          this.title = "food recipes"
        }
        if (this.router.isActive("dashboard/doctor-registration", true )) {
          this.title = "doctor registrations"
        }
        if (this.router.isActive("dashboard/payments", true )) {
          this.title = "Payments"
        }
        if (this.router.isActive("dashboard/online-shop", true )) {
          this.title = "online shop"
        }
        if (this.router.isActive("dashboard/inquiries", true )) {
          this.title = "inquiries"
        }
      }
    });
  }

  iconChange="fas fa-chevron-circle-left";

  ngOnInit() {
    //Toggle Click Function
    $('#menu-toggle1').hide;
    $('#menu-toggle').click(function (e) {
      e.preventDefault();    
      $('#menu-toggle1').show;  
      $('#wrapper').toggleClass('toggled');
    });
    $('#menu-toggle1').click(function (e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
  }

  onLogout(){
    localStorage.removeItem('token');
    this.router.navigate(['']);
  }

}
