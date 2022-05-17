import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AyuService } from 'src/app/ayu.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  constructor(private router:Router,private modalService: NgbModal,private service: AyuService,private http:HttpClient) { }

  ngOnInit(): void {
    this.getPateints();
  }

  openDelete(content6: any,id: any) {
    this.getPatinetForDelete = id;
    this.modalService.open(content6, { centered: true });
  }

  patients:any=[]
  apiUrl = environment.backend_url;
  serviceType:any;
  p: number = 1; key:string=''; focus: any; focus2: any;

  getPateints(){
    this.http.get(this.apiUrl+'/user/patients').subscribe(res=>{      
      this.patients = res;
      console.log(res);
    })
  }

  personalInfo(content1: any) {
    this.modalService.open(content1, { centered: true });
  }

  //delete patient
  //
  //
  del_res:any;

  deletePatinet(){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('accept', 'text/plain');
    
    this.http.get(this.apiUrl+'/user/delete-patient/'+this.getPatinetForDelete
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
      this. getPateints();
    })
  }

  getPatinetForDelete:any;
  showAllData:any;
  getMedicineID:any;

  getPatineteById(){
    this.http.get(this.apiUrl+'/user/patients/'+this.getMedicineID,{observe: 'response'}).subscribe(res=>{
        console.warn(res);
        this.getPatinetForDelete = res;
        if (this.getPatinetForDelete.status === 0){
          console.log("Error!! Meeting Information Getting Failed!!");
        }
        else{
          this.showAllData = this.getPatinetForDelete.data;
  
        }
    })
  }

}
