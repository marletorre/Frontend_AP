import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DatosService {
  private api = 'https://mtbackendap.herokuapp.com/';
  
  constructor(private http:HttpClient) { }

    public obtenerDatos<T>(path: string): Observable<T> {
      return this.http.get<T>(`${this.api}${path}`);
    }
   
    public eliminarDatos(path:string,id:number|undefined):Observable<void>{
    const url=`${this.api}${path}/${id}`
    return this.http.delete<void>(url);
    }

    public actualizarDatos<T>(path:string,body:T):Observable<T>{
      return this.http.put<T>(`${this.api}${path}`, body);
    }

    public agregarDatos<T>(path:string,body:T):Observable<T>{
      return this.http.post<T>(`${this.api}${path}`,body);
    }

}
