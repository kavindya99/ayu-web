import { HttpClient } from '@angular/common/http';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AyuService {


  public basePath = "https://triveda.azurewebsites.net";
  apiUrl = environment.backend_url;
  constructor(public http: HttpClient) { }

  public login(formData:any): Observable<any>{
    return this.http.post<any>(this.apiUrl+'/auth/login',formData).pipe(
      tap((result) => this.save_data(result)),
    );  
    
  }

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

  private save_data(data:any){
    localStorage.setItem('token'    , data.token);
    localStorage.setItem('id'       , data.id);
    localStorage.setItem('name'   , data.name);
    localStorage.setItem('role' , data.role);
    

    localStorage.setItem('username'     , data.username);
    localStorage.setItem('expiration' , data.expiration);
    return;
  }

  private retrieve_token(): string | null {
    return localStorage.getItem('token');
  }

    // TODO : LOGGED IN FUNCTION
    IsLoggedIn(): boolean {
      if (this.retrieve_token() != null) { return true; }
      return false;
    }

     // TODO : REMOVE BEARER TOKEN
  private remove_token(response:any): void {
    localStorage.removeItem('token');
    return;
}

// TODO : FIND USER ROLE FUNCTION
retrieve_role(): string | null {
  return localStorage.getItem('role');
}

}
