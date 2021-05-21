import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Opinion } from '../models/opinion';
import { OpinionesService } from '../services/opiniones.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.page.html',
  styleUrls: ['./comentario.page.scss'],
})
export class ComentarioPage implements OnInit {
  opinion: Opinion;
  opiniones : Opinion[];
  opinionesOriginal: Opinion[];
  
  

  constructor(
    private firestoreService: OpinionesService,
    private router: Router
  ) {
    this.opinion = {
      id: "",
      servicio: "",
      cliente: "",
      comentario : "",
      puntaje : ""
    } 

    
   }

   getComentario()
   {
     this.firestoreService.consultar('opinion').subscribe((result) => {
       this.opinionesOriginal = [];
       result.forEach((datos: any) => {
         let opinion = 
         {
           id: datos.payload.doc.id,
           grupo: datos.payload.doc.data().grupo,
           cliente: datos.payload.doc.data().cliente, 
           servicio: datos.payload.doc.data().servicio,
           comentario: datos.payload.doc.data().comentario,
           puntaje: datos.payload.doc.data().puntaje
 
         } as Opinion;
         this.opinionesOriginal.push(opinion);
       })
       this.opiniones = this.opinionesOriginal;
     });
    
   }

  ngOnInit() {
    this.getComentario();
  }
  irComentarios(){
    this.router.navigate(["/coment"]);
  }
  openComentarios(){
    this.router.navigate(["/agregar-comentario"]);
  }
  principal(){
    this.router.navigate(["/home"]);
  }
}
