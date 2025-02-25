import { Component } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-loading',
  imports: [NzSpinModule],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {
  statusLoading!:boolean;
  constructor(private loadingService:LoadingService) {
    loadingService.$observableStatusLoading.subscribe(data => this.statusLoading = data);
   }

}
