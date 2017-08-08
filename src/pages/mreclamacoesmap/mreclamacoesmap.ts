
import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, ToastController } from 'ionic-angular';
import { RestProvider } from "../../providers/rest/rest";
import { Geolocation } from '@ionic-native/geolocation';
import { Location } from "../../model/location";
import { AuthProvider } from "../../providers/auth/auth";
import { MreclamacoesPage } from "../mreclamacoes/mreclamacoes";

declare var google;

//@IonicPage()
@Component({
  selector: 'page-mreclamacoesmap',
  templateUrl: 'mreclamacoesmap.html',
})

export class MreclamacoesmapPage {
  imageTEMP: '';
  photos: any;

    public lista_filme = new Array<any>();
public lista_reclamacao = new Array<any>();

    location: Location = {
    lat: -7.170965,
    lng: -34.868418
  };
  marker: Location;

  countries: string[];
  errorMessage: string;
today
  
  constructor(private viewCtrl: ViewController,
  public navCtrl: NavController, public rest: RestProvider,
  private loadingCtrl: LoadingController,
  public geolocation: Geolocation,
  private toastCtrl: ToastController,
  private readonly authProvider: AuthProvider,
  private navParams: NavParams) {

    this.today = new Date().toISOString();
    //console.log(this.today);
  

  }

  ionViewDidLoad() {
    this.onLocate();
    this.gettts();
    //this.cap();
  }


  gettts(){
  
  this.authProvider.gettt().subscribe(
      data=>{
        const response = (data as any);
        //const objeto_retorno = JSON.parse(response._body);
        this.lista_reclamacao = response;
        //this.lista_reclamacao = data[0].email == 'francasense@mail.com';
        //console.log("RETORNO AQUI!",this.lista_reclamacao);
      },error => {
        //console.log(error);
      }
      );

     
}


    onLocate(){
const loader = this.loadingCtrl.create({
  content: 'Carregando sua localização'
});
loader.present();

    this.geolocation.getCurrentPosition().then(
      location => {
        loader.dismiss();
      this.location.lat = location.coords.latitude;
      this.location.lng = location.coords.longitude;
      //this.locationIsSet = true;
    })
    .catch(
      error =>{
        loader.dismiss();
        const toast = this.toastCtrl.create({
          message: 'Sem localização, por favor localizar manualmente! ',
          duration: 2500
        });
        toast.present();

    });
  }


  cap(){
  
  this.authProvider.capturar_id_usuario().subscribe(
      data=>{
        const response = (data as any);
        //const objeto_retorno = JSON.parse(response._body);
        //this.lista_reclamacao = response['email'].email;
        //this.lista_reclamacao = data[0].email == 'francasense@mail.com';
        console.log("RETORNO AQUI!",this.lista_reclamacao);
      },error => {
        //console.log(error);
      }
      );

     
}


 Reclamacoes() {
    //    this.navCtrl.push(CapturafotoPage);

    this.navCtrl.push(MreclamacoesPage);
  }
}

