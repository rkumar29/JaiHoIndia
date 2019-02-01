import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController, Toast } from 'ionic-angular';
import { Network } from '@ionic-native/network';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { UtilsUrl } from '../../itags/UtilsUrl';
import { DarshanPage } from '../darshan/darshan';
import { AppPreferences } from '@ionic-native/app-preferences';
import { ItagStorage } from '../../itags/ItageStorage';
import { Storage } from '@ionic/storage';
import { Utils } from '../../itags/Utils';
import { HoroscopePage } from '../horoscope/horoscope';
import { VideoplayerPage } from '../videoplayer/videoplayer';
import { CategorycontentPage } from '../categorycontent/categorycontent';
import { SettingsPage } from '../settings/settings';
import { WallpaperPage } from '../wallpaper/wallpaper';
import { DemoPage } from '../demo/demo';
import { EditprofilePage } from '../editprofile/editprofile';
import { PujaPage } from '../puja/puja';
/**
 * Generated class for the DashboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  private TAG: any;
  public check_state: any;
  public banner: any;
  public catagory: any;
  public following_RES: any[];
  public watched_list: any[];
  public wallpaper_list: any[];

  public total_follow: any;
  public follow_count: any;
  public user_id: any;
  public isRecent: boolean = false;
  public isfollower: boolean = false;



  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform,
    private network: Network, public toastCtrl: ToastController, public service: CommonServicesProvider,
    private Pref: AppPreferences, private storage: Storage,
    private utils: Utils) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DashboardPage');
    console.log('ionViewWillEnter DashboardPage');

    this.TAG = "dashboard";
    console.log(this.TAG, "in dashboard");
    //this.checkNetwork("dashboard");
    this.storage.get(ItagStorage.user_id).then((res) => {
      console.log("value : User id : " + res);
      this.user_id = res;
    }).then(() => {
      this.getDashboard();

    });
  }

  ionViewWillEnter() {

  }

  checkNetwork(value: any) {

    this.platform.ready().then(() => {
      this.check_state = <string>this.network.type;

      if (this.check_state == "unknown" || this.check_state == "none") {
        // Network not available  Save in Db  

        this.presentToast("Network not available");
      } else {
        // Network  available   Network Calling
        //   this.presentToast("Network  available");
        if (value == "dashboard") {
          this.getDashboard();
        }
      }
    });

  }
  getDashboard() {
    let reqBody = {
      "action": "getDashboard",
      "user_id": this.user_id
    };

    this.utils.showLoader("Please Wait...");
    console.log(this.TAG, "Params : " + JSON.stringify(reqBody));
    this.service.getRatingList(reqBody).subscribe(res => {
      console.log(this.TAG, JSON.stringify(res));
      this.utils.dismissLoader();
      if (res.status == 1) {
        this.banner = res.data.banner;
        this.catagory = res.data.categories;
        this.following_RES = res.data.following_category;
        this.watched_list = res.data.watched_list;
        this.wallpaper_list = res.data.wallpapers;

        this.total_follow = "Following (" + this.following_RES.length + ")";
        this.follow_count = this.following_RES.length;
        if (this.following_RES.length > 0) {
          this.isfollower = true;
        }
        if (this.watched_list.length > 0) {
          this.isRecent = true;
        }
        //  this.total_follow="following Values : "+this.following_RES.size();
        console.log("My Array : " + JSON.stringify(this.catagory));
        console.log("message" + res.message);
      } else {
        this.presentToast(res.message);
      }
    }, err => {
      this.utils.dismissLoader();
      console.log("Error in response====>" + err);
    });
  }


  GetSubCatList(Catagories: any) {
    let catHead: any;
    catHead = Catagories.cat_id;
    //   this.presentToast(catHead + " pp " + ItagStorage.last_subCat);;
    this.storage.set(ItagStorage.last_subCat, catHead);
    this.navCtrl.push(DarshanPage);
  }

  banner_click(banner_detail: any) {
    let content_id: any, content_type: any;
    content_id = banner_detail.content_id;
    content_type = banner_detail.content_type;



    //   this.presentToast(content_id);
    if (content_type == ItagStorage.iVideo) {
      this.storage.set(ItagStorage.last_vedios_Content, content_id).then(() => {
        this.storage.set(ItagStorage.last_vedios_Content_type, content_type).then(() => {
          this.navCtrl.push(VideoplayerPage);

        })

      });

    } else if (content_type == ItagStorage.iAudio) {
      this.storage.set(ItagStorage.last_vedios_Content, content_id).then(() => {
        this.storage.set(ItagStorage.last_vedios_Content_type, content_type).then(() => {
          this.navCtrl.push(VideoplayerPage);

        })

      });

    } else if (content_type == ItagStorage.iWallpaper) {

      this.storage.set(ItagStorage.last_Wallpaper_Select, content_id).then(() => {
        this.storage.set(ItagStorage.last_vedios_Content_type, content_type).then(() => {
          this.navCtrl.push(WallpaperPage);

        })
        
      });




    } else {
      console.log(" content Type page not develop for id " + content_type);
    }


  }

  following(follow: any) {
    let sub_catagory_id: any;
    sub_catagory_id = follow.cat_id;
    //  this.presentToast(aa);
    this.storage.set(ItagStorage.last_sub_catagory, sub_catagory_id);
    console.log("sub catagory", sub_catagory_id);

    this.navCtrl.push(CategorycontentPage);


  }

  openSubcat(sub_cat) {
    let sub_catagory_id: any;
    sub_catagory_id = sub_cat.cat_id;
    //  this.presentToast(aa);
    console.log("sub catagory ppppp ", sub_catagory_id);

    this.storage.set(ItagStorage.last_sub_catagory, sub_catagory_id);
    this.navCtrl.push(CategorycontentPage);
  }
  wallpaperHit(wallItem: any) {
    let wall_id: any;
    wall_id = wallItem.content_id;
    this.storage.set(ItagStorage.last_Wallpaper_Select, wall_id);
    this.navCtrl.push(WallpaperPage);
  }



  openHoroscope() {
    this.navCtrl.push(HoroscopePage);
  }

  openTemple(){
    let catHead: any;
    catHead = "91";
    this.storage.set(ItagStorage.last_subCat, "91");
    this.navCtrl.push(DarshanPage);
  }
  democlick() {
    console.log("i m heree");
    // this.navCtrl.push(DemoPage);
  }

  watchHit(watchItem: any) {
    console.log("watch List " + watchItem.content_type);
    let content_id: any, content_type: any;
    content_id = watchItem.vid_id;
    content_type = watchItem.content_type;

    this.storage.set(ItagStorage.last_vedios_Content, content_id);
    this.storage.set(ItagStorage.last_vedios_Content_type, content_type);

    //  this.presentToast(content_id);
    if (content_type == ItagStorage.iVideo) {
      this.navCtrl.push(VideoplayerPage);
    } else if (content_type == ItagStorage.iAudio) {
      this.navCtrl.push(VideoplayerPage);

    } else {
      console.log(" content Type page not develop for id " + content_type);
    }
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
   

    toast.onDidDismiss(() => {
      console.log('Dismissed toast'); 
    })
    toast.present();
  } 

  openPujaPage(){
    this.navCtrl.push(PujaPage);    
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
  profile() {
    this.navCtrl.push(EditprofilePage);
  }

}
