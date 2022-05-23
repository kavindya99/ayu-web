import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, VERSION } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-yoga-poses',
  templateUrl: './yoga-poses.component.html',
  styleUrls: ['./yoga-poses.component.scss']
})
export class YogaPosesComponent implements OnInit {
  
  apiUrl = environment.backend_url;
  poses:any=[]
  searchFilter: string ="";
  p: number = 1; key:string=''; focus: any; focus2: any;
  getPoseForDelete: any;
  getPoseForEdit: any;
  yogaPoseForm=new FormGroup({});
  editYogaPoseForm=new FormGroup({});
  showAllData: any;

  constructor(private router:Router,private modalService: NgbModal,private http:HttpClient) { }

  getPoses(){
    this.http.get(this.apiUrl+'/api/YogaPoses').subscribe(result=>{
      console.log(result);
      this.poses = result;
    })
  }

  yogaFormValidations() {

    this.yogaPoseForm = new FormGroup({ 
      'Name': new FormControl(null),
      'Category': new FormControl(null),
      'Steps': new FormControl(null)
    });
  }

  addYoga(){

    console.log(this.yogaPoseForm.value);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    const fd = new FormData();
    fd.append('Name',this.yogaPoseForm.value.Name);
    fd.append('Category',this.yogaPoseForm.value.Category);
    // fd.append('Description',this.yogaPoseForm.value.Ingredients);
    fd.append('Steps',this.yogaPoseForm.value.Steps);

    this.http.post(this.apiUrl+'/api/YogaPoses',fd,{
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
      }
      this.SuccessMessage("Yoga Pose Added Successfully");
      this.modalService.dismissAll();
      this.getPoses();
    })
  }

  response:any = [];

  updateYogaFormValidations(){

    this.editYogaPoseForm = new FormGroup({ 
      'Name': new FormControl(null),
      'Category': new FormControl(null),
      'Steps': new FormControl(null)
    });
}

  getMedcineForEdit(){
    this.http.get(this.apiUrl+'/api/YogaPoses/'+this.getPoseForEdit,{observe: 'response'}).subscribe(res=>{
      this.response = res;
      console.log(this.response.status);
      console.log(this.getPoseForEdit);
      console.log(this.response.body);
        if(this.response.status==200){
          this.editYogaPoseForm.patchValue({
            Name:this.response.body.name,
            Category:this.response.body.category,
            Steps:this.response.body.steps,
          })
        } else{
          console.log(this.response.body.steps);
        }       
    })
  }

  editYoga(){
    console.log(this.editYogaPoseForm.value.Medicine);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('accept', 'text/plain');
    
    const fd = new FormData();
    console.log(this.getPoseForEdit);
    fd.append('Id',this.getPoseForEdit);
    fd.append('Name',this.editYogaPoseForm.value.Name);
    fd.append('Category',this.editYogaPoseForm.value.Category);
    fd.append('Steps',this.editYogaPoseForm.value.Steps);
  this.http.post(this.apiUrl+'/api/YogaPoses/update-yoga',fd,{
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
      this.SuccessMessage("Successfully updated the medicine");
    }
    this.modalService.dismissAll();
    this.getPoses();    
  });
  //this.http.put(this.apiUrl+'/api/Medicines/'+this.updateMedicineID,fd,{ headers: headers }).subscribe(results =>console.log(results));
}


del_res:any;

deleteYoga(){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('accept', 'text/plain');
    
    this.http.get(this.apiUrl+'/api/YogaPoses/delete/'+this.getPoseForDelete
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
        this.SuccessMessage("Successfully removed the Yoga Pose");
      }
      else{
        console.log('failed');
        this.ErrorMessage("Pose Deletion failed");
      }
      this.modalService.dismissAll();
      this.getPoses();
    })
  }

  getMedicineById(){
    this.http.get(this.apiUrl+'/api/YogaPoses/'+this.getPoseForDelete,{observe: 'response'}).subscribe(res=>{
        console.warn(res);
        this.getPoseForDelete = res;
        if (this.getPoseForDelete.status === 0){
          console.log("Error!! ");
        }
        else{
          this.showAllData = this.getPoseForDelete.data;
  
        }
    })
  }

  ngOnInit(): void {
    this.yogaFormValidations();
    this.updateYogaFormValidations();
    this.getPoses();
  }

  editInfo(content1: any,id:any) {
    this.getPoseForEdit=id;
     this.modalService.open(content1, { centered: true });
   }

   openDelete(content1: any,id:any) {
    this.getPoseForDelete=id;
    this.modalService.open(content1, { centered: true });
  }

   addInfo(content2: any) {
    this.modalService.open(content2, { centered: true });
  }

  viewSteps(content4: any) {
    this.modalService.open(content4, { centered: true });
  }

  viewImage(content3: any) {
   this.modalService.open(content3, { centered: true });
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
