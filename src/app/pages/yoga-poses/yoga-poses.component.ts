import { HttpClient } from '@angular/common/http';
import { Component, OnInit, VERSION } from '@angular/core';
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
  public stepcount:number=0;
  public count:number=0;
  public steps:any;
  public i: any;
  public pose: any;
  searchFilter: string ="";
  p: number = 1; key:string=''; focus: any; focus2: any;

  constructor(private router:Router,private modalService: NgbModal,private http:HttpClient) { }

  getPoses(){
    this.http.get(this.apiUrl+'/api/YogaPoses').subscribe(result=>{
      console.log(result);
      this.poses = result;
      // for(let i of this.poses ){
      //   this.pose=this.poses[i]
      //   console.log(this.pose);
      // }
      // this.steps=this.poses[0].steps.split(',')[0];
      // console.log(this.steps);
      // this.stepcount=this.steps.count;
      // console.log(this.stepcount);

      this.steps=this.poses[0].steps.split(',');
      this.stepcount=this.poses.count;
      // console.log(result);
      this.count=this.poses[0].steps.split(',').count;
    })
  }

  ngOnInit(): void {
    this.getPoses();
  }

  editInfo(content1: any) {
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
      title: "Editted Successfully"
    })
  }

  ErrorAdd () {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
    })
    
    Toast.fire({
      icon: 'error',
      title: "Adding Failed"
    })
  }

  SuccessAdd () {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
    })
    
    Toast.fire({
      icon: 'success',
      title: "Added Successfully"
    })
  }

  cancelMessage(){
    Swal.fire({
      title: '<strong>Remove Pose</strong>',
      iconHtml: '<i class="fas fa-thumbs-down text-danger bg-white"></i>',
      
      html:
        'Do you want to Remove this pose?',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonColor: '#D04848',
      confirmButtonText:
        'Remove',
      cancelButtonText:
        'Cancel',      
    })
  }



  add(){
    let row = document.createElement('div');  
      row.className = 'row';
      row.innerHTML = `
      <br>
      <div class="pb-4">
      <input type="text" class="inputs text-color form-control" id="steps" placeholder="Steps">
      </div>`;
      document.querySelector('#AddField')?.appendChild(row);
  }
}
