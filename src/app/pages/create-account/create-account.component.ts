import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { LoginService } from '../../services/loginServices/login.service';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-create-account',
  imports: [NzButtonModule,ReactiveFormsModule,NzFormModule,NzInputModule,NzIconModule,NzAlertModule],
  templateUrl: './create-account.component.html',
  styleUrl: './create-account.component.css'
})

export class CreateAccountComponent {
  form!:FormGroup;
  msgError:string|undefined;
  statusIconPassword:any={
    password:false,
    confirmPassword:false
  };
  maxLength:any={
    nombre:40,
    celular:9,
    email:40,
    password:20,
    confirmPassword:20,
  }
  formImputs=[
    {isPassword:false,preicon:"user",name:"nombre", label:"Nombre", message:"Ingrese sus nombres y apellidos", type:"text"},
    {isPassword:false,addBefore:"+593",name:"celular", label:"Celular", message:"Ingrese su numero celular", type:"number"},
    {isPassword:false,preicon:"mail",name:"email", label:"Correo", message:"Ingrese un correo electronico", type:"email"},
    {isPassword:true,preicon:"lock",name:"password", label:"Contraseña", message:"Ingrese una contraseña", type:'password'},
    {isPassword:true,preicon:"lock",name:"confirmPassword", label:"Confirmar contraseña", message:"Repita la contraseña", type:'password'},
  ]
  constructor(private loginService:LoginService, private fb:FormBuilder){
    this.form = fb.group({
        nombre:fb.control('', [Validators.required]),
        celular:fb.control('', [Validators.required, Validators.pattern('^[0-9]+$')]),
        email:fb.control('', [Validators.required]),
        password:fb.control('', [Validators.required]),
        confirmPassword:fb.control('', [Validators.required]),
      },
    )
  }

  togleIconPass(name:string):void{
    this.statusIconPassword[name] =!this.statusIconPassword[name];  
  }
  validarNumero(event:KeyboardEvent,name:string){
    if (name === 'nombre' && !/^[a-zA-ZÀ-ÿñÑ ]$/.test(event.key)) {
      event.preventDefault();
    }
    if (name === 'celular' && (event.charCode < 48 || event.charCode > 57)){
      event.preventDefault(); // Bloquea cualquier tecla que no sea un número
    }
    if(name === 'celular' && this.form.get('celular')?.value.length === 0 && event.charCode === 48 ){
      event.preventDefault();
    }
    if(this.form.get(name)?.value.length > this.maxLength[name] - 1){
      event.preventDefault();
    }
  }

  submitForm(){
    this.msgError = undefined;
    if(this.form.valid){
      this.loginService.registrar(this.form.value).subscribe({
        next:(data)=> {
          this.loginService.saveSession(data.data)
          window.location.href = "/";
        },
        error:err=>this.msgError = err,
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
