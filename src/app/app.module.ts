import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpModule, Http, RequestOptions } from "@angular/http";

//pages
import { MreclamacoesmapPage } from "../pages/mreclamacoesmap/mreclamacoesmap";
import { MreclamacoesPage } from "../pages/mreclamacoes/mreclamacoes";
import { GeralreclamacoesmapPage } from "../pages/geralreclamacoesmap/geralreclamacoesmap";
import { GeralreclamacoesPage } from "../pages/geralreclamacoes/geralreclamacoes";
import { AddreclamacaoPage } from "../pages/addreclamacao/addreclamacao";
import { ComoajudarPage } from "../pages/comoajudar/comoajudar";
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from 'angular2-google-maps/core';
import { Location } from "../model/location";
import { Place } from "../model/place";
import { File } from '@ionic-native/file';
import { PlacesService } from "../services/places";
import { LocalizacaoPage } from "../pages/localizacao/localizacao";


import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { Camera  } from "@ionic-native/camera";



import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { HomeService } from '../providers/home-service/home-service';
import { RestProvider } from '../providers/rest/rest';
import { LatlngProvider } from '../providers/latlng/latlng';
import { AuthProvider } from '../providers/auth/auth';
import { JwtHelper, AuthConfig, AuthHttp} from "angular2-jwt";
import { Storage, IonicStorageModule} from "@ionic/storage";
import { LogarPage } from "../pages/logar/logar";
import { CadastrarPage } from "../pages/cadastrar/cadastrar";
import { UserService } from "../services/userservice";
import { CapturafotoPage } from "../pages/capturafoto/capturafoto";
import { QuemPage } from "../pages/quem/quem";
import { EquipePage } from "../pages/equipe/equipe";



export function authHttpServiceFactory(http: Http, options: RequestOptions, storage: Storage) {
  const authConfig = new AuthConfig({
    tokenGetter: (() => storage.get('jwt')),
  });
  return new AuthHttp(authConfig, http, options);
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddreclamacaoPage,
    LogarPage,
    CadastrarPage,
    MreclamacoesmapPage,
    LocalizacaoPage,
    CapturafotoPage,
    QuemPage,
    EquipePage,
    ComoajudarPage,
    MreclamacoesPage

  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
     IonicStorageModule.forRoot({
      name: 'myapp',
      driverOrder: ['sqlite', 'indexeddb', 'websql']
    }),
     AgmCoreModule.forRoot({
      apiKey: 'API-KEY'
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddreclamacaoPage,
    LogarPage,
    CadastrarPage,
    MreclamacoesmapPage,
    LocalizacaoPage,
    CapturafotoPage,
    QuemPage,
    EquipePage,
    ComoajudarPage,
    MreclamacoesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FileTransfer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    HomeService,
    File,
    Camera,
    UserService,
    RestProvider,
    LatlngProvider,
    AuthProvider,
    Geolocation,
    //Geolocation,
    PlacesService,
    JwtHelper, {
      provide: AuthHttp,
      useFactory: authHttpServiceFactory,
      deps: [Http, RequestOptions, Storage]
    }]

  
})
export class AppModule {}
