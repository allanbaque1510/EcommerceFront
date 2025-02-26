import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  constructor() { }
  statusLoading = new BehaviorSubject<boolean>(false);
  $observableStatusLoading = this.statusLoading.asObservable();
  
  loadingOn(){
    this.statusLoading.next(true);
  }
  loadingOff(){
    this.statusLoading.next(false);
  }
  
}
