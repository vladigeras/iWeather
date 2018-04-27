import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherProvider {

  apiKey = "a4baadd754044b21";
  url;

  constructor(public http: HttpClient) {
    this.url = "http://api.wunderground.com/api/" +this.apiKey+ "/conditions/q/"
  }

  getWeather(city, state) {
    return this.http.get(this.url + state + "/" + city + ".json");
  }
}
