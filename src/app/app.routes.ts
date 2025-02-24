import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
export const routes: Routes = [
    {path:"", loadComponent:()=>import("./pages/index/index.component").then(m=>m.IndexComponent)},
    {path:"register", loadComponent:()=>import("./pages/create-account/create-account.component").then(m=>m.CreateAccountComponent)},
    {path:"myStore", loadComponent:()=>import("./pages/my-store/my-store.component").then(m=>m.MyStoreComponent) , canActivate:[authGuard]},
    {path:"myStore/agregarproducto", loadComponent:()=>import("./pages/my-store/agregar-producto/agregar-producto.component").then(m=>m.AgregarProductoComponent) , canActivate:[authGuard]},
];
