import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/servicios/token.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/interfaces/nuevo-usuario';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  isLogged= false;
  isRegister=false;
  isRegisterFail=false;
  nombre!:string;
  nombreUsuario!: string;
  email!:string;
  nuevoUsuario!: NuevoUsuario;
  password!: string;
  roles:string[]=[];
  errMsj!: string;
  constructor(private tokenService:TokenService,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit() {
    if(this.tokenService.getToken()){
      this.isLogged=true;
    
  }

}

onRegister():void{
  this.nuevoUsuario = new NuevoUsuario(this.nombre, this.nombreUsuario,this.email,this.password);
      this.authService.nuevo(this.nuevoUsuario).subscribe({next:
        (data)=>{
          this.isRegister=true;
          this.isRegisterFail=false;
             
        (error:any)=>{
          this.isRegisterFail=true;
          this.errMsj=error.error.mensaje;
        };
      }}
      )}

      login(){
        this.router.navigate(['/login']);
      }
    }