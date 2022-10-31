import { Component, OnInit } from '@angular/core';
import { DatosService } from 'src/app/servicios/datos.service';
import { HttpErrorResponse} from '@angular/common/http';
import { Experiencia } from 'src/app/interfaces/experiencia';
import {faPen,faTrash,faAdd} from '@fortawesome/free-solid-svg-icons'
import {NgForm} from '@angular/forms'
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  public experiencias:Experiencia[]|undefined;
  public editExperiencia:Experiencia|undefined;
  public borrarExperiencia:Experiencia|undefined;
  faPen=faPen;
  faTrash=faTrash;
  faAdd=faAdd;
  path:string='experiencia';
  isLogged = true;
  roles: string[] | undefined;
  isAdmin = false;

  constructor(private datosService:DatosService,
    private tokenService:TokenService ) { }

  ngOnInit(): void {
    this.getExperiencias();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  public getExperiencias(){
      this.datosService.obtenerDatos<Experiencia[]>(this.path).subscribe({
        next:(response:Experiencia[])=>{
          this.experiencias=response;
        },
        error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })    
  }

  public onOpenModal(modo: string, experiencia?: Experiencia): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', `#${modo}ExperienceModal`);
    
    if (modo === 'delete') {
      this.borrarExperiencia = experiencia;
    } else if (modo === 'edit') {
      this.editExperiencia = experiencia;
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddExperiencia(addForm: NgForm): void {
    document.getElementById('add-experience-form')?.click();
    this.datosService.agregarDatos(this.path,addForm.value).subscribe({
      next: (response: Experiencia) => {
        this.getExperiencias();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }
  public onUpdateExperiencia(experiencia:Experiencia){
      this.editExperiencia=experiencia;
      this.datosService.actualizarDatos(this.path,this.editExperiencia).subscribe({
        next: (response: Experiencia) => {
          console.log(response);
          this.getExperiencias();
        },
        error: (error: HttpErrorResponse) => {
          alert(error.message);
        },
      });
    }

  public eliminarExperiencia(id:number|undefined){
    this.datosService.eliminarDatos(this.path,id).subscribe({
      next:()=>{
        this.getExperiencias();
      }
    })
  }
   
}


