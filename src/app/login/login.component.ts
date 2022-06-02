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
  response:any;

  constructor(private modalService: NgbModal,private formBuilder:FormBuilder,private service: AyuService, private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.init();
    //this.playSound();
    if (this.token) {
      if(this.type === '0') {
        //this.router.navigate(['/dashboard']);
        this.router.navigateByUrl("administration/dashboard"), { replaceUrl:true };
      }else {
        this.router.navigate(['']), { replaceUrl:true }; //
        this.ErrorMessage("User does not have permission to logged in.");
      }
    }
  }

  token = localStorage.getItem('token');
  type = localStorage.getItem('role');

  // playSound(){
  //   let audio = new Audio();
  //   audio.src = "../../assets/videoplayback.wav";
  //   audio.load();
  //   audio.play();
  // }

  forgotPassword(content1: any) {
    this.modalService.open(content1, { centered: true });
  }

  // public loginFunction():void{
  //   this.service.login(this.loginForm.value).subscribe(result=>{
  //     localStorage.setItem('token',result.token);
  //     console.log(result.role);
  //     console.log(result);
      
  //     if(result.role==0){
  //       this.router.navigate(['/dashboard']);
  //       this.SuccessMessage();
  //       console.log("logged in");
  //     }else{
  //       this.ErrorMessage("User does not have permission to logged in.");
  //     }
  //   },
  //   err=>{
  //     if(err.status == 400){        
  //       console.log("error");
  //       this.ErrorMessage("Incorrect username or password \nAuthentication failed");
  //       // this.toastr.error('Incorrect username or password','Authentication failed');
  //     }
  //     else{
  //       console.log(err);
  //       this.ErrorMessage(err);
  //     }
  //   });
  // }


  // * User Authentication - Login Function
  LoginAccount() {
    this.service.login(this.loginForm.value).subscribe(result=>{
          //localStorage.setItem('token',result.token);
          console.log(result.role);
          console.log(result);
          
          if(result.role==0){
            this.router.navigate(['administration/dashboard']);
            this.SuccessMessage();
            console.log("logged in");
          }else{
            this.ErrorMessage("User does not have permission to logged in.");
          }
        },
        err=>{
          if(err.status == 400){        
            console.log("error");
            this.ErrorMessage("Incorrect username or password \nAuthentication failed");
            // this.toastr.error('Incorrect username or password','Authentication failed');
          }
          else{
            console.log(err);
            this.ErrorMessage(err);
          }
        });
  }
  
  private init(): void{
    this.loginForm=this.formBuilder.group({
      email:[],
      password:[]
    });
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