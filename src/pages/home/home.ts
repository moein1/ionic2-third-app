import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { AddPlacePage } from "../add-place/add-place";
import { Place } from "../../models/place";
import { PlacesService } from "../../service/places";
import { PlacePage } from "../place/place";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  places: Place[] = [];

  addPlacePage = AddPlacePage;

  constructor(public modalCtrl: ModalController,
    private placeService: PlacesService) {

  }

  ionViewWillEnter() {
    this.places = this.placeService.loadPlaces();
  }

  onOpenPlace(place: Place,index : number) {
    const modal = this.modalCtrl.create(PlacePage, { place: place,index: index });
    modal.present();
  }

}
