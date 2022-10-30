import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { DatosService } from 'src/app/servicios/datos.service';
import { Usuario } from 'src/app/interfaces/usuario';
import { NgForm } from '@angular/forms';
import { TokenService } from 'src/app/servicios/token.service';

@Component({
  selector: 'app-acerca-de',
  templateUrl: './acerca-de.component.html',
  styleUrls: ['./acerca-de.component.css'],
})
export class AcercaDeComponent implements OnInit {
  title = 'Acerca de mi:';
  public usuario: Usuario | undefined;
  public editUsuario: Usuario | undefined;
  faPen = faPen;
  faTrash = faTrash;
  path: string = '/usuario/1';
  path2: string = '/usuario';
  isLogged = true;
  roles: string[] | undefined;
  isAdmin = false;

  constructor(
    private datosService: DatosService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getUsuario();
    this.roles = this.tokenService.getAuthorities();
    this.roles.forEach((rol) => {
      if (rol === 'ROLE_ADMIN') {
        this.isAdmin = true;
      }
    });
  }

  public getUsuario() {
    this.datosService.obtenerDatos<Usuario>(this.path).subscribe({
      next: (response: Usuario) => {
        this.usuario = response;
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
      },
    });
  }

  public onOpenModal(modo: string, usuario?: Usuario): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    button.setAttribute('data-target', '#editUsuarioModal');

    container?.appendChild(button);
    button.click();
  }

  public onAddUsuario(addForm: NgForm): void {
    document.getElementById('add-education-form')?.click();
    this.datosService.agregarDatos(this.path2, addForm.value).subscribe({
      next: (response: Usuario) => {
        console.log(response);
        this.getUsuario();
        addForm.reset();
      },
      error: (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      },
    });
  }

  public onUpdateUsuario(usuario: Usuario): void {
    this.editUsuario = usuario;
    this.datosService.actualizarDatos(this.path2, usuario).subscribe({
      next: (response: Usuario) => {
        console.log(response);
        this.getUsuario();
      },
      error: (error: HttpErrorResponse) => {
        console.log('error');
      },
    });
  }
}
