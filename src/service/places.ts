import { Place } from "../models/place";
import { Location } from '../models/location';
import { Injectable } from '@angular/core';
import { File } from 'ionic-native';

import { Storage } from '@ionic/storage';

declare var cordova: any;

//we need injectable beacuse we want to use Storage service inside the place service
@Injectable()
export class PlacesService {
    private places: Place[] = [];

    constructor(private storage: Storage) { }

    addPlace(title: string, description: string, location: Location, imageUrl: string) {
        const place = new Place(title, description, location, imageUrl);
        this.places.push(place);
        this.storage.set('places ', this.places).
            then().
            catch(
            err => {
                this.places.splice(this.places.indexOf(place), 1);
            }
            );
    };

    loadPlaces() {
        return this.places.slice();
    }

    deletePlace(index: number) {
        const place = this.places[index];
        this.places.splice(index, 1);
        this.storage.set('places', this.places).
            then(
            () => {
                this.remoteFile(place);
            }
            ).
            catch(
            error => {
                console.log(error);
            }
            );
    };

    private remoteFile(place: Place) {
        const currentName = place.imagePath.replace(/^.*[\\\/]/, '');
        File.removeFile(cordova.file.dataDirectory, currentName).
            then(
            () => console.log('Remove file')
            ).
            catch(
            error => {
                console.log(error, 'While removing file');
                //If by some reason we can not delete file from storage we should add to the current place again
                //and show for user to try to do it again
                this.addPlace(place.title, place.description, place.location, place.imagePath);
            }
            );
    }

    fetchPlaces() {
      return  this.storage.get('places').
            then(
            (places: Place[]) => {
                this.places = places ? places : [];
                return this.places.slice();
            }
            ).catch(
            error => {

            }
            )
    }
}