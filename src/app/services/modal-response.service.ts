import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IModalResponse } from '../interfaces/IModaResponse';

@Injectable({
  providedIn: 'root'
})
export class ModalResponseService {
  private dataModal = new BehaviorSubject<IModalResponse>({status:'success',title:'',description:''});
  $dataModalObserver = this.dataModal.asObservable();

  private statusModal = new BehaviorSubject<boolean>(false);
  $dataModalStatus = this.statusModal.asObservable();

  set setModalResponse(data:IModalResponse){
    this.dataModal.next(data)
    this.statusModal.next(true)
  }
  set setStatusModal(val:boolean){ this.statusModal.next(val)}
  get modalRepsonse():IModalResponse{ 
    return this.dataModal.getValue()
  }
  closeModal(){
    this.statusModal.next(false)
    this.dataModal.next({status:this.dataModal.getValue().status,title:'',description:''})
  }
}

