import { Component } from '@angular/core';
import { Location } from '../../models/location';
import { NavParams, ViewController } from "ionic-angular";

@Component({
    selector: 'page-set-location',
    templateUrl: 'set-location.html'
})

export class SetLocationPage {
    location: Location;
    marker: Location;
    constructor(private navParams: NavParams,
                private viewCtrl : ViewController) {
        console.log(this.navParams.get('location'));
        this.location = this.navParams.get('location');
        //We can set the marker if we have been set the location one time before
        if(this.navParams.get('isSet')){
            this.marker = this.location;
        }
    }

    onSetMarker(event: any) {
        console.log(event);
        this.marker = new Location(event.coords.lat, event.coords.lng)
    }

    onConfirm(){
        this.viewCtrl.dismiss({
            location:this.marker
        });
    }

    onAbort(){
        this.viewCtrl.dismiss();
    }
}