import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { QuemPage } from "../pages/quem/quem";
import { EquipePage } from "../pages/equipe/equipe";
import { LogarPage } from "../pages/logar/logar";
import { CadastrarPage } from "../pages/cadastrar/cadastrar";
import { ComoajudarPage } from "../pages/comoajudar/comoajudar";
import {AuthProvider} from "../providers/auth/auth";


@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  //rootPage:any = IntroPage;
  homePage:any = HomePage;
  rootPage:any = LogarPage;
  logarPage:any = LogarPage;
  cadastrarPage:any = CadastrarPage;
  quemPage: any = QuemPage;
  equipePage: any = EquipePage;
  comoajudarPage: any = ComoajudarPage;
  @ViewChild('nav') nav: NavController;

  isAuthenticated = false;
  constructor(platform: Platform, statusBar: StatusBar,
   splashScreen: SplashScreen,
   private menuCtrl: MenuController,
   private readonly authProvider: AuthProvider) {
   
      platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

    });
    
   this.authProvider.authUser.subscribe(jwt => {
      if (jwt) {
        //this.rootPage = HomePage;
        this.isAuthenticated = true;
      }
      else {
        //this.rootPage = LogarPage;
        this.isAuthenticated = false;
      }
    });

    this.authProvider.checkLogin();

this.authProvider.testea();

   }
  onLoad(page: any){
    //this.nav.setRoot(page);
    this.menuCtrl.close();
  }
     onLogout() {
    this.authProvider.logout();
    this.menuCtrl.close();
    this.nav.setRoot(LogarPage);
  }




home(){
      this.nav.setRoot(this.homePage);
      this.menuCtrl.close();
}
  cadastrar(){
    this.nav.setRoot(this.cadastrarPage);
    this.menuCtrl.close();
  }
  quem(){
      this.nav.setRoot(this.quemPage);
      this.menuCtrl.close();
}
  comoajudade(){
    this.nav.setRoot(this.comoajudarPage);
    this.menuCtrl.close();
  }
  equipe(){
      this.nav.setRoot(this.equipePage);
      this.menuCtrl.close();
}
  logar(){
    this.nav.setRoot(this.logarPage);
    this.menuCtrl.close();
  }
  //equipe //logar
}
