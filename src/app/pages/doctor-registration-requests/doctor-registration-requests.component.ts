import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AyuService } from 'src/app/ayu.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-registration-requests',
  templateUrl: './doctor-registration-requests.component.html',
  styleUrls: ['./doctor-registration-requests.component.scss']
})
export class DoctorRegistrationRequestsComponent implements OnInit {

  constructor(private router:Router,private modalService: NgbModal,private service: AyuService,private http:HttpClient) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  public services:any;
  doctors:any=[]
  apiUrl = environment.backend_url;
  serviceType:any;
  p: number = 1; key:string=''; focus: any; focus2: any;

  getDoctors(){
    this.http.get(this.apiUrl+'/user/doctor-registrations').subscribe(res=>{      
      this.doctors = res;
      console.log(res);
      this.serviceType=this.doctors[0].serviceType.split(',');
      console.log(this.serviceType);
    })
  }

  viewInfo(content: any) {
     this.modalService.open(content, { centered: true });
   }
   
  simpleAlert(){
    Swal.fire('Hello world!');
  }
   
  alertWithSuccess(){
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
  }

  approveMessage(){
    Swal.fire({
      title: '<strong>Approve Doctor Registration</strong>',
      iconHtml: '<span class="fas fa-thumbs-up text-color bg-white"></span>',
      customClass: {
        icon: 'no-border'
      },
      html:
        'Do you want to Approve this doctor Registration?',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonColor: '#5F8D88',
      confirmButtonText:
        'Approve',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        'Cancel',
      cancelButtonAriaLabel: 'Thumbs down',
      
    }),2000
  }

  cancelMessage(){
    Swal.fire({
      title: '<strong>Reject Doctor Registration</strong>',
      iconHtml: '<i class="fas fa-thumbs-down text-danger bg-white"></i>',
      customClass: {
        icon: 'no-border'
      },
      html:
        'Do you want to Reject this doctor Registration?',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonColor: '#D04848',
      confirmButtonText:
        'Reject',
      cancelButtonText:
        'Cancel',      
    })
  }
   
  confirmBox(){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

}
