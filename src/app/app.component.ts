import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { LoginComponent } from './pages/login/login.component';
import { LoginService } from './services/loginServices/login.service';
import { user } from './interfaces/user';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,NzIconModule,NzBadgeModule,LoginComponent,NzAvatarModule,NzDropDownModule,RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  userInfo:user | undefined;
  constructor(public loginService:LoginService , private router: Router){
    if(!loginService.getSession())this.loginService.getUSer();
    loginService.observableUserData$.subscribe(x=>this.userInfo=x)
  }
  cerrarSession(){
    this.loginService.logOut();
  }
  showLogin(){
    this.loginService.setStatus = true;
  }
  showMyStore(){
    this.router.navigate(['/myStore']);
  }
}
