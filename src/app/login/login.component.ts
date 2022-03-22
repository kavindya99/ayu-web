import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { AyuService } from '../ayu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!:FormGroup;
  Response: any;

  constructor(private modalService: NgbModal,private formBuilder:FormBuilder,private service: AyuService, private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.init();
  }

  forgotPassword(content1: any) {
    this.modalService.open(content1, { centered: true });
  }

  public loginFunction():void{
    this.service.login(this.loginForm.value).subscribe(result=>{
      localStorage.setItem('token',result.token);
      console.log("logged in");
      this.router.navigate(['/dashboard']);
      this.SuccessMessage();
      // this.toastr.success('Successfully Logged In');
    },
    err=>{
      if(err.status == 400){        
        console.log("error");
        this.ErrorMessage();
        // this.toastr.error('Incorrect username or password','Authentication failed');
      }
      else{
        console.log(err);
      }
    });
  }
  
  private init(): void{
    this.loginForm=this.formBuilder.group({
      email:[],
      password:[]
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
      title: "Login Failed"
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
      title: "Logged in Successfully"
    })
  }

}