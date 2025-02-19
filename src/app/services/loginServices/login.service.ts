import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, of, switchMap, throwError } from 'rxjs';
import { user } from '../../interfaces/user';
import { CryptDataService } from './crypt-data.service';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})

export class LoginService {
  Url:string=environment.ApiUrl;
  private loginStatus = new BehaviorSubject<boolean>(false);
  observableStatusModal$ = this.loginStatus.asObservable() 
  private csrfTokenLoaded = false; 
  private userData = new BehaviorSubject<user|undefined>(undefined);
  observableUserData$ = this.userData.asObservable() 

  constructor(private httpClient:HttpClient, private cryptDataService:CryptDataService,private router: Router) { }

  private handleError(error: HttpErrorResponse){
    return throwError(error.error.message);
  }


  get statusModal():boolean{
    return this.loginStatus.getValue();
  }
  set setStatus(val:boolean){
    this.loginStatus.next(val)
  }


  private ensureCsrfToken() {
    if (this.csrfTokenLoaded) {
      return of(true); // Si ya se cargó, no volvemos a hacer la petición
    }
    return this.httpClient.get(`${environment.Url}sanctum/csrf-cookie`, { withCredentials: true }).pipe(
      switchMap(() => {
        console.log("Entro al csrfcookie")
        this.csrfTokenLoaded = true;
        return of(true); // Retorna un observable indicando que se ha cargado
      }),
      catchError(error => {
        console.error('Error al obtener el token CSRF', error);
        return throwError(() => new Error('Error al obtener CSRF'));
      })
    );
  }

  registrar(values: any) {
    return this.ensureCsrfToken().pipe(
      switchMap(() => this.httpClient.post<any>(`${this.Url}register`, values, { withCredentials: true })),
      catchError(this.handleError)
    );
  }

  logear(values: any) {
    return this.ensureCsrfToken().pipe(
      switchMap(() => this.httpClient.post<any>(`${this.Url}login`, values,{ withCredentials: true })),
      catchError(this.handleError)
    );
  }
  logOut(){
    return this.httpClient.get<any>(`${this.Url}logout`,{ withCredentials: true })
    .pipe(catchError(this.handleError))
    .subscribe(x=>{this.clearSession(); this.deleteAllCookies()})
  }
  saveProduct(product:any){
    return this.httpClient.post<any>(`${this.Url}save_product`,product,{ withCredentials: true })
    .pipe(catchError(this.handleError))
    .subscribe(x=>console.log(x))
  }
  getUSer() {
    return this.httpClient.get<any>(`${this.Url}user`,{ withCredentials: true })
    .pipe(
      catchError(error => {
        return this.handleError(error);
      }))
    .subscribe(x=>{
      this.saveSession(x.data)
    })
    ;
  }
  deleteAllCookies(): void {
    document.cookie.split(";").forEach((c) => { 
      document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
  }
    
  saveSession(encryptedData: string){
    this.userData.next(this.cryptDataService.decryptData(encryptedData))
    sessionStorage.setItem('user_session',encryptedData);
    if (this.router.url === '/register') {
      this.router.navigate(['/']);
    }else{
      // window.location.reload();
    }
  }
  clearSession(){
    sessionStorage.removeItem('user_session');
    this.userData.next(undefined)
    this.router.navigate(["/"]);
  }

  getSession(){
    const inData =sessionStorage.getItem('user_session');
    if(inData !== null){
      this.userData.next(this.cryptDataService.decryptData(inData))
      return true;
    }
    return false ;
  }
}
