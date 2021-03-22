import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit
 {

  nombre : string;
  email: string;
  documento: string;
  telefono: string;
  direccion : string;
  password: string;


  constructor(
    private afs: AngularFirestore,
    private afauth : AngularFireAuth,
    private router : Router,
    private loadingCtrl : LoadingController,
    private  toastr : ToastController

  ) { }

  ngOnInit() {
  }
  async registro(){
    if(this.nombre && this.email && this.documento && this.telefono && this.direccion && this.password)
    {
      const loading = await  this.loadingCtrl.create({
        message: 'Procesando...',
        spinner : 'crescent',
        showBackdrop: true
      });
      loading.present();

      this.afauth.createUserWithEmailAndPassword(this.email, this.password)
      .then((data)=>
        {
          data.user.sendEmailVerification();
          this.afs.collection('user').doc(data.user.uid).set({
            'userId':data.user.uid,
            'userNombre': this.nombre,
            'userEmail': this.email,
            'userDocumento' : this.documento,
            'userTelefono' : this.telefono,
            'userDireccion' : this.direccion,
            'createdAt': Date.now()
          })
          
          .then(()=>{
            loading.dismiss();
            this.toast("Exito al registrarse! Por favor verifique su correo electronico", "success");
            this.router.navigate(["/login"]);

          })
          .catch(error =>{
            loading.dismiss();
            this.toast(error.message, 'danger');
            console.log(error);
          })

        })
        .catch(error =>{
          loading.dismiss();
          this.toast(error.message, 'danger');
        } )
    }else{
      this.toast('Pro favor, Complete el formulario!', 'warning');
    }

  }// Fin del Registro

   async toast(message, status){
    const toast = await this.toastr.create({
      message:message,
      color: status,
      position: 'top',
      duration: 1000

    });
    toast.present();
   }//fin del toast
}
