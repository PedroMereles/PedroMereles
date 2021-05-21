import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-editar-perfil',
  templateUrl: './editar-perfil.page.html',
  styleUrls: ['./editar-perfil.page.scss'],
})
export class EditarPerfilPage implements OnInit 
{
  userId: string;
  nombre : string;
  email: string;
  documento: string;
  telefono: string;
  direccion : string;

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController,
    private toastr: ToastController,
    private router: Router
  ) { }

  ngOnInit() {
    this.auth.user$.subscribe(user=>{
      this.userId = user.userId;
      this.nombre = user.userNombre;
      this.email = user.userEmail;
      this.documento = user.userDocumento;
      this.direccion= user.userDireccion;
      this.telefono = user.userTelefono;
    })
  }
  async actualizarPerfil()
  {
    const loading = await this.loadingCtrl.create(
      {
        message: 'Actualizando...',
        spinner: 'crescent',
        showBackdrop: true
      });
      loading.present();
      this.afs.collection('user').doc(this.userId).set(
        {
          'userNombre' : this.nombre,
          'userEmail': this.email,
          'userDocumento' : this.documento,
          'userDireccion' : this.direccion,
          'userTelefono' : this.telefono,
          'editAt': Date.now()

        },
        {
          merge:true
        })
        .then(()=>{
          loading.dismiss();
          this.toast('Actualizacion correcta','success');
          this.router.navigate(['/perfil']);
        })
        .catch(error => {
          loading.dismiss();
          this.toast(error.message, 'danger');
        })

  }
  async toast(message, status)
  {
     const toast = await this.toastr.create({
       message: message,
       color: status,
       position: 'top',
       duration: 500
     });
     toast.present();
  }

  principal()
  {
      this.router.navigate(['../home']);
      
  }
}
