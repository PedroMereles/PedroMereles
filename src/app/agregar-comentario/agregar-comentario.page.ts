import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Grupo } from '../models/grupo';
import { Opinion } from '../models/opinion';
import { Reserva } from '../models/reserva';
import { Servicio } from '../models/servicio';
import { AuthService } from '../services/auth.service';
import { ServiciosService } from '../services/servicios.service';

@Component({
  selector: 'app-agregar-comentario',
  templateUrl: './agregar-comentario.page.html',
  styleUrls: ['./agregar-comentario.page.scss'],
})
export class AgregarComentarioPage implements OnInit {

  serviciosOriginal: Servicio[];
  servicios: Servicio[];
  reserva: Reserva;
  reservas : Reserva[];
  reservasOriginal: Reserva[];
  user: any;
  opinion: Opinion;
  opiniones : Opinion[];
  opinionesOriginal: Opinion[];
  
  constructor(
    private auth: AuthService,
    public alertController: AlertController,
    private firestoreService: ServiciosService,
    private router: Router,
    private  toastr : ToastController,
    private loadingCtrl : LoadingController
    )
    {
     
      this.reserva = {
        cliente : "",
        grupo : "",
        horario : "",
        id : null,
        servicio : "",
      } 
      this.opinion = {
        id: "",
        servicio: "",
        cliente: "",
        comentario : "",
        puntaje : ""
      } 
   }
   //Lista los Grupos
  
   
   

  //lista RESERVAS
  getReservas()
  {
    //this.cleanMateria();
    this.firestoreService.consultar('reserva').subscribe((result) => {
      this.reservas = [];
      result.forEach((datos: any) => {
        let reserva = 
        {
          id: datos.payload.doc.id,
          cliente: datos.payload.doc.data().cliente, 
          grupo: datos.payload.doc.data().grupo,
          horario: datos.payload.doc.data().horario,
          servicio: datos.payload.doc.data().servicio

        } as Reserva;
        this.reservas.push(reserva);
      })
      this.reservas = this.reservas.filter(reserva => this.reserva.cliente == this.user.userNombre);
      console.log(this.user);
  
    });
   
  }

     //Recupera datos del cliente
    cargarDatos(){
      this.auth.user$.subscribe(user =>{
      this.user = user;
      console.log(user);
    })}
  ngOnInit() {
    this.cargarDatos();
    this.getReservas();
    
  }
  principal()
  {
    this.router.navigate(['../home']);   
  }

  async guardarComentario(){
   
    if( this.opinion.servicio != '' && this.opinion.comentario != '' && this.opinion.puntaje != "")
    {
      const loading = await  this.loadingCtrl.create({
        message: 'Procesando...',
        spinner : 'crescent',
        showBackdrop: true
      });
      loading.present();
      this.opinion.cliente = this.user.userNombre

      if(this.opinion.id)
      {
        this.firestoreService.actualizar('opinion', this.opinion.id, this.opinion);
      } else
      {
        this.firestoreService.insertar("opinion", this.opinion)
      }
      loading.dismiss();
      this.toast('La reserva se ha guardado exitosamente.', 'success');
      this.opinion = {
        id: "",
        servicio: "",
        cliente: "",
        comentario : "",
        puntaje : ""
    
      }
    } else 
    {
      this.toast('Se debe de completar todos los campos...', 'warning');
    }
  }

  async toast(message, status){
    const toast = await this.toastr.create({
      message:message,
      color: status,
      position: 'top',
      duration: 1500

    });
    toast.present();
   }//fin del toast
}
