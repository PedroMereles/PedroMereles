import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Servicio } from '../models/servicio';
import { ServiciosService } from '../services/servicios.service';

@Component({
  selector: 'app-lista-servicios',
  templateUrl: './lista-servicios.page.html',
  styleUrls: ['./lista-servicios.page.scss'],
})
export class ListaServiciosPage implements OnInit {
  servicio: Servicio;
  servicios : Servicio[];
  constructor(
    private firestoreService: ServiciosService,
    private router: Router
    ) {
      this.servicio ={
        servicio : "",
        precio : 0,
        observacion:"",
        grupo : "",
        id : "",
      }
     }
    getServicio()
  {
    //this.cleanMateria();
    this.firestoreService.consultar('servicio').subscribe((result) => {
      this.servicios = [];
      result.forEach((datos: any) => {
        let servicio = 
        {
          id: datos.payload.doc.id,
          servicio: datos.payload.doc.data().servicio, 
          precio: datos.payload.doc.data().precio,
          grupo: datos.payload.doc.data().grupo,
          observacion: datos.payload.doc.data().observacion
        } as Servicio;
        this.servicios.push(servicio);
      })
      this.servicios = this.servicios;
    });
   
   
  }

  ngOnInit() {
    this.getServicio();
  }
  principal()
  {
    this.router.navigate(['./home']);
  }
}
