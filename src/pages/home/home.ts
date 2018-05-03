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
  loading;

  weather: any;

  location: {
    city: string,
  };

  geolocation: {
    latitude: number,
    longitude: number
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
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this.readLocation();
    this.readProperties();
  }

  readLocation() {
    this.storage.get(storageSettingLocationKey).then(location => {

      if (location) {
        this.location = JSON.parse(location);
        this.loading.present();
        this.getWeather();

      } else {

        this.loading.present();
        this.weatherProvider.getCurrentCityByGeolocation().subscribe(
          (data: any) => {
            this.location = {city: data.location.city + ", " + data.location.country_name};
            this.geolocation = {
              latitude: data.location.lat,
              longitude: data.location.lon
            };
            this.getWeather();
          },
          error => {
            this.toastProvider.showToast("There are some error... Try again later, please!", 3000);
            this.loading.dismiss();
          })
      }
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

  getWeather() {
    this.weatherProvider.getWeather(this.location.city).subscribe(
      (weather: any) => {
        this.weather = weather.current_observation;
        this.loading.dismiss();
      },
      error => {
        this.toastProvider.showToast("There are some error... Try again later, please!", 3000);
        this.loading.dismiss();
      })
  }
}
