import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AyuService } from '../ayu.service';
import { Location } from '@angular/common'

@Injectable({
  providedIn: 'root'
})
export class RolesGuard implements CanLoad {
  constructor(private auth: AyuService, private location: Location) {}

  // ******************************* Check User Has Right Role Permission To Access The Route *******************************

  canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    console.log(route.data?.['role']);
    if(route.data?.['role'] != this.auth.retrieve_role()) { this.location.back(); return false; }
    return true;
  }
  
}
