import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AyuService } from 'src/app/ayu.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {

  apiUrl = environment.backend_url;
  appointments:any=[]
  p: number = 1; key:string=''; focus: any; focus2: any;
  getAppointmentForDelete: any;
  showAllData: any;
  constructor(private router:Router,private modalService: NgbModal,private service: AyuService,private http:HttpClient) { }

  ngOnInit(): void {
    this.getAppointments();
  }

  getAppointments(){
    this.http.get(this.apiUrl+'/appointment/get-appointments').subscribe(res=>{      
      this.appointments = res;
      console.log(this.appointments);
      //console.log(this.serviceType);
      //console.log(this.doctors[0].id);
    })
  }

  del_res:any;

  deleteAppointment(){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('accept', 'text/plain');
    
    this.http.get(this.apiUrl+'/appointment/delete/'+this.getAppointmentForDelete
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
        this.SuccessMessage("Successfully removed the Appointment");
      }
      else{
        console.log('failed');
        this.ErrorMessage("Appointment Deletion failed");
      }
      this.modalService.dismissAll();
      this.getAppointments();
    })
  }

  getAppointmentById(){
    this.http.get(this.apiUrl+'/appointment/get-appointments-by-id/'+this.getAppointmentForDelete,{observe: 'response'}).subscribe(res=>{
        console.warn(res);
        this.getAppointmentForDelete = res;
        if (this.getAppointmentForDelete.status === 0){
          console.log("Error!! ");
        }
        else{
          this.showAllData = this.getAppointmentForDelete.data;
  
        }
    })
  }

  openDelete(content6: any,id: any) {
    this.getAppointmentForDelete = id;
    this.modalService.open(content6, { centered: true });
  }


  editInfo(content1: any,id:any) {
     this.modalService.open(content1, { centered: true });
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
