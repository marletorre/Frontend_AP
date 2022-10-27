import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NuevoUsuario } from '../interfaces/nuevo-usuario';
import { LoginUsuario } from '../interfaces/login-usuario';
import { JwtDTO } from '../interfaces/jwt-dto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth=environment.apiUrl;
  
  constructor(private httpClient:HttpClient) { }

  public nuevo(nuevoUsuario:NuevoUsuario):Observable<any>{
    return this.httpClient.post<any>(this.auth+'nuevo',nuevoUsuario);
  }

  public login(loginUsuario:LoginUsuario):Observable<JwtDTO>{
    return this.httpClient.post<any>(this.auth+'login',LoginUsuario);
  }
}
