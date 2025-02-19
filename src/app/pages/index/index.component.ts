import { Component } from '@angular/core';
import { CardProductComponent } from '../../components/card-product/card-product.component';
import { Product } from '../../interfaces/product';
@Component({
  selector: 'app-index',
  imports: [CardProductComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})

export class IndexComponent {
  products: Product[]= [
      {id:1,name:"Vestido de seda",description:"Ropa elegante de mujer",inStock:true,price:10.23,img:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"},
      {id:2,name:"Vestido de seda2",description:"Ropa elegante de mujer1",inStock:true,price:13.03,img:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"},
      {id:3,name:"Vestido de seda3",description:"Ropa elegante de mujer2",inStock:true,price:5.22,img:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"},
      {id:4,name:"Vestido de seda4",description:"Ropa elegante de mujer3",inStock:true,price:1,img:"https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"},
    ]
  
}
