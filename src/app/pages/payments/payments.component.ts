import { HttpClient, HttpEvent, HttpEventType, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  updateFeeID: any;
  payment: any;
  p: number = 1; key:string=''; focus: any; focus2: any;

  constructor(private router:Router,private modalService: NgbModal,private service: AyuService,private http:HttpClient) { }

  ngOnInit(): void {
    this.getFees();
    this.updateMedFormValidations();
    this.getPayment();
  }

  fees:any=[]
  apiUrl = environment.backend_url;

  getFees(){
    this.http.get(this.apiUrl+'/api/Fees').subscribe(res=>{
      //console.log(res);
      this.fees = res;
    })
  }

  getPayment(){
    this.http.get(this.apiUrl+'/api/DoctorPayments/doctor-payment').subscribe(res=>{      
      this.payment = res;
      console.log(this.payment);
    })
  }

  feeForm = new FormGroup({});
  response:any = [];

  updateMedFormValidations() {

    this.feeForm = new FormGroup({ 
      'Fee': new FormControl(null)
    });
}

getFeeForEdit(){
  this.http.get(this.apiUrl+'/api/Fees/'+this.updateFeeID,{observe: 'response'}).subscribe(res=>{
    this.response = res;
    //console.log(this.response.status);
    //console.log(this.updateFeeID);
    //console.log(this.response.body);
      //console.log(this.selected_medicine_response.medicine);
      if(this.response.status==200){
        this.feeForm.patchValue({
          Fee:this.response.body.fee,
        })
        console.log(this.response.body.fee);
      } else{
        console.log(this.response.status);
      }       
  })
}

  updateFee(){
    //console.log(this.feeForm.value.Fee);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('accept', 'text/plain');
    
    const fd = new FormData();
    //console.log(this.updateFeeID);
    fd.append('Id',this.updateFeeID);
    fd.append('Fee',this.feeForm.value.Fee);
  this.http.post(this.apiUrl+'/api/Fees/fee-update',fd,{
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
      //console.log(event);
      this.SuccessMessage("Successfully updated the Fee");
    }
    this.modalService.dismissAll();
    this.getFees();    
  });
  //this.http.put(this.apiUrl+'/api/Medicines/'+this.updateMedicineID,fd,{ headers: headers }).subscribe(results =>console.log(results));
}

  accountInfo(content: any) {
    this.modalService.open(content, { centered: true });
  }

  editItem(content1: any,id:any) {
    this.updateFeeID=id;
     this.modalService.open(content1, { centered: true , size: 'sm' },);
   }

   openDelete(content6: any,id: any) {
    this.modalService.open(content6, { centered: true });
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
  
  SuccessMessage (text: any) {
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
