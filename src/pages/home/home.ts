import {Component} from '@angular/core';
import {LoadingController, NavController} from 'ionic-angular';
import {WeatherProvider} from "../../providers/weather/weather";
import {Storage} from "@ionic/storage";
import {storageSettingLocationKey, storageSettingPropertiesKey} from "../../app/constants";
import {ToastProvider} from "../../providers/toast/toast";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weather: any;

  location: {
    city: string,
  };

  properties: {
    celsius: boolean,
    fahrenheit: boolean,
    coordinates: boolean,
    wind: boolean,
    localtime: boolean,
    dewpoint: boolean,
    visibility: boolean,
    heatIndex: boolean
  };

  constructor(public navCtrl: NavController,
              private weatherProvider: WeatherProvider,
              private storage: Storage,
              private loadingCtrl: LoadingController,
              private toastProvider: ToastProvider) {
  }

  ionViewWillEnter() {
    this.readLocation();
    this.readProperties();
  }

  readLocation() {
    this.storage.get(storageSettingLocationKey).then(location => {
      if (location) {
        this.location = JSON.parse(location);
      } else {

      }

      let loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present();
      this.weatherProvider.getWeather(this.location.city).subscribe(
        (weather: any) => {
        this.weather = weather.current_observation;
        loading.dismiss();
      },
        error => {
          this.toastProvider.showToast("There are some error... Try again later, please!", 5000);
          loading.dismiss();
        })
    });
  }

  readProperties() {
    this.storage.get(storageSettingPropertiesKey).then(properties => {
      if (properties) {
        this.properties = JSON.parse(properties);
      } else {
        this.properties = {
          celsius: true,
          fahrenheit: false,
          coordinates: false,
          wind: false,
          localtime: false,
          dewpoint: false,
          visibility: false,
          heatIndex: false
        }
      }
    })
  }
}
