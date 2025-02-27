import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  ApiUrl = environment.ApiUrl;

  constructor(private httpClient:HttpClient,private router: Router) { }

  private handleError(error: HttpErrorResponse){
    return throwError(error.error.message);
  }

  create(product:any){
    return this.httpClient.post<any>(`${this.ApiUrl}inventario/create`,product,{ withCredentials: true })
    .pipe(catchError(this.handleError))
  }
  getProducts(){
    return this.httpClient.get<any>(`${this.ApiUrl}inventario/get`,{ withCredentials: true }).pipe(catchError(this.handleError))
  }
  
  deleteProducts(id:number){
    return this.httpClient.delete<any>(`${this.ApiUrl}inventario/delete/${id}`,{ withCredentials: true }).pipe(catchError(this.handleError))
  }
}
