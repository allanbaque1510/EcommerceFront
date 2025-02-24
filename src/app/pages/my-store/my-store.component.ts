import { Component } from '@angular/core';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { InventarioComponent } from './inventario/inventario.component';
import { VentasComponent } from './ventas/ventas.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-my-store',
  imports: [ CommonModule, NzTabsModule, NzIconModule,RouterLink],
  templateUrl: './my-store.component.html',
  styleUrl: './my-store.component.css'
})
export class MyStoreComponent {
  map_panel:any[]=[
    {param:"dash",nombre:"Dashboard", component:VentasComponent, icon:"area-chart"},
    {param:"inv", nombre:"Inventario", component:InventarioComponent, icon:"product"},
  ];
  constructor(private route: ActivatedRoute, private router: Router){
    this.route.queryParams.subscribe(params => {
      if (!params['t']) {
        this.router.navigate([], {
          queryParams: { t: this.code('dash') },
          queryParamsHandling:'merge'
        });
      }
    });
  }
  code(param:string):string{
    return btoa(param)
  }
}
