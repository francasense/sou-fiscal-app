import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ModalController, AlertController } from 'ionic-angular';
import { HomeService } from "../../providers/home-service/home-service";
import { Http, Response, Headers, RequestOptions, } from '@angular/http';
import { AuthProvider } from "../../providers/auth/auth";
import { Location } from "../../model/location"
import { File, Entry, FileError, FileEntry } from "@ionic-native/file";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { PlacesService } from "../../services/places";
import { NgForm } from "@angular/forms/forms";
import { LocalizacaoPage } from "../localizacao/localizacao";
import { RestProvider } from "../../providers/rest/rest";
import {Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { CapturafotoPage } from "../capturafoto/capturafoto";
import { first } from "rxjs/operator/first";

//declare var dados: any;
@Component({
  selector: 'page-addreclamacao',
  templateUrl: 'addreclamacao.html',
    providers: [HomeService]
})
export class AddreclamacaoPage {

  
  obj: any;

  toKEN = this.authProvider.tk;
  postTitle: any;
  desc: any;
  imageChosen: any = 0;
  imagePath: any;
  imageNewPath: any;
  public photos: any;
  locationIsSet = false;

ultimoId = '';
 imageUrl = '';
 imageTEMP = '';
 passarFoto = '';
 novaUrl = '';
  location: Location = {
    lat: -7.170965,
    lng: -34.868418
  };
today

  constructor(
    private modalCtrl: ModalController,
    public http: Http,
    public navCtrl: NavController,
 
    public homeService: HomeService,
    public geolocation: Geolocation,
    public rest: RestProvider,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private transfer: FileTransfer,
    private placesService: PlacesService,
    private file: File,
    public alertCtrl: AlertController,
    public authProvider: AuthProvider,
    //public capturafoto: CapturafotoPage,
       private camera : Camera,
    public navParams: NavParams) {

        //this.loadHome();

    this.today = new Date().toISOString();
   // console.log(this.today);

  }


  onOpenMap(){
    const modal = this.modalCtrl.create(LocalizacaoPage, 
    {location: this.location,
    isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
data => {
    if (data) {
      this.location = data.location;
      this.locationIsSet = true;
    }
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
      this.locationIsSet = true;
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

  loadHome(){
    console.log('hey');
    this.authProvider.getphotos()
    .then(data => {
      this.photos = data[0];
      this.imageTEMP = this.photos.photo.url;
      this.passarFoto = this.imageTEMP;
      //alert("FOTOS"+this.imageTEMP);
      this.authProvider.receberlink(this.passarFoto);
      this.photos = data;
    });
  }

  // Chama o service para adicionar uma nova foto
  addPhotoHome(photo){
 

    //console.log('hey 2');
    this.authProvider.addPhoto(photo)
    .then(data => {
      this.loadHome();
    });
  }

  doRefresh(refresher){
    setTimeout(() => {
      this.loadHome();
      refresher.complete();
    }, 2000);
  }

  // Abre o serviço de fotos e depois chama o service para passar a foto que tiramos para a API
  takePicture(){
    const loader = this.loadingCtrl.create({
  content: 'Aguarde a imagem ser processada!'
});
loader.present();

   this.camera.getPicture({
       destinationType: this.camera.DestinationType.DATA_URL,
       targetWidth: 1000,
       targetHeight: 1000
   }).then((imageData) => {
       this.addPhotoHome("data:image/jpeg;base64," + imageData);

       loader.dismiss();
       
   }, (err) => {
      
        const toast = this.toastCtrl.create({
          message: 'Verifique sua conexão! ',
          duration: 3000
        });
        toast.present();
       console.log(err);
   });
  }
//MAPAS E CONTEUDO GERAL
 onSubmit(form: NgForm) {
  
    //this.placesService
      //.addPlace(form.value.title, form.value.description, this.location, form.value.valorObra, this.imageUrl)

        var dados = {
       "name": form.value.title,
        "detail": form.value.description,
        "initial_value": form.value.valorObra,
        "delivery_forecast":form.value.dada_termino,
    	  "initial_date": form.value.data_inicial,
        "latitude": this.location.lat,
        "longitude": this.location.lng,
        "contract": this.passarFoto,
        "user_id": 1,
        "status": "v"
  };
    form.reset();
    this.location = {
    lat: -7.170965,
    lng: -34.868418
    };
    this.imageUrl = '';
    this.locationIsSet = false;
//console.log(dados.initial_date);
      this.authProvider.inserir_reclamacao(dados);
      this.passarFoto ='';
      
  }
  ionViewDidLoad() {
    //this.passarFoto = this.authProvider.imageTEMP;
  }
}
