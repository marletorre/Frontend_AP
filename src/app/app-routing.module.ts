import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortfolioComponent } from './componentes/portfolio/portfolio.component';
import { IniciarSesionComponent } from './componentes/iniciar-sesion/iniciar-sesion.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { GuardsService as guard}  from './servicios/guards.service';

const routes: Routes = [
  {path:'portfolio',component:PortfolioComponent,canActivate:[guard],data:{expectedRol:['admin','user']}},
  {path:'login',component:IniciarSesionComponent},
  {path:'registro',component:RegistroComponent},
  {path:'home',component:PortfolioComponent},
  {path:'',component:IniciarSesionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
