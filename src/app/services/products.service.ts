import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  ApiUrl = environment.ApiUrl;

  constructor(private httpClient:HttpClient,private router: Router) { }

  private handleError(error: HttpErrorResponse){
    return throwError(error.error.message);
  }

  saveProduct(product:any){
    return this.httpClient.post<any>(`${this.ApiUrl}save_product`,product,{ withCredentials: true })
    .pipe(catchError(this.handleError))
    .subscribe(x=>console.log(x))
  }
}
