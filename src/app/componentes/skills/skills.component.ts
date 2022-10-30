import { Component, OnInit, Input } from '@angular/core';
import { faPen,faTrash,faAdd } from '@fortawesome/free-solid-svg-icons';
import { Skills } from 'src/app/interfaces/skills';
import { HttpErrorResponse } from '@angular/common/http';
import { DatosService } from 'src/app/servicios/datos.service';
import { NgForm } from '@angular/forms';
import { TokenService } from 'src/app/servicios/token.service';


@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
 @Input() nombre:string='Hard & Soft Skills'
 public skills:Skills[]|undefined;
 public editSkills:Skills|undefined;
 public borrarSkills:Skills|undefined;
  faPen=faPen;
  faTrash=faTrash;
  faAdd=faAdd;
  path:string='/skills';
  isLogged = true;
  roles: string[] | undefined;
  isAdmin = false;
  constructor(
    private datosService:DatosService,
    private tokenService:TokenService ) { }

  public ngOnInit(): void {
    this.getSkills();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }
  public getSkills(){
    this.datosService.obtenerDatos<Skills[]>(this.path).subscribe({
      next:(response:Skills[])=>{
        this.skills=response;
        console.log("skills response:", response)
      },
      error:(error:HttpErrorResponse)=>{
      alert(error.message);
    }
  })    
  }

  public onOpenModal(modo: string, skills?: Skills): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', `#${modo}ExperienceModal`);
    
    if (modo === 'delete') {
      this.borrarSkills = skills;
    } else if (modo === 'edit') {
      this.editSkills = skills;
    }

    container?.appendChild(button);
    button.click();
  }

  public onAddSkills(addForm: NgForm): void {
    document.getElementById('add-experience-form')?.click();
    this.datosService.agregarDatos(this.path,addForm.value).subscribe({
      next: (response: Skills) => {
        this.getSkills();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }

  public onUpdateSkills(skills:Skills){
    this.editSkills=skills;
    this.datosService.actualizarDatos(this.path,this.editSkills).subscribe({
      next: (response: Skills) => {
        console.log(response);
        this.getSkills();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }
public eliminarSkills(id:number|undefined){
  this.datosService.eliminarDatos(this.path,id).subscribe({
    next:()=>{
      this.getSkills();
    }
  })
}


}

  
