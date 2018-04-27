import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WeatherProvider} from "../../providers/weather/weather";
import {Storage} from "@ionic/storage";
import {storageSettingLocationKey, storageSettingPropertiesKey} from "../../app/constants";
import {LoadingProvider} from "../../providers/loading/loading";
import {ToastProvider} from "../../providers/toast/toast";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weather: any;

  location: {
    city: string,
    state: string
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
              private loadingProvider: LoadingProvider,
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

      this.loadingProvider.startLoading();
      this.weatherProvider.getWeather(this.location.city, this.location.state).subscribe(
        (weather: any) => {
        this.weather = weather.current_observation;
        this.loadingProvider.stopLoading();
      },
        error => {
          this.toastProvider.showToast("There are some error... Try again later, please!", 5000);
          this.loadingProvider.stopLoading();
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
