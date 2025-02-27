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
  chartOptions!: ChartOptions;
  constructor(){
    this.chartOptions = {
      chart:  {
        type: "area",
        height: 160,
        sparkline: {
          enabled: true
        }
      },
      title:{text:"Ventas Mensuales"},
      subtitle:{text:"Del 2022 al 2023", align:"left"},
      series: [
        {
          name: 'Ventas',
          data: [10, 40, 25, 50, 49, 60, 70, 91, 125]
        }
      ]
    };

  }

  
}


interface ChartOptions {
  series: ApexAxisChartSeries;
  chart: IChart;
  xaxis?: ApexXAxis;
  title: ApexTitleSubtitle;
  subtitle?: ApexTitleSubtitle;
  markers?: any; //ApexMarkers;
  stroke?: any; //ApexStroke;
  yaxis?: ApexYAxis | ApexYAxis[];
  plotOptions?: ApexPlotOptions;
  dataLabels?: ApexDataLabels;
  colors?: string[];
  labels?: string[] | number[];
  legend?: ApexLegend;
  fill?: ApexFill;
  tooltip?: ApexTooltip;
};
interface IChart{
  type: "area" | "line" | "bar" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "radar" | "polarArea" | "rangeBar" | "rangeArea" | "treemap",
  height: number;
  sparkline: {
    enabled: boolean;
  };
}