import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AyuService } from '../ayu.service';

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.scss']
})
export class AddbookComponent implements OnInit {

  public bookForm!:FormGroup;
  constructor(private formBuilder:FormBuilder,private service: AyuService) { }

  ngOnInit(): void {
    this.init();
  }

  public saveBook():void{
    this.service.addBook(this.bookForm.value).subscribe(result=>{
      alert("new book added");
    })
  }
  
  private init(): void{
    this.bookForm=this.formBuilder.group({
      title:[],
      description:[]
    });
  }

}
