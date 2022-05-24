import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AyuService } from 'src/app/ayu.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-yoga-classes',
  templateUrl: './yoga-classes.component.html',
  styleUrls: ['./yoga-classes.component.scss']
})
export class YogaClassesComponent implements OnInit {
  yogas: any;
  apiUrl = environment.backend_url;
  p: number = 1; key:string=''; focus: any; focus2: any;
  getChannelForDelete: any;
  showAllData: any;

  constructor(private router:Router,private modalService: NgbModal,private service: AyuService,private http:HttpClient) { }

  ngOnInit(): void {
    this.getChannels();
  }

  getChannels(){
    this.http.get(this.apiUrl+'/yoga-class/get-yoga-classes').subscribe(res=>{      
      this.yogas = res;
      console.log(this.yogas);
    })
  }

  del_res:any;

  deleteYogaClass(){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('accept', 'text/plain');
    
    this.http.get(this.apiUrl+'/yoga-class/delete/'+this.getChannelForDelete
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
    this.http.get(this.apiUrl+'/yoga-class/get-yoga-classes/'+this.getChannelForDelete,{observe: 'response'}).subscribe(res=>{
        console.warn(res);
        this.getChannelForDelete = res;
        if (this.getChannelForDelete.status === 0){
          console.log("Error!! ");
        }
        else{
          this.showAllData = this.getChannelForDelete.data;
  
        }
    })
  }

  openDelete(content6: any,id: any) {
    this.getChannelForDelete = id;
    this.modalService.open(content6, { centered: true });
  }

  editInfo(content1: any) {
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
