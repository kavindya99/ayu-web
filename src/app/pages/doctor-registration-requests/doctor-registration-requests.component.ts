import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getDoctor: any;
  medicines: any;
  updateMedicineID: any;
  response: any;
  updateMedicineForm: any;

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
      //console.log(res);
      this.serviceType=this.doctors[0].serviceType.split(',');
      //console.log(this.serviceType);
      //console.log(this.doctors[0].id);
    })
  }

  del_res:any;

  activateDoctor(){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('accept', 'text/plain');
    
    this.http.get(this.apiUrl+'/user/activate-doctor/'+this.getDoctor
    ,{
      headers: headers,
      reportProgress:true,
      observe:'events',
  
    }
    ).subscribe(res=>{
      console.log(res);
      this.del_res = res;
      //console.log(this.del_res.status);
      if (this.del_res.status == 200){
        //this.getMedicineById();
        //console.log("deleted")
      }
      else{
        //console.log('failed');
      }
      this.SuccessMessage ();
      this.modalService.dismissAll();
      this.getDoctors();
    })
  }

  openActivateDoctor(content6: any,id: any) {
    this.getDoctor = id;
    this.modalService.open(content6, { centered: true });
  }

  viewInfo(content: any) {
     this.modalService.open(content, { centered: true });
   }

   ErrorMessage (error: any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
    })
    
    Toast.fire({
      icon: 'error',
      title: error
    })
  }
  
  SuccessMessage () {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
    })
    
    Toast.fire({
      icon: 'success',
      title: "Activated Successfully"
    })
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

}
