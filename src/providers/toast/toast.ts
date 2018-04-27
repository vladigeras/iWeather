import {Injectable} from '@angular/core';
import {ToastController} from "ionic-angular";

@Injectable()
export class ToastProvider {

  toast;

  constructor(private toastCtrl: ToastController) {}

  public showToast(text, time) {
    this.toast = this.toastCtrl.create({
      message: text,
      duration: time,
      position: 'bottom'
    });

    this.toast.present();
  }

}
