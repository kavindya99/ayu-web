import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AyuService } from '../ayu.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {

  items$!:Observable<any[]>;
  constructor(private service: AyuService, /*private formBuilder: FormBuilder*/) { }

  ngOnInit(): void {
    // this.getAllBooks();
    // this.init();
    this.items$=this.service.getBooks();
    console.log(this.items$);
  }

}
