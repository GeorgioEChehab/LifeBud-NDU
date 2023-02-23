import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { Drivers } from '@ionic/storage';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';

import { Network } from '@ionic-native/network/ngx';


const firebaseConfig = {
  apiKey: "AIzaSyCUSURH-_st2IDzWUhyFwI07-RgwuM-YMg",
  authDomain: "lifebud-a4764.firebaseapp.com",
  databaseURL: "https://lifebud-a4764-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "lifebud-a4764",
  storageBucket: "lifebud-a4764.appspot.com",
  messagingSenderId: "595887926180",
  appId: "1:595887926180:web:7940a108a258dd3d1fef31",
  measurementId: "G-ZWJP6NJYHL"
};


@NgModule({
  declarations: [AppComponent, ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
            AngularFireModule.initializeApp(firebaseConfig),
            AngularFireAuthModule,
            IonicStorageModule.forRoot({
              name: 'mydatabase',
              driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
            }),],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, LocalNotifications, Network],
  bootstrap: [AppComponent],
})
export class AppModule {}
