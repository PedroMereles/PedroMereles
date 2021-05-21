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
  selector: 'app-agregar-servicio',
  templateUrl: './agregar-servicio.page.html',
  styleUrls: ['./agregar-servicio.page.scss'],
})
export class AgregarServicioPage implements OnInit {
  servicio: Servicio;
  grupos : Grupo[];
  grupo : Grupo;

  constructor(
    private auth: AuthService,
    public alertController: AlertController,
    private firestoreService: ServiciosService,
    private router: Router,
    private  toastr : ToastController,
    private loadingCtrl : LoadingController
  ) { 
    this.servicio= {
      servicio : "",
      precio : 0,
      observacion: "",
      grupo : "",
      id : ""
    } 
  }
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

  async guardarServicio(){
   
    if(this.servicio.grupo != '' && this.servicio.servicio != '' && this.servicio.precio != 0 )
    {
      const loading = await  this.loadingCtrl.create({
        message: 'Procesando...',
        spinner : 'crescent',
        showBackdrop: true
      });
      loading.present();
      
      if(this.servicio.id)
      {
        this.firestoreService.actualizar('servicio', this.servicio.id, this.servicio);
      } else
      {
        console.log("***************************************")
        //this.reserva.horario = new Date().toDateString();
        this.firestoreService.insertar("servicio", this.servicio)
      }
      loading.dismiss();
      this.toast('La reserva se ha guardado exitosamente.', 'success');
      this.servicio = {
        servicio : "",
      precio : 0,
      observacion: "",
      grupo : "",
      id : ""
    
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


  ngOnInit() {
    this.getGrupo();
  }
  principal()
  {
    this.router.navigate(['./home']);
  }

}
