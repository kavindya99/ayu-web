import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AyuService } from 'src/app/ayu.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  apiUrl = environment.backend_url;
  channels:any=[]
  p: number = 1; key:string=''; focus: any; focus2: any;
  getAppointmentForDelete: any;
  showAllData: any;
  constructor(private router:Router,private modalService: NgbModal,private service: AyuService,private http:HttpClient) { }

  ngOnInit(): void {
    this.getChannels();
  }

  getChannels(){
    this.http.get(this.apiUrl+'/channel/get-channels').subscribe(res=>{      
      this.channels = res;
      console.log(this.channels);
    })
  }

  del_res:any;

  deleteChannel(){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('accept', 'text/plain');
    
    this.http.get(this.apiUrl+'/channel/delete/'+this.getAppointmentForDelete
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
        this.SuccessMessage("Successfully removed the Channel");
      }
      else{
        console.log('failed');
        this.ErrorMessage("Channel Deletion failed");
      }
      this.modalService.dismissAll();
      this.getChannels();
    })
  }

  getAppointmentById(){
    this.http.get(this.apiUrl+'/channel/get-channels/'+this.getAppointmentForDelete,{observe: 'response'}).subscribe(res=>{
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
