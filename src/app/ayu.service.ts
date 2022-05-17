import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import * as _ from 'lodash';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AyuService {


  public basePath = "https://triveda.azurewebsites.net";
  apiUrl = environment.backend_url;
  constructor(public http: HttpClient) { }

  getDropDownText(id:any, object:any){
    const selObj = _.filter(object, function (o) {
        return (_.includes(id,o.id));
    });
    return selObj;
  }
  public getBooks(): Observable<any>{
    return this.http.get<any>(this.apiUrl+'/books');
  }

  public addBook(book:any): Observable<any>{
    return this.http.post<any>(this.basePath+'/books',book);
  }

  public login(formData:any): Observable<any>{
    return this.http.post<any>(this.apiUrl+'/auth/login',formData);
  }

//   login(email:string, password:string ) {
//     return this.http.post<any>(this.basePath+'/account/login', {email, password});
//         // this is just the HTTP call, 
//         // we still need to handle the reception of the token
//         // .shareReplay();
// }

public getAllRecipes(): Observable<any>{
  return this.http.get<any>(this.basePath+'/api/FoodRecipes');
}

public addRecipe(recipe:any): Observable<any>{
  return this.http.post<any>(this.basePath+'/FoodRecipes',recipe);
}

public getInquiries(): Observable<any>{
  return this.http.get<any>(this.basePath+'/Inquiries');
}

public getOnlineConsultation(): Observable<any>{
  return this.http.get<any>(this.basePath+'/Channels');
}

}
