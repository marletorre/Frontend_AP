import { Component, OnInit, Input,Output,EventEmitter } from '@angular/core';
import { DatosService } from 'src/app/servicios/datos.service';
import { faPen,faTrash,faAdd } from '@fortawesome/free-solid-svg-icons';
import { Educacion } from 'src/app/interfaces/educacion';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {
  public educaciones:Educacion[]|undefined;
  public educacion:Educacion|undefined;
  public editEducacion:Educacion|undefined;
  public borrarEducacion:Educacion|undefined;
  title:string='Educación';
  faPen=faPen;
  faTrash=faTrash;
  faAdd=faAdd;
  path: string = '/educacion'

  constructor(
    private datosService:DatosService ) { }

  ngOnInit(): void {
    this.getEducaciones();
  }
    public getEducaciones(){
      this.datosService.obtenerDatos<Educacion[]>(this.path).subscribe({
        next:(response:Educacion[])=>{
          this.educaciones=response;
        },
        error:(error:HttpErrorResponse)=>{
        alert(error.message);
      }
    })    
  }

  public onOpenModal(modo: string, educacion?: Educacion): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', `#${modo}ExperienceModal`);
    
    if (modo === 'delete') {
      this.borrarEducacion = educacion;
    } else if (modo === 'edit') {
      this.editEducacion = educacion;
    }

    container?.appendChild(button);
    button.click();
  }
  public onAddEducacion(addForm: NgForm): void {
    document.getElementById('add-experience-form')?.click();
    this.datosService.agregarDatos(this.path,addForm.value).subscribe({
      next: (response: Educacion) => {
        this.getEducaciones();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }
    public onUpdateEducacion(educacion:Educacion){
    this.editEducacion=educacion;
    this.datosService.actualizarDatos(this.path,this.editEducacion).subscribe({
      next: (response: Educacion) => {
        console.log(response);
        this.getEducaciones();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public eliminarEducacion(id:number|undefined){
    this.datosService.eliminarDatos(this.path,id).subscribe({
      next:()=>{
        this.getEducaciones();
      }
    })
  }
 
}