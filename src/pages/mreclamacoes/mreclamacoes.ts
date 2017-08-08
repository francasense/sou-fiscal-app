import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { MreclamacoesmapPage } from "../mreclamacoesmap/mreclamacoesmap";

@Component({
  selector: 'page-mreclamacoes',
  templateUrl: 'mreclamacoes.html',
})
export class MreclamacoesPage {

  public lista_reclamacao = new Array<any>();

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public authProvider: AuthProvider,
    ) {
      this.gettts();
  }

 gettts(){
  
  this.authProvider.gettt().subscribe(
      data=>{
        const response = (data as any);
        this.lista_reclamacao = response;
        //console.log(this.lista_reclamacao);
      },error => {
      }
      );
}
 ReclamacoesMap() {
    //    this.navCtrl.push(CapturafotoPage);

    this.navCtrl.push(MreclamacoesmapPage);
  }
}
