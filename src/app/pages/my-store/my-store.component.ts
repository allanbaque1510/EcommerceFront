import { Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { ProductosComponent } from './productos/productos.component';
import { VentasComponent } from './ventas/ventas.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-my-store',
  imports: [ CommonModule, NzTabsModule, NzIconModule],
  templateUrl: './my-store.component.html',
  styleUrl: './my-store.component.css'
})
export class MyStoreComponent {
  map_panel:any[]=[
    {nombre:"Ventas", component:VentasComponent, icon:"dollar"},
    {nombre:"Productos", component:ProductosComponent, icon:"shopping-cart"},
  ];
}
