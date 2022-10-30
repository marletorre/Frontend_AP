import { Component, OnInit } from '@angular/core';
import { TokenService } from 'src/app/servicios/token.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { Router } from '@angular/router';
import { LoginUsuario } from 'src/app/interfaces/login-usuario';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  isLogged= false;
  isLoginFail=false;
  nombreUsuario!: string;
  loginUsuario!: LoginUsuario;
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

onLogin():void{
  this.loginUsuario=new LoginUsuario(this.nombreUsuario,this.password);
  this.authService.login(this.loginUsuario).subscribe(
    data=>{
      this.isLogged=true;
      this.isLoginFail=false;
      this.tokenService.setToken(data.token);
      this.tokenService.setUsername(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
      this.roles=data.authorities;
      this.router.navigate(['/']);
    },
    err=>{
      this.isLogged=false;
      this.isLoginFail=true;
      this.errMsj=err.error.message;
    }
  )
}
}
