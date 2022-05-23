import { HttpClient, HttpHeaders, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { result } from 'lodash';
import { AyuService } from 'src/app/ayu.service';
import { RecipeDetails } from 'src/app/recipe-details';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-online-shop',
  templateUrl: './online-shop.component.html',
  styleUrls: ['./online-shop.component.scss']
})
export class OnlineShopComponent implements OnInit {

 
  medicineForm = new FormGroup({});
  updateMedicineForm = new FormGroup({});

  medicines:any=[]
  p: number = 1; key:string=''; focus: any; focus2: any;
  updateMedicineID:any;
  

  recipe=new RecipeDetails();
  apiUrl = environment.backend_url;

  constructor(private router:Router,private modalService: NgbModal,private service: AyuService,private http:HttpClient) { }

  //add new medicine
  //
  //
  //

  medFormValidations () {

    this.medicineForm = new FormGroup({ 
      'Medicine': new FormControl(null),
      'Category': new FormControl(null),
      'Unit': new FormControl(null),
      'PricePerUnit': new FormControl(null),
      'Quantity': new FormControl(null)
    });
  }

  addMedicine(){

    console.log(this.medicineForm.value);

    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    
    const fd = new FormData();
    fd.append('Medicine',this.medicineForm.value.Medicine);
    fd.append('Category',this.medicineForm.value.Category);
    fd.append('Unit',this.medicineForm.value.Unit);
    fd.append('PricePerUnit',this.medicineForm.value.PricePerUnit);
    fd.append('Quantity',this.medicineForm.value.Quantity);

    this.http.post(this.apiUrl+'/api/Medicines',fd,{
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
      this.SuccessMessage("Medicine Added Successfully");
      this.modalService.dismissAll();
      this.getMedicine();
    })
  }

  //edit medicine functions
  //
  //
  //  
  response:any = [];

  updateMedFormValidations() {

    this.updateMedicineForm = new FormGroup({ 
      'Medicine': new FormControl(null),
      'Category': new FormControl(null),
      'Unit': new FormControl(null),
      'PricePerUnit': new FormControl(null),
      'Quantity': new FormControl(null)
    });
}

  getMedcineForEdit(){
    this.http.get(this.apiUrl+'/api/Medicines/getMediById/'+this.updateMedicineID,{observe: 'response'}).subscribe(res=>{
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

  updateMedicine(){
    console.log(this.updateMedicineForm.value.Medicine);
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('accept', 'text/plain');
    
    const fd = new FormData();
    console.log(this.updateMedicineID);
    fd.append('Id',this.updateMedicineID);
    fd.append('Medicine',this.updateMedicineForm.value.Medicine);
    fd.append('Category',this.updateMedicineForm.value.Category);
    fd.append('Unit',this.updateMedicineForm.value.Unit);
    fd.append('PricePerUnit',this.updateMedicineForm.value.PricePerUnit);
    fd.append('Quantity',this.updateMedicineForm.value.Quantity);
  this.http.post(this.apiUrl+'/api/Medicines/medi',fd,{
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
    this.getMedicine();    
  });
  //this.http.put(this.apiUrl+'/api/Medicines/'+this.updateMedicineID,fd,{ headers: headers }).subscribe(results =>console.log(results));
}


  //display all medicines
  //
  //
  //
  getMedicine(){
    this.http.get(this.apiUrl+'/api/Medicines').subscribe(res=>{
      //console.log(res);
      this.medicines = res;
    })
  }

  //delete medicine
  //
  //
  //
  
  del_res:any;

  deleteMedicine(){
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('accept', 'text/plain');
    
    this.http.get(this.apiUrl+'/api/Medicines/delete/'+this.getMedicineForDelete
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
        this.SuccessMessage("Successfully deleted the Medicine");
      }
      else{
        console.log('failed');
        this.ErrorMessage("Medicine Deletion failed")
      }
      this.modalService.dismissAll();
      this.getMedicine();
    })
  }

  getMedicineForDelete:any;
  showAllData:any;
  getMedicineID:any;

  getMedicineById(){
    this.http.get(this.apiUrl+'/api/Medicines/getMediById/'+this.getMedicineID,{observe: 'response'}).subscribe(res=>{
        console.warn(res);
        this.getMedicineForDelete = res;
        if (this.getMedicineForDelete.status === 0){
          console.log("Error!! ");
        }
        else{
          this.showAllData = this.getMedicineForDelete.data;
  
        }
    })
  }

  ngOnInit(): void {
    this.medFormValidations();
    this.getMedicine();
    this.updateMedFormValidations();
    //this.getMedcineForEdit();
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
  

  


  editItem(content1: any,id:any) {
     this.updateMedicineID=id;
     this.modalService.open(content1, { centered: true });
     this.getMedcineForEdit();
   }

   addItem(content2: any) {
    this.modalService.open(content2, { centered: true });
  }

  openDelete(content6: any,id: any) {
    this.getMedicineForDelete = id;
    this.modalService.open(content6, { centered: true });
  }

  cancelMessage(id:any){
    //this.getMedicineById=id;
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
