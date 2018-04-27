import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {HomePage} from "../home/home";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  city: string;
  state: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage) {

  }

  ionViewWillEnter() {
    this.storage.get("location").then(value => {
      if (value) {
        let location = JSON.parse(value);
        this.city = location.city;
        this.state = location.state;
      } else {

      }
    });
  }

  saveSettings() {
    this.saveLocation();
    this.navCtrl.push(HomePage);
  }

  saveLocation() {
    let location = {city: this.city, state: this.state};
    this.storage.set("location", JSON.stringify(location));
  }

}
