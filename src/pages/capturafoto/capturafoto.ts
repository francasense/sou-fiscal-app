import { Component } from '@angular/core';
import { Camera } from "@ionic-native/camera";
 
// Carregando nosso service que vai se comunicar com a API
import { AuthProvider } from "../../providers/auth/auth";
import { NavController } from "ionic-angular";

@Component({
  selector: 'page-capturafoto',
  templateUrl: 'capturafoto.html',
  providers: [AuthProvider]
})
export class CapturafotoPage {
  // Cricando nossa variavel que vai armazenar as fotos
  public photos: any;
  imageTEMP = '';
  passarFoto = '';

  constructor(public navCtrl: NavController,public homeService: AuthProvider,private camera : Camera) {
    // Chama a listagem de fotos quando a página é carregada
  }
 
  // Chama o service para montar a listagem de fotos
  loadHome(){
    console.log('hey');
    this.homeService.load()
    .then(data => {
      this.photos = data[0];
      this.imageTEMP = this.photos.photo.url;
      this.passarFoto = this.imageTEMP;
      //alert("FOTOS"+this.passarFoto);
      this.homeService.receberlink(this.passarFoto);
      console.log(data);
      this.photos = data;
    });
  }
 
  // Chama o service para adicionar uma nova foto
  addPhotoHome(photo){
    console.log('hey 2');
    this.homeService.addPhoto(photo)
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
   this.camera.getPicture({
       destinationType: this.camera.DestinationType.DATA_URL,
       targetWidth: 1000,
       targetHeight: 1000
   }).then((imageData) => {
       this.addPhotoHome("data:image/jpeg;base64," + imageData);
   }, (err) => {
       console.log(err);
   });
  }
 
}