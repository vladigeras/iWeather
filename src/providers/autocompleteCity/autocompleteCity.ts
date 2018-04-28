import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AutoCompleteService} from "ionic2-auto-complete";
import 'rxjs/add/operator/map';

@Injectable()
export class AutoCompleteCityProvider implements AutoCompleteService {

  private searchUrl;
  labelAttribute: string;

  constructor(public http: HttpClient) {
    this.searchUrl = "http://autocomplete.wunderground.com/aq?query=";
  }

  public getResults(keyword: string): any {
    let results = [];
    this.http.jsonp(this.searchUrl + keyword, "cb").subscribe((data: any) => {
      data.RESULTS.forEach(o => results.push(o.name))
    });
    return results;
  };

}
