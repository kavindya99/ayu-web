import { Component, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PatientsComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  personalInfo(content1: any) {
    this.modalService.open(content1, { centered: true });
  }

  cancelMessage(){
    Swal.fire({
      title: '<strong>Remove Patient</strong>',
      iconHtml: '<i class="fas fa-thumbs-down text-danger bg-white"></i>',
      
      html:
        'Do you want to Remove this patient?',
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonColor: '#D04848',
      confirmButtonText:
        'Remove',
      cancelButtonText:
        'Cancel',      
    }).then((result) => {
      if (result.isConfirmed) {
        this.SuccessMessage ();
      }
    });
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
