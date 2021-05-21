import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Grupo } from '../models/grupo';
import { GruposService } from '../services/grupos.service';

@Component({
  selector: 'app-grupo',
  templateUrl: './grupo.page.html',
  styleUrls: ['./grupo.page.scss'],
})
export class GrupoPage implements OnInit {
  arrayColeccionGrupo: any = [{
    id: '',
    data: {} as Grupo
   }];
  constructor(
    private firestoreService: GruposService,
    private router: Router
  ) { }
  obtenerGrupo(){
    this.firestoreService.consultar('grupo').subscribe((resultadoConsultaGrupo) => {
      this.arrayColeccionGrupo = [];
      resultadoConsultaGrupo.forEach((datosGrupo: any) => {
        this.arrayColeccionGrupo.push({
          id: datosGrupo.payload.doc.id,
          data: datosGrupo.payload.doc.data()
        });
      })
    });
  }

  ngOnInit() {
    this.obtenerGrupo();
  }
  principal()
  {
    this.router.navigate(['./home']);
  }

}
