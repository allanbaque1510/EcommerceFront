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

  upload(product:any){
    return this.httpClient.post<any>(`${this.ApiUrl}upload_product`,product,{ withCredentials: true })
    .pipe(catchError(this.handleError))
  }
}
