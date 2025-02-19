import { Component } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { LoginService } from '../../services/loginServices/login.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { RouterModule } from '@angular/router';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-login',
  imports: [NzButtonModule,ReactiveFormsModule,NzFormModule,NzInputModule,NzAlertModule, NzModalModule,RouterModule,NzIconModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  isVisible!:boolean;
  isLoadingLogin:boolean=false;
  form!:FormGroup;
  isOkLoading:boolean = false;
  messageError:string |undefined;
  constructor(private loginService:LoginService , private fb:FormBuilder){
    this.form = fb.group({
      username: fb.control('', [Validators.required]),
      password: fb.control('', [Validators.required]),
    })
    loginService.observableStatusModal$.subscribe(sub=>this.isVisible = sub)
  }
  handleCancel(): void {
    this.messageError = undefined;
    this.loginService.setStatus = false;
    this.form.reset({}, { emitEvent: false });
  }

  handleOk(): void {
    this.isVisible = false;
  }
  submitForm():void{
    if(this.form.valid){
      this.isLoadingLogin = true;
      this.messageError = undefined;
      this.loginService.logear(this.form.value).subscribe({
        next:(data)=>{ 
          this.loginService.saveSession(data.data)
        },
        error:(err)=>{this.messageError = err;this.isLoadingLogin=false},
        complete:()=>this.isLoadingLogin = false
      });
    }else{
      Object.values(this.form.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
