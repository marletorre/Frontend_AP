import { Component, OnInit } from '@angular/core';
import { Proyectos } from 'src/app/interfaces/proyectos';
import { DatosService } from 'src/app/servicios/datos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { faAdd,faPen,faTrash } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-proyectos',
  templateUrl: './proyectos.component.html',
  styleUrls: ['./proyectos.component.css']
})
export class ProyectosComponent implements OnInit {
  faAdd=faAdd;
  faPen=faPen;
  faTrash=faTrash;
  title:string='Proyectos';
  path:string='proyectos';
  public proyectos:Proyectos[]|undefined;
  public editProyectos:Proyectos|undefined;
  public borrarProyectos:Proyectos|undefined;
  isLogged = true;
  roles: string[] | undefined;
  isAdmin = false;
  constructor(private datosService:DatosService,
    private tokenService:TokenService) { }

  ngOnInit(): void {
    this.getProyectos();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  public getProyectos(){
    this.datosService.obtenerDatos<Proyectos[]>(this.path).subscribe({
      next:(response:Proyectos[])=>{
        this.proyectos=response;
      },
      error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })    
}
public onOpenModal(modo: string, proyectos?: Proyectos): void {
  const container = document.getElementById('main-container');
  const button = document.createElement('button');
  button.type = 'button';
  button.style.display = 'none';
  button.setAttribute('data-toggle', 'modal');
  button.setAttribute('data-target', `#${modo}ExperienceModal`);
    
    if (modo === 'delete') {
      this.borrarProyectos = proyectos;
    } else if (modo === 'edit') {
      this.editProyectos = proyectos;
    }

  container?.appendChild(button);
  button.click();
}

  public onAddProyectos(addForm: NgForm): void {
    document.getElementById('add-experience-form')?.click();
    this.datosService.agregarDatos(this.path,addForm.value).subscribe({
      next: (response: Proyectos) => {
        this.getProyectos();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }

  public onUpdateProyectos(proyectos:Proyectos){
    this.editProyectos=proyectos;
    this.datosService.actualizarDatos(this.path,this.editProyectos).subscribe({
      next: (response: Proyectos) => {
        console.log(response);
        this.getProyectos();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public eliminarProyectos(id:number|undefined){
    this.datosService.eliminarDatos(this.path,id).subscribe({
      next:()=>{
        this.getProyectos();
      }
    })
  }
}