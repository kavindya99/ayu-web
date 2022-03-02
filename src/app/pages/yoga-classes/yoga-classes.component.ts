import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-yoga-classes',
  templateUrl: './yoga-classes.component.html',
  styleUrls: ['./yoga-classes.component.scss']
})
export class YogaClassesComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  editInfo(content1: any) {
     this.modalService.open(content1, { centered: true });
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

  SuccessEdit () {
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

  cancelMessage(){
    Swal.fire({
      title: '<strong>Remove Doctor</strong>',
      iconHtml: '<i class="fas fa-thumbs-down text-danger bg-white"></i>',
      
      html:
        'Do you want to Remove this doctor?',
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

}
