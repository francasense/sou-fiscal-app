import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { Location } from "../../model/location"

/**
 * Generated class for the LocalizacaoPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-localizacao',
  templateUrl: 'localizacao.html',
})
export class LocalizacaoPage {
  location: Location;
  marker: Location;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams) {

    this.location = this.navParams.get('location');
    if(this.navParams.get('isSet')){
      this.marker = this.location;
    }
  }
  
  onSetMarker(event: any){
    //console.log(event);
    this.marker = new Location(event.coords.lat, event.coords.lng);
  }


  onConfirm(){
    this.viewCtrl.dismiss({location: this.marker});
  }
  
  onAbort(){
    this.viewCtrl.dismiss();
  }
}