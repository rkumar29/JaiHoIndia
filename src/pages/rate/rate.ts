import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the RatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rate',
  templateUrl: 'rate.html',
})
export class RatePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }
 
  ionViewDidLoad() {
    console.log('ionViewDidLoad RatePage');
  }
  settings() {
    this.navCtrl.pop();
  }
  closeit(){
    this.navCtrl.pop();
  }

}
