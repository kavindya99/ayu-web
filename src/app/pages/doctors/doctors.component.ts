import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AyuService } from 'src/app/ayu.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent implements OnInit {
  getMedicineForDelete: any;
  medicines: any;
  updateMedicineID: any;
  response: any;
  updateMedicineForm: any;

  constructor(private router:Router,private modalService: NgbModal,private service: AyuService,private http:HttpClient) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  doctors:any=[]
  apiUrl = environment.backend_url;
  serviceType:any;
  p: number = 1; key:string=''; focus: any; focus2: any;
  serviceBy:any=[];
  length:any;
  oneByOne:any;



  getDoctors(){
    this.http.get(this.apiUrl+'/user/doctors').subscribe(res=>{      
      this.doctors = res;
      console.log(this.doctors);

      console.warn(this.doctors);


      //console.warn(this.serviceBy);
      this.serviceType=this.doctors[0].serviceType.split(',');
      //this.length=this.doctors[0].serviceType.split(',').length;
      // for(var l of this.length){
      //   this.oneByOne=this.serviceType[l];
      // }
      //console.log(this.oneByOne);
    })
  }

  del_res:any;

  activateDoctor(){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('accept', 'text/plain');
    
    this.http.get(this.apiUrl+'/user/doctors/'+this.getMedicineForDelete
    ,{
      headers: headers,
      reportProgress:true,
      observe:'events',
  
    }
    ).subscribe(res=>{
      console.log(res);
      this.del_res = res;
      console.log(this.del_res.status);
      if (this.del_res.status == 200){
        //this.getMedicineById();
        console.log("deleted")
      }
      else{
        console.log('failed');
      }
      this.modalService.dismissAll();
      this.getDoctors();
    })
  }

  getDoctorForActivate(){
    this.http.get(this.apiUrl+'/user/activate-doctor/'+this.updateMedicineID,{observe: 'response'}).subscribe(res=>{
      this.response = res;
      console.log(this.response.status);
      console.log(this.updateMedicineID);
      console.log(this.response.body);
        //console.log(this.selected_medicine_response.medicine);
        if(this.response.status==200){
          this.updateMedicineForm.patchValue({
            Medicine:this.response.body.medicine,
            Category:this.response.body.category,
            Unit:this.response.body.unit,
            PricePerUnit:this.response.body.pricePerUnit,
            Quantity:this.response.body.quantity,
          })
        } else{
          console.log(this.response.status);
        }       
    })
  }

  openDelete(content6: any,id: any) {
    this.getMedicineForDelete = id;
    this.modalService.open(content6, { centered: true });
  }

  editInfo(content3: any) {
     this.modalService.open(content3, { centered: true });
   }

   personalInfo(content1: any) {
    this.modalService.open(content1, { centered: true });
  }

   professionalInfo(content2: any) {
    this.modalService.open(content2, { centered: true });
  }

  ErrorMessage () {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
    })
    
    Toast.fire({
      icon: 'error',
      title: "Edit Failed"
    })
  }
  
  ErrorRemove () {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
    })
    
    Toast.fire({
      icon: 'error',
      title: "Remove Failed"
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
      title: "Removed Successfully"
    })
  }

  SuccessEdit () {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
    })
    
    Toast.fire({
      icon: 'success',
      title: "Editted Successfully"
    })
  }

  cancelMessage(){
    Swal.fire({
      title: '<strong>Remove Doctor</strong>',
      iconHtml: '<i class="fas fa-thumbs-down text-danger bg-white"></i>',
      
      html:
        'Do you want to Remove this doctor?',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonColor: '#D04848',
      confirmButtonText:
        'Remove',
      cancelButtonText:
        'Cancel',      
    }).then((result) => {
      if (result.isConfirmed) {
        this.SuccessMessage ();
      }
    });
  }

}
