import { Component } from '@angular/core';
import { ApexOptions } from 'apexcharts';
import { NgApexchartsModule } from 'ng-apexcharts';
@Component({
  selector: 'app-ventas',
  imports: [NgApexchartsModule],
  templateUrl: './ventas.component.html',
  styleUrl: './ventas.component.css'
})
export class VentasComponent {
  chartOptions: ApexOptions = {
    chart: {
      type: 'line', // Tipo de gráfico (puedes usar 'bar', 'pie', etc.)
      height: 350
    },
    series: [
      {
        name: 'Ventas',
        data: [10, 40, 25, 50, 49, 60, 70, 91, 125]
      }
    ],
    xaxis: {
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep']
    }
  };
}
