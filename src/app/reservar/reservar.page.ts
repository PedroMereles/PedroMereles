import { Component, OnInit } from '@angular/core';
import { Servicio } from '../models/servicio';
import { ServiciosService } from '../services/servicios.service';

@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.page.html',
  styleUrls: ['./reservar.page.scss'],
})
export class ReservarPage implements OnInit {
  arrayColeccionServicio: any = [{
    id: '',
    data: {} as Servicio
   }];


  constructor(private firestoreService: ServiciosService ) { 
    

  }

  obtenerListaServicios(){
    this.firestoreService.consultar('servicio').subscribe((resultadoConsultaServicio) => {
      this.arrayColeccionServicio = [];
      resultadoConsultaServicio.forEach((datosTarea: any) => {
        this.arrayColeccionServicio.push({
          id: datosTarea.payload.doc.id,
          data: datosTarea.payload.doc.data()
        });
      })
    });
  }

  ngOnInit() {
    this.obtenerListaServicios();
  }

}
