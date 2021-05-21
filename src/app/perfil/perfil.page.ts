import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  user: any;


  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.cargarDatos();
  }

  cargarDatos(){
    this.auth.user$.subscribe(user =>{
    this.user = user;
    console.log(user);
  })}

  editarPerfil()
  {
    this.router.navigate(['/editar/perfil']);   
  }
  principal()
  {
    this.router.navigate(['./home']);
  }
}
