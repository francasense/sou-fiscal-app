import { Component } from '@angular/core';
import { NavController, ActionSheetController, LoadingController, AlertController } from 'ionic-angular';
import { MreclamacoesPage } from '../mreclamacoes/mreclamacoes';
import { GeralreclamacoesPage } from "../geralreclamacoes/geralreclamacoes";
import { AddreclamacaoPage } from "../addreclamacao/addreclamacao";
import { ComoajudarPage } from "../comoajudar/comoajudar";

import {AuthProvider} from "../../providers/auth/auth";
import { MreclamacoesmapPage } from "../mreclamacoesmap/mreclamacoesmap";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  //isAuthenticated = false;
  constructor(
    public navCtrl: NavController, 
    private readonly authProvider: AuthProvider,
    private loadingCtrl: LoadingController,
                  public alertCtrl: AlertController,

            ) {

   // this.isAuthenticated = this.authProvider.anonimo;
    //console.log(this.isAuthenticated);
}
  AddReclamacoes() {
    //    this.navCtrl.push(CapturafotoPage);

    this.navCtrl.push(AddreclamacaoPage);
  }
  

MReclamacoes(){
  if (this.authProvider.anonimo){
        console.log("home",this.authProvider.anonimo);

    this.navCtrl.push(MreclamacoesPage);
  }else{
    let alert = this.alertCtrl.create({
              title: 'ATENÇÃO!',
              subTitle: 'Sessão aberta apenas para usuarios cadastrados!',
              buttons: ['OK']
              });
              alert.present();
  }
  
}

  MReclamacoesG(){
        this.navCtrl.push(MreclamacoesPage);
  }
   GeralReclamacoes(){
    this.navCtrl.push(GeralreclamacoesPage);
  }
   ComoAjudar(){
    this.navCtrl.push(ComoajudarPage);
  }
  
  logout() {
    this.authProvider.logout();
  }


}
