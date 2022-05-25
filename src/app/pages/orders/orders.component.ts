import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AyuService } from 'src/app/ayu.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  model: any;
  apiUrl = environment.backend_url;
  orders: any;
  orderDetails: any;
  p: number = 1; key:string=''; focus: any; focus2: any;

  constructor(private router:Router,private modalService: NgbModal,private service: AyuService,private http:HttpClient) { }

  getOrders(){
    this.http.get(this.apiUrl+'/api/Order/orders').subscribe(res=>{      
      this.orders = res;
      console.log(this.orders);
      this.orderDetails=this.orders.itemDetails;
    })
  }

  ngOnInit(): void {
    this.getOrders();
  }

  editItem(content1: any) {
     this.modalService.open(content1, { size: 'lg', centered: true });
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
