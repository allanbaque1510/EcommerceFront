import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Product } from '../interfaces/product';
@Injectable({
  providedIn: 'root'
})

export class ProductsService {
  ApiUrl = environment.ApiUrl;

  constructor(private httpClient:HttpClient,private router: Router) { }

  private handleError(error: HttpErrorResponse){
    return throwError(error.error.message);
  }
  getProducts(): Observable<Product[]> {
    return this.httpClient.get<response>(`${this.ApiUrl}get_products`, { withCredentials: true })
      .pipe(
        catchError(this.handleError),
        map((response: response) => response.data) // Extraemos la data
      );
  }
  saveProduct(product:any){
    return this.httpClient.post<any>(`${this.ApiUrl}save_product`,product,{ withCredentials: true })
    .pipe(catchError(this.handleError))
  }
}
interface response{
  ok:boolean,
  data:Product[]
}