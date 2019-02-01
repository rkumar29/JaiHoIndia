import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { Network } from '@ionic-native/network';
import { ItagStorage } from '../../itags/ItageStorage';
import { HoroscopesettingPage } from '../horoscopesetting/horoscopesetting';
import { Storage } from '@ionic/storage';
import { ProfilePage } from '../profile/profile';
import { DashboardPage } from '../dashboard/dashboard';
import { SettingsPage } from '../settings/settings';
import { Utils } from '../../itags/Utils';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the HoroscopePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-horoscope',
  templateUrl: 'horoscope.html',
})
export class HoroscopePage {
  
  public Tag: any;
  public zodicSignid: any;
  public user_id: any;
  public check_state: any;
  // Zodic sign detail
  zodiac_sign_name: any;
  zodiac_sign_icon: any;
  zodiac_sign_banner: any;

  // all array
  daily_horoscope: any[];
  monthly_horoscope: any[];
  yearly_horoscope: any[];
  sign_for_date: any; 
  myDate:any;

  classDailyH: string = 'time_span';
  classMothlyH: string = 'time_span';
  classYearlyH: string = 'time_span';

  public showHoro: any[];
  constructor(public navCtrl: NavController, public navParams: NavParams,private storage:Storage,
    public platform: Platform, private network: Network, public toastCtrl: ToastController,
    public service: CommonServicesProvider,private utils:Utils,private socialSharing: SocialSharing) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HoroscopePage');
  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter HoroscopePage');
    this.getStorageDetails();
    this.myDate= new Date().getTime()
  }

  horoscope() {
    this.navCtrl.push(HoroscopePage);
  }

  getStorageDetails() {
    this.storage.get(ItagStorage.last_zoadic_sign).then((res) => {
      console.log("Zoadic sign id", "value : " + res);
      if (res == null) {
        this.navCtrl.push(HoroscopesettingPage);
//        this.zodicSignid = "60";
        this.presentToast("Zodic sign is not select for testing take it here i have to open Zoadic sign page");
      } else {
        this.zodicSignid = res;
      }
    }).then(() => this.storage.get(ItagStorage.user_id).then((val1) => {
      this.user_id = val1;
      console.log("user_id id", "value : " + val1);
    }).then((res) => {
      this.checkNetwork();
    }));
  }


  checkNetwork() {

    this.platform.ready().then(() => {
      this.check_state = <string>this.network.type;

      if (this.check_state == "unknown" || this.check_state == "none") {
        // Network not available  Save in Db  

     //   this.presentToast("Network not available");
      } else {
        // Network  available   Network Calling
     //   this.presentToast("Network  available");

        this.getHoroscope();
      }
    });

  }
  getHoroscope() {

    console.log("vedio Player", "Params : prince");

    let reqBody = {
      "action": "getSignDetails",
      "user_id": this.user_id,
      "sign_id": this.zodicSignid
    };
 


    console.log(this.Tag, "Params : " + JSON.stringify(reqBody));
    this.service.getRatingList(reqBody).subscribe(res => {
      console.log("vedio Player", JSON.stringify(res));
      if (res.status == 1) {
        this.zodiac_sign_name = res.data.zodiac_sign_name;
        this.zodiac_sign_icon = res.data.zodiac_sign_icon;
        this.zodiac_sign_banner = res.data.zodiac_sign_banner;
        this.sign_for_date = res.data.sign_for_date;

        this.daily_horoscope = res.data.daily_horoscope;
        this.monthly_horoscope = res.data.monthly_horoscope;
        this.yearly_horoscope = res.data.yearly_horoscope;
       
        console.log("message  : " + this.zodiac_sign_banner);
        //console.log("message" + res.message+"   "+this.daily_horoscope.length);
        this.dailyHoro("Daily")
      } else {
        this.presentToast(res.message);
      }


    }, err => {
      console.log("Error in response====>" + err);
    });
  }
 
  dailyHoro(HoroscopeFor: any) {
    console.log(HoroscopeFor);

    this.classDailyH = 'time_span';
    this.classMothlyH = 'time_span';
    this.classYearlyH = 'time_span';

    if (HoroscopeFor == "Monthly") {
      this.showHoro = this.monthly_horoscope;
      this.classMothlyH = 'time_span_prince';
    } else if (HoroscopeFor == "Daily") {
      this.showHoro = this.daily_horoscope;
      this.classDailyH = 'time_span_prince';

    } else if (HoroscopeFor == "Yearly") { 
      this.showHoro = this.yearly_horoscope; 
      this.classYearlyH = 'time_span_prince';
    }
  
   // console.log("its legnth : "+this.showHoro.length);

  }
  SettingPage(){
    console.log("i m here");
    this.navCtrl.push(HoroscopesettingPage);

  }

  whatsappShare() {
   
    this.socialSharing.shareViaWhatsApp(ItagStorage.msgShare_Horoscope , null, "http://jaihoindia.net/puja/kumbh2019/");

  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });


    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


  profile() {
    this.navCtrl.push(ProfilePage);
  }


  dashboard() {
    this.navCtrl.setRoot(DashboardPage);
  }

  download() {
    this.utils.showToast("Available Soon...");
  }

  settings() {
    this.navCtrl.push(SettingsPage);
  }

}
