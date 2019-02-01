import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, Platform } from 'ionic-angular';
import { AppPreferences } from '@ionic-native/app-preferences';
import { ItagStorage } from '../../itags/ItageStorage';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { SocialSharing } from '@ionic-native/social-sharing';
import { CategorycontentPage } from '../categorycontent/categorycontent';
import { Utils } from '../../itags/Utils';
import { ProfilePage } from '../profile/profile';
import { DashboardPage } from '../dashboard/dashboard';
import { SettingsPage } from '../settings/settings';
import { EditprofilePage } from '../editprofile/editprofile';

/**
 * Generated class for the DarshanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-darshan',
  templateUrl: 'darshan.html',
})
export class DarshanPage {

  public sub_cat: any;
  public check_state: any;
  private TAG: any;
  private banner: any;
  private user_id: any;
  public isLive: boolean = false;
  public img: any;
  base: any;


  constructor(public navCtrl: NavController, public navParams: NavParams, private Pref: AppPreferences,
    public toastCtrl: ToastController, private storage: Storage, public platform: Platform, private network: Network,
    public service: CommonServicesProvider, private socialSharing: SocialSharing,
    private utils: Utils) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DarshanPage');
  }


  ionViewWillEnter() {
    this.TAG = "Darshan";

    this.storage.get(ItagStorage.last_subCat).then((res) => {
      console.log("value : sub Cat : " + res);
      this.sub_cat = res;
    }).then(() => {
      // this.presentToast("" + this.sub_cat);
      this.storage.get(ItagStorage.user_id).then((val) => {
        this.user_id = val;

      }).then(() => {
        this.checkNetwork("sub_cat");

      })

    });

  }
  whatsappShare(value: any) {
    // console.log(value.cat_banner);
    //let image_url ="http://bailiwickstudioz.com/jaihoindia/images/"+ value.cat_banner;
    //let image_url ="http://www.quickmeme.com/img/c2/c221d3e29eaaa776aea80ceddce0111bf405e7c61424951f8cb852476ab2e710.jpg";


    //console.log("image_url  :  "+image_url);

    this.socialSharing.shareViaWhatsApp(ItagStorage.msgShare_Vedio_first_tag + "  " + value.cat_name + " " + ItagStorage.msgShare_app_name, null, "http://jaihoindia.net/puja/kumbh2019/");



  }
  checkNetwork(value: any) {

    this.platform.ready().then(() => {
      this.check_state = <string>this.network.type;

      if (this.check_state == "unknown" || this.check_state == "none") {
        // Network not available  Save in Db  

        this.presentToast("Network not available");
      } else {
        // Network  available   Network Calling
        // this.presentToast("Network  available");
        if (value == "sub_cat") {
          this.getSubcatList(this.sub_cat);
        }
      }
    });

  }

  getSubcatList(subCat: any) {


    let reqBody = {

      "action": "getSubCategories",
      "user_id": this.user_id,
      "cat_id": subCat,
    };
    this.utils.showLoader("Please Wait...");
    console.log(this.TAG, "Params : " + JSON.stringify(reqBody));
    this.service.getRatingList(reqBody).subscribe(res => {
      console.log(this.TAG, JSON.stringify(res));
      this.utils.dismissLoader();
      if (res.status == 1) {
        this.banner = res.data;
        // this.catagory = res.data.categories;

        console.log("Prince : " + JSON.stringify(this.banner));

        console.log("message" + res.message);

      } else {
        this.presentToast(res.message);
      }

    }, err => {
      this.utils.dismissLoader();
      console.log("Error in response====>" + err);
    });
  }

  changeFollow(catValue: any, item: any) {

    if (this.user_id != null && this.user_id > 0) {
      this.changeFollowApi(catValue, item);

    } else {
      this.navCtrl.push(EditprofilePage);
    }


  }

  changeFollowApi(catValue: any, item: any) {
    console.log(catValue.followed + "   : no : " + item);
    //catValue.followed = 1;
    let followValue: any;

    if (catValue.followed == 0) {
      followValue = "1";
    } else if (catValue.followed == 1) {
      followValue = "0";
    }
    console.log("follow value " + followValue);

    let reqBody = {
      "action": "followCategory",
      "user_id": "1",
      "following_status": followValue,
      "cat_id": catValue.cat_id
    };

    console.log(this.TAG, "Params : " + JSON.stringify(reqBody));
    this.service.getRatingList(reqBody).subscribe(res => {
      console.log(this.TAG, JSON.stringify(res));
      if (res.status == 1) {
        catValue.followed = followValue;
      }
      console.log("Message ====>" + res.message);
    }, err => {
      console.log("Error in response====>" + err);
    });

  }
  goToContentById(catValue: any, item: any) {
    let sub_catagory_id: any;
    sub_catagory_id = catValue.cat_id;
    //  this.presentToast(aa);
    console.log("sub catagory", sub_catagory_id);
    this.storage.set(ItagStorage.last_sub_catagory, sub_catagory_id);
    this.navCtrl.push(CategorycontentPage);

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

  // get base 64 or url
  convertToDataURLviaCanvas(url, outputFormat) {
    return new Promise((resolve, reject) => {
      this.img = new Image();
      this.img.crossOrigin = 'Anonymous';
      this.img.onload = () => {
        let canvas = <HTMLCanvasElement>document.createElement('CANVAS'),
          ctx = canvas.getContext('2d'),
          dataURL;
        canvas.height = this.img.height;
        canvas.width = this.img.width;
        ctx.drawImage(this.img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        resolve(dataURL);
        canvas = null;
      };
      this.img.src = url;
    });
  }
}
