import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore} from '@angular/fire/firestore';
import * as firebase from 'firebase';
import {Router } from '@angular/router';
import { LoadingController, ToastController} from '@ionic/angular';
import { Observable, of } from 'rxjs';

import {switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  user$: Observable<User>;
  user: User;

  constructor( 
    private afs: AngularFirestore,
    private afauth: AngularFireAuth,
    private router : Router,
    private loadingCtrl : LoadingController,
    private toastr: ToastController) 
  {

    this.user$ = this.afauth.authState
    .pipe(
      switchMap(user =>{

        if(user)
        {
          return this.afs.doc<User>(`user/${user.uid}`).valueChanges();
        }else{
          return of(null);
        }
      })
    )
  }
  
  
  // fin del constructor

  async signIn(email, password){
    const loading = await this.loadingCtrl.create(
      {
        message: 'Autenticando...',
        spinner : 'crescent' , 
        showBackdrop: true
      });

      loading.present();
      this.afauth.setPersistence(firebase.default.auth.Auth.Persistence.LOCAL)
      .then(()=> {
        this.afauth.signInWithEmailAndPassword(email, password).then((data)=>
        {
          if(!data.user.emailVerified){
            loading.dismiss();
            this.toast('Verifique su correo electronico...', 'warning');
            loading.dismiss();
            this.afauth.signOut();
            
          }else{
            console.log(data);
            loading.dismiss();
            this.router.navigate(['/home']);// este es el home

          }
        })
        .catch(error =>{
          this.toast(error.message,'danger');

        })
      })
      .catch(error => {
        loading.dismiss();
        this.toast(error.message, 'danger');


      }) 


  } // FIN DEL sigIn

  async loginTest(email, password){
    const loading = await this.loadingCtrl.create(
      {
        message: 'Autenticando...',
        spinner : 'crescent' , 
        showBackdrop: true
      });
    this.afauth.signInWithEmailAndPassword(email, password).then((data)=>
        {
          if(!data.user.emailVerified){
            loading.dismiss();
            this.toast('Verifique su correo electronico...', 'warning');
            loading.dismiss();
            this.afauth.signOut();
            
          }else{
            console.log(data);
            loading.dismiss();
            this.router.navigate(['home']);// este es el home

          }
        })
        .catch(error =>{
          this.toast(error.message,'danger');

        })

  }

  async signOut()
  {
    const loading = await this.loadingCtrl.create({

      spinner: 'crescent',
      showBackdrop: true
    });
    loading.present();

    this.afauth.signOut()
    .then(()=>{
      loading.dismiss();
      this.router.navigate(['/login']);
    })
  }//Fin de signOut

  async toast(message, status)
  {
    const toast = await this.toastr.create({
      message: message,
      color: status,
      position: 'top',
      duration: 1000
    });
    toast.present();

  } //fin de toast


  resetear(email:string){
    return this.afauth.sendPasswordResetEmail(email);

  }
}
