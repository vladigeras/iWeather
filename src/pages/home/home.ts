import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {WeatherProvider} from "../../providers/weather/weather";
import {Storage} from "@ionic/storage";
import {storageSettingLocationKey, storageSettingPropertiesKey} from "../../app/constants";

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
              private storage: Storage) {
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

      this.weatherProvider.getWeather(this.location.city, this.location.state).subscribe((weather: any) => {
        this.weather = weather.current_observation;
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
