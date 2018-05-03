import {Component} from '@angular/core';
import {LoadingController, NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {storageSettingLocationKey, storageSettingPropertiesKey} from "../../app/constants";
import {ToastProvider} from "../../providers/toast/toast";
import {AutoCompleteCityProvider} from "../../providers/autocompleteCity/autocompleteCity";
import {WeatherProvider} from "../../providers/weather/weather";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  city: string;

  geolocation: {
    latitude: number,
    longitude: number
  };

  isDiplayCelsiusData: boolean;
  isDiplayFahrenheitData: boolean;
  isDisplayCoordinates: boolean;
  isDisplayWindData: boolean;
  isDisplayLocalTime: boolean;
  isDisplayDewpoint: boolean;
  isDisplayVisibility: boolean;
  isDisplayHeatIndex: boolean;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private storage: Storage,
              private toastProvider: ToastProvider,
              public autocompleteCityProvider: AutoCompleteCityProvider,
              private weatherProvider: WeatherProvider,
              private loadingCtrl: LoadingController) {
  }

  ionViewWillEnter() {
    this.readLocation();
    this.readProperties();
  }

  saveSettings() {
    this.saveLocation();
    this.saveProperties();
    this.toastProvider.showToast("Saved", 1000);
    // this.navCtrl.parent.select(TabsPage.getIndexOfTabByPrototype(HomePage.prototype));
  }

  saveLocation() {
    let location = {
      city: this.city,
    };
    this.storage.set(storageSettingLocationKey, JSON.stringify(location));
  }

  saveProperties() {
    let properties = {
      celsius: this.isDiplayCelsiusData,
      fahrenheit: this.isDiplayFahrenheitData,
      coordinates: this.isDisplayCoordinates,
      wind: this.isDisplayWindData,
      localtime: this.isDisplayLocalTime,
      dewpoint: this.isDisplayDewpoint,
      visibility: this.isDisplayVisibility,
      heatIndex: this.isDisplayHeatIndex
    };
    this.storage.set(storageSettingPropertiesKey, JSON.stringify(properties));
  }

  readLocation() {
    this.storage.get(storageSettingLocationKey).then(value => {
      if (value) {
        let location = JSON.parse(value);
        this.city = location.city;
      }
      else {
        let loading = this.loadingCtrl.create({
          content: 'Please wait...'
        });
        loading.present();

        this.weatherProvider.getCurrentCityByGeolocation().subscribe(
          (data: any) => {
            this.city = data.location.city + ", " + data.location.country_name;
            this.geolocation = {
              latitude: data.location.lat,
              longitude: data.location.lon
            };
            loading.dismiss();
          },
          error => {
            this.toastProvider.showToast("There are some error... Try again later, please!", 3000);
            loading.dismiss();
          }
        );
      }
    });
  }

  readProperties() {
    this.storage.get(storageSettingPropertiesKey).then(value => {
      if (value) {
        let properties = JSON.parse(value);
        this.isDiplayCelsiusData = properties.celsius;
        this.isDiplayFahrenheitData = properties.fahrenheit;
        this.isDisplayCoordinates = properties.coordinates;
        this.isDisplayWindData = properties.wind;
        this.isDisplayLocalTime = properties.localtime;
        this.isDisplayDewpoint = properties.dewpoint;
        this.isDisplayVisibility = properties.visibility;
        this.isDisplayHeatIndex = properties.heatIndex;
      } else {
        this.isDiplayCelsiusData = true;
        this.isDiplayFahrenheitData = false;
        this.isDisplayCoordinates = false;
        this.isDisplayWindData = false;
        this.isDisplayLocalTime = false;
        this.isDisplayDewpoint = false;
        this.isDisplayVisibility = false;
        this.isDisplayHeatIndex = false;
      }
    })
  }
}
