import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {  Observable} from 'rxjs';
import { NuevoUsuario } from '../interfaces/nuevo-usuario';
import { LoginUsuario } from '../interfaces/login-usuario';
import { JwtDTO } from '../interfaces/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loginUsuario:LoginUsuario | undefined;
  private api='https://mtbackendap.herokuapp.com'+'/auth/';
  
  constructor(private httpClient:HttpClient) { }

  public nuevo(nuevoUsuario:NuevoUsuario):Observable<any>{
    return this.httpClient.post<any>(this.api+'nuevo',nuevoUsuario);
  }

  public login(loginUsuario:LoginUsuario):Observable<JwtDTO>{
    return this.httpClient.post<JwtDTO>(this.api+'login',loginUsuario);
  }
}
