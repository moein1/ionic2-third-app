import { Component } from '@angular/core';
import { NgForm } from "@angular/forms";
import {ModalController,LoadingController} from 'ionic-angular';
import { SetLocationPage } from "../set-location/set-location";
import {Location} from '../../models/location';
import {Geolocation} from 'ionic-native';

@Component({
    selector: 'page-add-place',
    templateUrl: 'add-place.html'
})

export class AddPlacePage {
    location : Location = {
        lat: 40.7624324,
        lng:-70.9759827
    };

    loctionIsSet : boolean = false;
    constructor(private modalCtrl : ModalController,
                private loadingCtrl : LoadingController){}
    onSubmit(form: NgForm) {
        console.log(form.value);
    }

    onOpenMap(){
        const modal = this.modalCtrl.create(SetLocationPage,{location:this.location,isSet : this.loctionIsSet});
        modal.present();
        modal.onDidDismiss(
            data=>{
                if(data){
                    this.location = data.location;
                    this.loctionIsSet = true;
                }
            }
        )
    }

    onLocate(){
        var loading = this.loadingCtrl.create({
            content:'Please Wait...'
        });
        loading.present();
        Geolocation.getCurrentPosition().
        then(location=>{
            loading.dismiss();
            console.log(location);
            this.location.lat = location.coords.latitude;
            this.location.lng = location.coords.longitude;
            this.loctionIsSet = true;
        }).
        catch(
            error=>{
                loading.dismiss();
                console.log(error);
            }
        );
    }
}

