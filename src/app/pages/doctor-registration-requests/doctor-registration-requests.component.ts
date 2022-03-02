import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-doctor-registration-requests',
  templateUrl: './doctor-registration-requests.component.html',
  styleUrls: ['./doctor-registration-requests.component.scss']
})
export class DoctorRegistrationRequestsComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  viewInfo(content: any) {
     this.modalService.open(content, { centered: true });
   }

  ngOnInit(): void {
  }
  simpleAlert(){
    Swal.fire('Hello world!');
  }
   
  alertWithSuccess(){
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
  }

  approveMessage(){
    Swal.fire({
      title: '<strong>Approve Doctor Registration</strong>',
      iconHtml: '<span class="fas fa-thumbs-up text-color bg-white"></span>',
      customClass: {
        icon: 'no-border'
      },
      html:
        'Do you want to Approve this doctor Registration?',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonColor: '#5F8D88',
      confirmButtonText:
        'Approve',
      confirmButtonAriaLabel: 'Thumbs up, great!',
      cancelButtonText:
        'Cancel',
      cancelButtonAriaLabel: 'Thumbs down',
      
    }),2000
  }

  cancelMessage(){
    Swal.fire({
      title: '<strong>Reject Doctor Registration</strong>',
      iconHtml: '<i class="fas fa-thumbs-down text-danger bg-white"></i>',
      customClass: {
        icon: 'no-border'
      },
      html:
        'Do you want to Reject this doctor Registration?',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonColor: '#D04848',
      confirmButtonText:
        'Reject',
      cancelButtonText:
        'Cancel',      
    })
  }
   
  confirmBox(){
    Swal.fire({
      title: 'Are you sure want to remove?',
      text: 'You will not be able to recover this file!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        Swal.fire(
          'Deleted!',
          'Your imaginary file has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your imaginary file is safe :)',
          'error'
        )
      }
    })
  }

}
