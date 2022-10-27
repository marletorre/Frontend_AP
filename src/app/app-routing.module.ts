import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './componentes/registro/registro.component';

const routes: Routes = [
  {path:'portfolio',component:PortfolioComponent},
  {path:'login',component:IniciarSesionComponent},
  {path:'registro',component:RegistroComponent},
  {path:'',redirectTo:'login',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
