import { Component, OnInit } from '@angular/core';
import { faGithub,faLinkedin,faInstagram } from '@fortawesome/free-brands-svg-icons';
import { TokenService } from 'src/app/servicios/token.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  faGithub=faGithub;
  faLinkedin=faLinkedin;
  faInstagram=faInstagram;
  isLogged=false;
  constructor(private tokenService:TokenService,private router:Router) { }

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged=true;
    } else{
      this.isLogged=false;
    }
  }

}
