import { Component } from '@angular/core';
import { ModalResponseService } from '../../services/modal-response.service';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzResultModule } from 'ng-zorro-antd/result';
import { IModalResponse } from '../../interfaces/IModaResponse';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-modal-response',
  imports: [NzModalModule, NzResultModule, NzButtonModule],
  templateUrl: './modal-response.component.html',
  styleUrl: './modal-response.component.css'
})
export class ModalResponseComponent {
  isVisible!:boolean;
  infoModal:IModalResponse = {status:'success',title:'',description:''};
  constructor(private modalResponseService:ModalResponseService){
    modalResponseService.$dataModalObserver.subscribe(data=>this.infoModal = data)
    modalResponseService.$dataModalStatus.subscribe(data=>this.isVisible = data)
  }


  handleOk(onOK:(()=>void) | undefined): void {
    this.modalResponseService.closeModal();
    if(onOK !== undefined) onOK()
  }


}
