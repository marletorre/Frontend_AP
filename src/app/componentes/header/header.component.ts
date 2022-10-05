import { Component, OnInit } from '@angular/core';
import { faGithub, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faHome,faUser } from '@fortawesome/free-solid-svg-icons';


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
  constructor() { }

  ngOnInit(): void {
  }

}
