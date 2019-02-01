import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Utils } from '../../itags/Utils';
import { ItagStorage } from '../../itags/ItageStorage';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the TranslatePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const TAG: string = "Translate Page => ";

@IonicPage()
@Component({
  selector: 'page-translate',
  templateUrl: 'translate.html',
})
export class TranslatePage {


  userId: any;
  lastLanguage: any;

  selectHindi: string = "lang_box";
  seletcEnglish: string = "lang_box lang_box_active";

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private storage: Storage, private utils: Utils, private service: CommonServicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TranslatePage');

    this.storage.get(ItagStorage.user_id).then((res) => {
      this.userId = res;
    });

  }
  ionViewWillEnter() {
    this.storage.get(ItagStorage.language).then((res) => {
      this.lastLanguage = res;
      console.log("selected Language : " + res);
    }).then(() => {

      if (this.lastLanguage == "2") {
        this.seletcEnglish = "lang_box";
        this.selectHindi = "lang_box lang_box_active";

      } else if (this.lastLanguage == "1") {
        this.selectHindi = "lang_box";
        this.seletcEnglish = "lang_box lang_box_active";
      }else{
        this.selectHindi = "lang_box";
        this.seletcEnglish = "lang_box lang_box_active";
        
      }

    });
  }

  setLanguage(lang) {

    //
    console.log("selected lang : " + lang)
    this.storage.set(ItagStorage.language, lang);

    if (lang == "2") {
      this.seletcEnglish = "lang_box";
      this.selectHindi = "lang_box lang_box_active";

    } else if (lang == "1") {
      this.selectHindi = "lang_box";
      this.seletcEnglish = "lang_box lang_box_active";
    }


    let reqBody = {
      "action": "setLanguage",
      "user_id": this.userId,
      "language": lang
    }
    console.log("Param  : " + reqBody);
    this.utils.debugLog(TAG, " req " + JSON.stringify(reqBody));

    if (this.utils.checkNetWork()) {

      this.utils.showLoader("Please Wait...");
      this.service.getRatingList(reqBody).subscribe(res => {
        this.utils.dismissLoader();
        if (res.statuscode == 200 || res.statuscode == 201) {
          this.utils.debugLog(TAG, " res " + JSON.stringify(res));
         // this.utils.showToast(res.message);
          this.navCtrl.setRoot(DashboardPage);
        } else {
          this.utils.debugLog(TAG, " other than 2XX " + JSON.stringify(res));
        //  this.utils.showToast(res.message);
        }
      }, err => {
        this.utils.dismissLoader();
        this.utils.debugLog(TAG, err);
        this.utils.showToast(err);
      });

    } else {
      this.utils.showToast("Network Nahi Hai");
    }
  }
  Skip(){
    this.navCtrl.setRoot(DashboardPage);
  }
}
