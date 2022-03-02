import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AyuService } from '../ayu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!:FormGroup;
  Response: any;

  constructor(private formBuilder:FormBuilder,private service: AyuService, private router:Router,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.init();
  }

  public loginFunction():void{
    this.service.login(this.loginForm.value).subscribe(result=>{
      localStorage.setItem('token',result.token);
      console.log("logged in");
      this.router.navigate(['/dashboard']);
    },
    err=>{
      if(err.status == 400){
        this.toastr.error('Incorrect username or password','Authentication failed');
        console.log("error");
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

}
