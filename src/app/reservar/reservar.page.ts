import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Servicio } from '../models/servicio';
import { ServiciosService } from '../services/servicios.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { Reserva } from '../models/reserva';
import { AuthService } from '../services/auth.service';
import { Grupo } from '../models/grupo';
@Component({
  selector: 'app-reservar',
  templateUrl: './reservar.page.html',
  styleUrls: ['./reservar.page.scss'],
})
export class ReservarPage implements OnInit {

  grupos: Grupo[];
  serviciosOriginal: Servicio[];
  servicios: Servicio[];
  grupo : Grupo;
  reserva: Reserva;
  reservas : Reserva[];
  reservasOriginal: Reserva[];
   user: any;

  constructor(
    private auth: AuthService,
    public alertController: AlertController,
    private firestoreService: ServiciosService,
    private router: Router,
    private  toastr : ToastController,
    
    private loadingCtrl : LoadingController
  ) { this.grupo= {
    id:"",
    descripcion: ""
  } 
  this.reserva = {
    cliente : "",
    grupo : "",
    horario : "",
    id : null,
    servicio : "", 

  }
}
  //Recupera datos del cliente
  cargarDatos(){
    this.auth.user$.subscribe(user =>{
    this.user = user;
    console.log(user);
  })}

  getGrupo()
  {
    //this.cleanMateria();
    this.firestoreService.consultar('grupo').subscribe((result) => {
      this.grupos = [];
      result.forEach((datos: any) => {
        let grupo = 
        {
          id: datos.payload.doc.id,
          descripcion: datos.payload.doc.data().descripcion
        } as Grupo;
        this.grupos.push(grupo);
      })
    });
  }
//lista Servicios
  getServicio()
  {
    //this.cleanMateria();
    this.firestoreService.consultar('servicio').subscribe((result) => {
      this.serviciosOriginal = [];
      result.forEach((datos: any) => {
        let servicio = 
        {
          id: datos.payload.doc.id,
          servicio: datos.payload.doc.data().servicio, 
          precio: datos.payload.doc.data().precio,
          grupo: datos.payload.doc.data().grupo,
          observacion: datos.payload.doc.data().observacion
        } as Servicio;
        this.serviciosOriginal.push(servicio);
      })
      this.servicios = this.serviciosOriginal;
    });
   
  }

//lista RESERVAS
  getReservas()
  {
    //this.cleanMateria();
    this.firestoreService.consultar('reserva').subscribe((result) => {
      this.reservasOriginal = [];
      result.forEach((datos: any) => {
        let reserva = 
        {
          id: datos.payload.doc.id,
          cliente: datos.payload.doc.data().cliente, 
          grupo: datos.payload.doc.data().grupo,
          horario: datos.payload.doc.data().horario,
          servicio: datos.payload.doc.data().servicio

        } as Reserva;
        this.reservasOriginal.push(reserva);
      })
      this.reservas = this.reservasOriginal;
    });
   
  }

  ngOnInit() {
   // this.obtenerListaServicios();
   this.getGrupo();
   this.getServicio();
   this.getReservas();
   this.cargarDatos();

  }


  irReservas(){
    this.router.navigate(['/reservas']);
  }
  obtenerServicio(){
    this.servicios = this.servicios.filter(servicio => servicio.grupo == this.reserva.grupo);
    //this.servicios = this.servicios.filter(servicio => servicio.grupo == "Automoviles");
    console.log(this.reserva.grupo);
    console.log(this.servicios = this.servicios.filter(servicio => servicio.grupo == this.reserva.grupo));
  }


/*
  async presentAlert(documento : any) {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Horarios',
      message: 'Seleccione un Horario',
      inputs: [
        // input date with min & max
        {
          type: 'datetime-local'

        }
      ],
      buttons: ['OK']
    });
    console.log(alert.inputs.values);

    await alert.present();
    const { role } = await alert.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);

    this.reserva.servicio= documento.servicio;
    this.reserva.grupo = documento.grupo;
    this.reserva.horario = loquesea
   this.reserva.cliente = this.user?.userNombre
   this.reserva.id = ""

    this.firestoreService.insertar("reserva", this.reserva).then(() => {
      
    }, (error) => {
      console.error[error];
    });

    console.log(documento);
  }

  cargarDatos(){
    this.auth.user$.subscribe(user =>{
    this.user = user;
    console.log(user);
  })}
 */
  principal()
  {
    this.router.navigate(['./home']);
  }

  async guardarReserva(){
    this.reservas = this.reservasOriginal.filter(reserva => reserva.horario == this.reserva.horario);
   
    if(this.reserva.grupo != '' && this.reserva.servicio != '' && this.reserva.horario != '' && this.reservas.length == 0)
    {
      const loading = await  this.loadingCtrl.create({
        message: 'Procesando...',
        spinner : 'crescent',
        showBackdrop: true
      });
      loading.present();
      this.reserva.cliente = this.user.userNombre

      if(this.reserva.id)
      {
        this.firestoreService.actualizar('reserva', this.reserva.id, this.reserva);
      } else
      {
        console.log("***************************************")
        //this.reserva.horario = new Date().toDateString();
        this.reserva.horario = this.getDate(this.reserva.horario);
        this.firestoreService.insertar("reserva", this.reserva)
      }
      loading.dismiss();
      this.toast('La reserva se ha guardado exitosamente.', 'success');
      this.reserva = {
        cliente : "",
        grupo : "",
        horario : "",
        id : null,
        servicio : "", 
    
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

   getDate(date: any)
   {
     let d: Date = new Date(date);
     return String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0') + '/' + d.getFullYear() + "-" + 
      d.getHours()
     ;
   }

   openServicios(){
    this.router.navigate(["/agregar-servicio"]);
  }

}
