import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AyuService } from 'src/app/ayu.service';

@Component({
  selector: 'app-inquiries',
  templateUrl: './inquiries.component.html',
  styleUrls: ['./inquiries.component.scss']
})
export class InquiriesComponent implements OnInit {

  items$!:Observable<any[]>;
  constructor(private service: AyuService, /*private formBuilder: FormBuilder*/) { }

  ngOnInit(): void {
    // this.getAllBooks();
    // this.init();
    this.items$=this.service.getInquiries();
    console.log(this.items$);
  }

}
