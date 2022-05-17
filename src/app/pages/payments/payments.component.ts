import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AyuService } from 'src/app/ayu.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})

export class PaymentsComponent implements OnInit {

  constructor(private router:Router,private modalService: NgbModal,private service: AyuService,private http:HttpClient) { }

  ngOnInit(): void {
    this.getFees();
  }

  fees:any=[]
  apiUrl = environment.backend_url;

  getFees(){
    this.http.get(this.apiUrl+'/api/Fees').subscribe(res=>{
      console.log(res);
      this.fees = res;
    })
  }

  accountInfo(content: any) {
    this.modalService.open(content, { centered: true });
  }

  editItem1(content1: any) {
     this.modalService.open(content1, { centered: true , size: 'sm' },);
   }
   editItem2(content2: any) {
    this.modalService.open(content2, { centered: true ,size: 'sm'});
  }
  editItem3(content3: any) {
    this.modalService.open(content3, { centered: true , size: 'sm'});
  }

  cancelMessage(){
    Swal.fire({
      title: '<strong>Remove Medicine</strong>',
      iconHtml: '<i class="fas fa-thumbs-down text-danger bg-white"></i>',
      customClass: {
        icon: 'no-border'
      },
      html:
        'Do you want to Remove this Medicine from the Online Shop?',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonColor: '#D04848',
      confirmButtonText:
        'Remove',
      cancelButtonText:
        'Cancel',      
    })
  }

  SuccessEditMessage () {
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

  SuccessAddMessage () {
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
}
