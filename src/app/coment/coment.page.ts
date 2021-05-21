import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Opinion } from '../models/opinion';
import { OpinionesService } from '../services/opiniones.service';


@Component({
  selector: 'app-coment',
  templateUrl: './coment.page.html',
  styleUrls: ['./coment.page.scss'],
})
export class ComentPage implements OnInit {
  arrayColeccioOpinion: any = [{
    id: '',
    data: {} as Opinion
   }];
   coment: Opinion;

  constructor(
    private firestoreService: OpinionesService,
    private router: Router
    ) { 
      this.coment= {} as Opinion;
  }

  ngOnInit() {
  }

  clicBotonInsertar() {
    this.firestoreService.insertar('comentario', this.coment).then(() => {
      console.log('Comentario agregado correctamente!');
      this.coment = {} as Opinion;
    }, (error) => {
      console.error(error);
    });
  }
}
