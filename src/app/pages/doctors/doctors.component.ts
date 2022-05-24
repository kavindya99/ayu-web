import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  public checkboxGroupForm: FormGroup;

  getMedicineForDelete: any;
  medicines: any;
  updateMedicineID: any;
  response: any;
  updateDoctorForm: any;
  getPatientForDelete: any;
  showAllData: any;

  constructor(formBuilder: FormBuilder,private router:Router,private modalService: NgbModal,private service: AyuService,private http:HttpClient) { 
    this.checkboxGroupForm = formBuilder.group({
      left: true,
      middle: false,
      right: false
    });
  }

  ngOnInit(): void {
    this.getDoctors();
    this.updateDoctorFormValidations();
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

  updateDoctorFormValidations() {

    this.updateDoctorForm = new FormGroup({ 
      'DoctorId': new FormControl(null),
      'Position': new FormControl(null),
      'Hospital': new FormControl(null),
      'AvailableTimeFrom': new FormControl(null),
      'AvailableTimeTo': new FormControl(null),
      'Channel': new FormControl(null),
      'OnlineConsulting': new FormControl(null),
      'OnlineYogaClass': new FormControl(null)
    });
}

  getDoctorForEdit(){
    this.http.get(this.apiUrl+'/user/doctors/'+this.updateFoodID,{observe: 'response'}).subscribe(res=>{
      this.response = res;
      console.log(this.response.status);
      console.log(this.updateFoodID);
      console.log(this.response.body);
        //console.log(this.selected_medicine_response.medicine);
        if(this.response.status==200){
          this.updateDoctorForm.patchValue({
            DoctorId:this.response.body.medicalCouncilRegID,
            Position:this.response.body.specialization,
            Hospital:this.response.body.hospital,
            AvailableTimeFrom:this.response.body.availableTimeFrom,
            AvailableTimeTo:this.response.body.availableTimeTo,
            Channel:this.response.body.serviceType,
            OnlineConsulting:this.response.body.serviceType,
            OnlineYogaClass:this.response.body.serviceType,
          })
        } else{
          console.log(this.response.status);
        }       
    })
  }
  updateFoodID:any;

  updateDoctor(){
    console.log(this.updateDoctorForm.value.Medicine);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('accept', 'text/plain');
    
    const fd = new FormData();
    console.log(this.updateFoodID);
    fd.append('DoctorId',this.updateFoodID);
    fd.append('Position',this.updateDoctorForm.value.Name);
    fd.append('Hospital',this.updateDoctorForm.value.Category);
    fd.append('AvailableTimeFrom',this.updateDoctorForm.value.Ingredients);
    fd.append('AvailableTimeTo',this.updateDoctorForm.value.Steps);
    fd.append('Channel',this.updateDoctorForm.value.Category);
    fd.append('OnlineConsulting',this.updateDoctorForm.value.Ingredients);
    fd.append('OnlineYogaClass',this.updateDoctorForm.value.Steps);
  this.http.post(this.apiUrl+'/user/update-doctor'+this.updateFoodID,fd,{
    headers: headers,
    reportProgress:true,
    observe:'events',

  }).subscribe((event:HttpEvent<any>) =>{
    switch (event.type){
      case HttpEventType.Sent:
        console.log('Request has been made!');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Response header has been received!');
        break;
      case HttpEventType.UploadProgress:
      break;
      case HttpEventType.Response:
      console.log(event);
      this.SuccessMessage("Successfully updated the doctor");
    }
    this.modalService.dismissAll();
    this.getDoctors();    
  });
  //this.http.put(this.apiUrl+'/api/Medicines/'+this.updateMedicineID,fd,{ headers: headers }).subscribe(results =>console.log(results));
}

  del_res:any;

  deleteDoctor(){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('accept', 'text/plain');
    
    this.http.get(this.apiUrl+'/user/delete-patient/'+this.getPatientForDelete
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
        this.SuccessMessage("Successfully removed the Doctor");
      }
      else{
        console.log('failed');
        this.ErrorMessage("Doctor Deletion failed");
      }
      this.modalService.dismissAll();
      this.getDoctors();
    })
  }

  getMedicineById(){
    this.http.get(this.apiUrl+'/user/doctors/'+this.getPatientForDelete,{observe: 'response'}).subscribe(res=>{
        console.warn(res);
        this.getPatientForDelete = res;
        if (this.getPatientForDelete.status === 0){
          console.log("Error!! ");
        }
        else{
          this.showAllData = this.getPatientForDelete.data;
  
        }
    })
  }

  

  openDelete(content6: any,id: any) {
    this.getPatientForDelete = id;
    this.modalService.open(content6, { centered: true });
  }

  editInfo(content3: any,id:any) {
    this.updateFoodID = id;
     this.modalService.open(content3, { centered: true });
   }

   personalInfo(content1: any) {
    this.modalService.open(content1, { centered: true });
  }

   professionalInfo(content2: any) {
    this.modalService.open(content2, { centered: true });
  }

  ErrorMessage (text:any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
    })
    
    Toast.fire({
      icon: 'error',
      title: text
    })
  }

  SuccessMessage (text:any) {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
    })
    
    Toast.fire({
      icon: 'success',
      title: text
    })
  }

}
