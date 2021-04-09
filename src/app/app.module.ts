import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import{FormsModule} from '@angular/forms';

//FIREBASE
import {AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { AngularFireAuthModule} from '@angular/fire/auth';
import { AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule  } from "@angular/fire/database";


//ENVIROMENT
import { environment } from '../environments/environment.prod';

//AUTH
import {AuthService} from './services/auth.service';

//AUTH GUARD
import {AuthGuard} from './guards/auth.guard';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [
    AuthService,
    AuthGuard,
    AngularFireAuthModule,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
