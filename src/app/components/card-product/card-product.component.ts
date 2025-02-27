import { Component, Input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-card-product',
  imports: [NzCardModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.css'
})
export class CardProductComponent {
  @Input() id!:number 
  @Input() img!:string
  @Input() name!:string 
  @Input() description!:string
  @Input() price!:number
  @Input() stock!:boolean 

  constructor(private productService:ProductsService){}

  saveProduct(id:number,cantidad:number):void{
    this.productService.saveProduct({id, cantidad})
  }
}
