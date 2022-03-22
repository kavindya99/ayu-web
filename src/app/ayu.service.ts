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

//   login(email:string, password:string ) {
//     return this.http.post<any>(this.basePath+'/account/login', {email, password});
//         // this is just the HTTP call, 
//         // we still need to handle the reception of the token
//         // .shareReplay();
// }

public getRecipes(): Observable<any>{
  return this.http.get<any>(this.basePath+'/FoodRecipes');
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
