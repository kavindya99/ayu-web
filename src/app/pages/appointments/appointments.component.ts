import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class AppointmentsComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  editInfo(content1: any) {
     this.modalService.open(content1, { centered: true });
   }

  cancelMessage(){
    Swal.fire({
      title: '<strong>Remove Appointment</strong>',
      iconHtml: '<i class="fas fa-thumbs-down text-danger bg-white"></i>',
      customClass: {
        icon: 'no-border'
      },
      html:
        'Do you want to Remove this Appointment?',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonColor: '#D04848',
      confirmButtonText:
        'Remove',
      cancelButtonText:
        'Cancel',      
    })
  }

  ErrorRemove () {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 5000,
      timerProgressBar: false,
    })
    
    Toast.fire({
      icon: 'error',
      title: "Remove Failed"
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
      title: "Removed Successfully"
    })
  }

}
