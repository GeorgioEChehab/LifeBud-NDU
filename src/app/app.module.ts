import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { IonicStorageModule } from '@ionic/storage-angular';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';


@NgModule({
  declarations: [AppComponent, ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
            IonicStorageModule.forRoot({
              name: 'mydatabase'
            }),],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, LocalNotifications],
  bootstrap: [AppComponent],
})
export class AppModule {}
