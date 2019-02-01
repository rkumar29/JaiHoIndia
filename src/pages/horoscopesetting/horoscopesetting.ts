import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HoroscopePage } from '../horoscope/horoscope';
import { DashboardPage } from '../dashboard/dashboard';
import { ItagStorage } from '../../itags/ItageStorage';
import { Storage } from '@ionic/storage';
import { Utils } from '../../itags/Utils';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { Network } from '@ionic-native/network';

/**
 * Generated class for the HoroscopesettingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage() 
@Component({
  selector: 'page-horoscopesetting',
  templateUrl: 'horoscopesetting.html',
})
export class HoroscopesettingPage {

  user_id: any;
  Tag: any = "HSetting";
  zodicSign: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, private network: Network, public toastCtrl: ToastController,
    public service: CommonServicesProvider, private utils: Utils) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HoroscopeSettingPage');
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter HoroscopeSettingPage');
    this.storage.get(ItagStorage.user_id).then((val) => {
      this.user_id = val;
      this.getZodicSign();
    });

  }
  getZodicSign() {

    console.log("vedio Player", "Params : prince");

    let reqBody = {
      "action": "getAllSign",
      "user_id": this.user_id,
    };



    console.log(this.Tag, "Params : " + JSON.stringify(reqBody));
    this.service.getRatingList(reqBody).subscribe(res => {
      console.log(this.Tag, JSON.stringify(res));
      if (res.status == 1) {
        this.zodicSign = res.data;
      console.log(JSON.stringify(this.zodicSign));
      } else {
        console.log(res.message);
      }
      console.log(res.message);
  

    }, err => {
      console.log("Error in response====>" + err);
    });
  }

  horoscopesetting() {
    this.navCtrl.push(HoroscopesettingPage);
  }
  horoscope() {
    this.navCtrl.push(HoroscopePage);
  }
  dashboard() {
    this.navCtrl.push(DashboardPage);
  }
  selectHoro(value: any) {
    console.log(value);
    this.storage.set(ItagStorage.last_zoadic_sign, value.zodiac_sign_id).then(()=>{
      this.navCtrl.pop();

    });

  }
}
