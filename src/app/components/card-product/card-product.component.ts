import { Component, Input } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';

@Component({
  selector: 'app-card-product',
  imports: [NzCardModule,NzSkeletonModule],
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
}
