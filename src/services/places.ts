import { Injectable } from "@angular/core";
import { File, Entry, FileError, FileEntry } from "@ionic-native/file";

import { Place } from "../model/place";
import { Location } from "../model/location";
import { Storage } from  "@ionic/storage";

declare var cordova: any;

@Injectable()
export class PlacesService {
  private places: Place[] = [];

  constructor(private storage: Storage){}

  addPlace(
          title: string,
           description: string,
           location: Location,
          valorObra: string,
           imageUrl: string) {
             const place = new Place(title,description,location,valorObra,imageUrl);
    this.places.push(place);
    this.storage.set('places', this.places)
      .then()
      .catch(
        err => {
          this.places.splice(this.places.indexOf(place), 1);
        }
      );
  }

  loadPlaces() {
    return this.places.slice();
  }


  fetchPlaces() {
    return this.storage.get('places')
      .then(
        (places: Place[]) => {
          this.places = places != null ? places : [];
          return this.places;
        }
      )
      .catch(
        err => console.log(err)
      );
  }

    deletePlace(index: number) {
    const place = this.places[index];
    this.places.splice(index, 1);
    this.storage.set('places', this.places)
      .then(
        () => {
          this.removeFile(place);
        }
      )
      .catch(
        err => console.log(err)
      );
  }



  private removeFile(place: Place) {
    const currentName = place.imageUrl.replace(/^.*[\\\/]/, '');
    cordova.removeFile(cordova.file.dataDirectory.currentName)
      .then(
        () => console.log('Removed File')
      )
      .catch(
        () => {
          console.log('Error while removing File');
          this.addPlace(place.title, place.description, place.location,place.valorObra, place.imageUrl);
        }
      );
  }
}