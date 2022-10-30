import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/interfaces/login-usuario';
import { AuthService } from 'src/app/servicios/auth.service';
import { TokenService } from 'src/app/servicios/token.service';


@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.component.html',
  styleUrls: ['./iniciar-sesion.component.css']
})
export class IniciarSesionComponent implements OnInit {

  isLogged= false;
  isLoginFail=true;
  loginUsuario!: LoginUsuario;
  nombreUsuario!: string;
  password!: string;
  roles:string[]=[];
  errMsj!: string;
  
  constructor(private tokenService:TokenService,
    private authService:AuthService,
    private router:Router) { 

    }

  ngOnInit(){
    if(this.tokenService.getToken()){
      this.isLogged=true;
      this.isLoginFail=false;
      this.roles=this.tokenService.getAuthorities();
    }
}
    onLogin():void{
      this.loginUsuario = new LoginUsuario( this.nombreUsuario, this.password );
      this.authService.login(this.loginUsuario).subscribe({next:
        (data)=>{
          this.isLogged=true;
          this.isLoginFail=false;

          this.tokenService.setToken(data.token);
          this.tokenService.setUsername(data.nombreUsuario);
          this.tokenService.setAuthorities(data.authorities);
          this.roles=data.authorities;
          this.router.navigate(['/portfolio'])
        ,      
        
        (error:any)=> {
            this.isLogged=false;
            this.isLoginFail=true;
            this.errMsj=error.mensaje;
           
            
        };
      }}
      )}

      portfolio():void{
        this.router.navigate(['/portfolio']);
      }
  }
