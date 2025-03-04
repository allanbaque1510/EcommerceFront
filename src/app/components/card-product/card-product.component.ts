import { Component, Input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ProductsService } from '../../services/products.service';
import { CommonModule } from '@angular/common';
import { ModalResponseService } from '../../services/modal-response.service';
import { UtilService } from '../../utils/util.service';
@Component({
  selector: 'app-card-product',
  imports: [NzCardModule, CommonModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {
  @Input() id!:number 
  @Input() img!:string
  @Input() name!:string 
  @Input() description!:string
  @Input() price!:number
  @Input() animationDelay!:number
  @Input() stock!:boolean 
  constructor(private productService:ProductsService, private modalResponseService:ModalResponseService, public utilService:UtilService){
    console.log(this.description)
  }
  
  saveProduct(id:number,cantidad:number):void{
    this.productService.saveProduct({id, cantidad})
    .subscribe({
      next:()=>console.log('Producto guardado'),
      error:(error)=>{
        this.modalResponseService.setModalResponse={
          status:'error',
          title:"Error",
          description:error
        }
      },
    })
  }
}
