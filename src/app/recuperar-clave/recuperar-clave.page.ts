import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.page.html',
  styleUrls: ['./recuperar-clave.page.scss'],
})
export class RecuperarClavePage implements OnInit {

  public email: string;
  constructor(
    private auth: AuthService,
    private toastr: ToastController,
    private loadingCtrl : LoadingController
  ) { }

  ngOnInit() {
  }
  async resetear(){
    if(this.email)
    {
      const loading = await  this.loadingCtrl.create({
        message: 'Procesando...',
        spinner : 'crescent',
        showBackdrop: true
      });
      loading.present();

      this.auth.resetear(this.email)
      .then((data)=>
        {
          loading.dismiss();
          this.toast("Correo de Recuperacion enviado", "success");


        })
        .catch(error =>{
          loading.dismiss();
          this.toast(error.message, 'danger');
        } )
    }else{
      this.toast('Por favor, Complete el formulario!', 'warning');
    }
  }
  async toast(message, status)
  {
    const toast = await this.toastr.create(
      {
        message: message,
        color: status,
        position :'top',
        duration: 500
      }
    );
    toast.present();
  }

}
