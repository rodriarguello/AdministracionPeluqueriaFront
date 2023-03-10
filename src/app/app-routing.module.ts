import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './Components/home/index/index.component';
import { RegistroComponent } from './Components/home/registro/registro.component';
import { AutenticacionGuard } from './seguridad/autenticacion.guard';


const routes: Routes = [
  
  {path:'', component: IndexComponent, pathMatch:'full'},
  {path:'home', component:IndexComponent, pathMatch:'full'},
  {path:'registro', component:RegistroComponent},
  {path:'pages', loadChildren:() => import('./Components/layout/layout.module').then(m => m.LayoutModule), canActivate:[AutenticacionGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
