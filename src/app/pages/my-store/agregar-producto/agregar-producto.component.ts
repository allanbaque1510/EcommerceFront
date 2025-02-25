import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzImageModule } from 'ng-zorro-antd/image';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzUploadFile, NzUploadModule } from 'ng-zorro-antd/upload';
import { InventarioService } from '../../../services/inventario.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { ModalResponseService } from '../../../services/modal-response.service';

@Component({
  selector: 'app-agregar-producto',
  imports: [NzButtonModule,ReactiveFormsModule, NzInputModule, NzFormModule,NzImageModule ,NzModalModule,NzIconModule, NzUploadModule ],
  templateUrl: './agregar-producto.component.html',
  styleUrl: './agregar-producto.component.css'
})
export class AgregarProductoComponent {
  notificaciones:arrayNotification[] = [];
  form!:FormGroup
  previewImage: string | undefined = '';
  previewVisible = false;
  fileList: any = [];

  dataForm:inputModel[] = [
    {label:"Nombre del producto", name:"nombre", input:"text", require:true, minLength:8},
    {label:"Descripcion", name:"descripcion", input:"textArea", require:true, minLength:20},
    {label:"Color", name:"color", input:"text"},
    {label:"Cantidad", name:"cantidad", input:"number", require:true},
    {label:"Precio", name:"precio", input:"number", require:true},
  ]
  constructor(private fb:FormBuilder, private inventarioService:InventarioService,private notification: NzNotificationService, private modalResponseService:ModalResponseService){
   this.form = this.createForm();
  }

  private createForm(): FormGroup {
    const formControls = this.dataForm.reduce((acc, field) => {
      const validators = [];
      if (field.require) validators.push(Validators.required);
      acc[field.name] = this.fb.control('', validators);
      return acc;
    }, {} as { [key: string]: AbstractControl });

    return this.fb.group(formControls);
  }
  showImage(file:any){
    this.previewVisible = true;
    this.previewImage=file
  }
  beforeUpload = (file: NzUploadFile): boolean => {
    const isImage = file.type && file.type.startsWith('image/');
    if (!isImage) {
      console.error('Solo se permiten imágenes');
      return false;
    }
    const myReader = new FileReader();
    myReader.readAsDataURL(file as any);
    myReader.onloadend = (e) => {
      this.fileList.push(myReader.result)
    };
    return false;
  }
  guardarProducto(){
    const valores = this.form.value;

    this.dataForm.map((x:inputModel)=>{
      if(x.require && valores[x.name].length < 1){
        this.notificaciones.push({title:x.label, description:"El campo no puede estar vacio"})
      }else if(x.minLength !== undefined && x.minLength > valores[x.name].length){
        this.notificaciones.push({title:x.label, description:`La longitud minima del campo es de ${x.minLength} caracteres`})
      }
    })
    if(this.fileList.length < 1){
      this.notificaciones.push({title:"Imagen del producto", description:"Debe ingresar minimo una imagen del producto"})
    }
    if(this.notificaciones.length >0){
      this.notificaciones.forEach((element:arrayNotification) => {
        this.notification.create(
          'error',
          element.title,
          element.description,
          { nzPlacement: 'topRight' }
        );
      });
    }else{
      this.uploadData(valores);
    }
    this.notificaciones =[];
  }

  uploadData(formulario:any){
    this.inventarioService.upload({...formulario, imagenes:this.fileList}).subscribe({
      next:(x)=>{
        this.modalResponseService.setModalResponse={status:'success',title:"Producto agregado",description:"El producto se agrego correctamente"}
      },
      error:(error)=>{
        this.modalResponseService.setModalResponse={status:'error',title:"Error al agregar el producto",description:error}
      },
      complete:()=>{

      }
    })

  }

}
interface arrayNotification {
  title:string,
  description:string,
}
interface inputModel{
  label:string, 
  name:string, 
  input:string, 
  require?:boolean,
  minLength?:number,
}

