import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AyuService {

  readonly basePath = "https://localhost:44315/api";
  constructor(public http: HttpClient) { }

  public getBooks(): Observable<any>{
    return this.http.get<any>(this.basePath+'/books');
  }

  public addBook(book:any): Observable<any>{
    return this.http.post<any>(this.basePath+'/books',book);
  }

  public login(formData:any): Observable<any>{
    return this.http.post<any>(this.basePath+'/account/login',formData);
  }

}
