import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class WeatherProvider {

  private apiKey = "a4baadd754044b21";
  private weatherUrl;

  constructor(public http: HttpClient) {
    this.weatherUrl = "http://api.wunderground.com/api/" +this.apiKey+ "/conditions/q/";
  }

  getWeather(city: string) {
    return this.http.get(this.weatherUrl + city + ".json");
  }
}
