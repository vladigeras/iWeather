import {Injectable} from '@angular/core';
import {LoadingController} from "ionic-angular";

@Injectable()
export class LoadingProvider {

  loading;

  constructor(private loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
  }

  public startLoading() {
    this.loading.present();
  }

  public stopLoading() {
    this.loading.dismiss();
  }
}
