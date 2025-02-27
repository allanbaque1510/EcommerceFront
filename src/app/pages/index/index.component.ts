import { Component } from '@angular/core';
import { CardProductComponent } from '../../components/card-product/card-product.component';
import { Product } from '../../interfaces/product';
import { ProductsService } from '../../services/products.service';
import { environment } from '../../../environments/environment';
import { LoadingService } from '../../services/loading.service';
@Component({
  selector: 'app-index',
  imports: [CardProductComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})

export class IndexComponent {
  products: Product[]= [];
  url:string = environment.Url

  constructor(private productService:ProductsService, private loadinService:LoadingService){
    loadinService.loadingOn()
    this.productService.getProducts().subscribe({
      next:(data:Product[])=>{this.products = data},
      error:err=>console.error(err),
      complete:()=>this.loadinService.loadingOff()
    });
  }

  GenerarArray(int:number){
    return Array.from({ length: int }, (_, i) => i + 1);
  }

  
}
