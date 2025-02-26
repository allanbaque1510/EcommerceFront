import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {  RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTableModule } from 'ng-zorro-antd/table';
import { InventarioService } from '../../../services/inventario.service';
import { LoadingService } from '../../../services/loading.service';
import { ModalResponseService } from '../../../services/modal-response.service';
import { Product } from '../../../interfaces/product';
import { environment } from '../../../../environments/environment';
import { NzImageModule } from 'ng-zorro-antd/image';

@Component({
  selector: 'app-inventario',
  imports: [ NzButtonModule,ReactiveFormsModule, NzInputModule, NzFormModule,NzTableModule,RouterModule, NzImageModule],
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})

export class InventarioComponent {
    form!:FormGroup;
    dataSet: Product[] = [];
    url:string = environment.Url
    constructor(private fb:FormBuilder,private modalService:ModalResponseService, private inventarioService:InventarioService, private loadinService:LoadingService){
      this.form = fb.group({
          search: fb.control(''),
      })
      this.loadinService.loadingOn()
      this.inventarioService.getProducts().subscribe({
        next:(data)=>{this.dataSet = data.data},
        error:err=>this.modalService.setModalResponse={status:'error',title:"Error al obtener datos",description:err},
        complete:()=>this.loadinService.loadingOff()
      })
    }
    submitForm(){

    }
}
