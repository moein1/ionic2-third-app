import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ModalController, LoadingController, ToastController } from 'ionic-angular';
import { SetLocationPage } from "../set-location/set-location";
import { Location } from '../../models/location';
import { Geolocation, Camera } from 'ionic-native';
import { PlacesService } from "../../service/places";

@Component({
    selector: 'page-add-place',
    templateUrl: 'add-place.html'
})

export class AddPlacePage {
    location: Location = {
        lat: 40.7624324,
        lng: -70.9759827
    };
    imageUrl: string = '';

    loctionIsSet: boolean = false;
    constructor(private modalCtrl: ModalController,
        private loadingCtrl: LoadingController,
        private toastCtrl: ToastController,
        private placeService: PlacesService) { }
    onSubmit(form: NgForm) {
        this.placeService.
            addPlace(form.value.title,
            form.value.description,
            this.location,
            this.imageUrl
            );
        form.reset();
        this.location = {
            lat: 40.7624324,
            lng: -70.9759827
        };
        this.imageUrl = '';
        this.loctionIsSet = false;
    }

    onOpenMap() {
        const modal = this.modalCtrl.create(SetLocationPage, { location: this.location, isSet: this.loctionIsSet });
        modal.present();
        modal.onDidDismiss(
            data => {
                if (data) {
                    this.location = data.location;
                    this.loctionIsSet = true;
                }
            }
        )
    }

    onLocate() {
        var loading = this.loadingCtrl.create({
            content: 'Getting your location...'
        });
        loading.present();
        Geolocation.getCurrentPosition().
            then(location => {
                loading.dismiss();
                this.location.lat = location.coords.latitude;
                this.location.lng = location.coords.longitude;
                this.loctionIsSet = true;
            }).
            catch(
            error => {
                loading.dismiss();
                const toast = this.toastCtrl.create({
                    message: 'Could it location , please pich it up manually',
                    duration: 2500
                });
                toast.present();
            }
            );
    };

    onTakePhoto() {
        Camera.getPicture({
            encodingType: Camera.EncodingType.JPEG,
            correctOrientation: true
        }).
            then(imageData => {
                console.log(imageData);
                this.imageUrl = imageData;
            }).
            catch(error => {
                console.log(error);
            })
    }
}

