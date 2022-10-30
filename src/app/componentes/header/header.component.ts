import { Component, OnInit } from '@angular/core';
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faHome,faUser,faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faGithub=faGithub;
  faLinkedin=faLinkedin;
  faInstagram=faInstagram;
  faHome=faHome;
  faUser=faUser;
  faRightFromBracket=faRightFromBracket;
  
  isLogged=false;

  constructor(private tokenService:TokenService,private router:Router) { }

  
  ngOnInit(){
    if(this.tokenService.getToken()){
      this.isLogged=true;
    } else{
      this.isLogged=false;
    }
  }

  onLogOut():void{
    this.tokenService.logOut();
    this.router.navigate(['/login']);
  }
  loguearse():void{
    this.router.navigate(['/login']);
  }
}
