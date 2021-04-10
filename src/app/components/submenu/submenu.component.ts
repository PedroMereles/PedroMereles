import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-submenu',
  templateUrl: './submenu.component.html',
  styleUrls: ['./submenu.component.scss'],
})
export class SubmenuComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
  }
  
  logout()
  {
    this.auth.signOut();
  }
  irPerfil(){
    this.router.navigate(["/perfil"]);
  }
  irServicios(){
    this.router.navigate(["/reservar"]);
  }


}