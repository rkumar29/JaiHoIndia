import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { Utils } from '../../itags/Utils';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { ItagStorage } from '../../itags/ItageStorage';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the WallpaperPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const TAG: string = "Wallpaper Page => ";

@IonicPage()
@Component({
  selector: 'page-wallpaper',
  templateUrl: 'wallpaper.html',
})
export class WallpaperPage {


  wall_content: any;
  wall_url: any;
  BASE_URL = "http://bailiwickstudioz.com/jaihoindia/images/";
  user_id: any;
  wall_id: any;
  relatedVedioRES: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private utils: Utils,
    private platform: Platform, public rest: CommonServicesProvider, private storage: Storage, ) {
    //    this.wall_content = this.navParams.get('wall');
    //  this.utils.debugLog(TAG,JSON.stringify(this.wall_content)); 
  }

  goBack() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WallpaperPage');
    this.getDetails();
  }
  getDetails() {
    this.storage.get(ItagStorage.last_Wallpaper_Select).then((res) => {
      console.log("sub catagory id", "value : " + res);
      this.wall_id = res;

    }).then(() => this.storage.get(ItagStorage.user_id).then((val1) => {
      this.user_id = val1;
      console.log("user id", "value : " + val1);

    }).then((res) => {
      this.loadWallpaperPage();

    }));
  }

  loadWallpaperPage() {

    let reqBody = {
      "action": "getWallparerDetails",
      "user_id": this.user_id,
      "img_id": this.wall_id
    };

    console.log("Param", reqBody);
    console.log("1 Am Here");

    if (this.utils.checkNetWork()) {
      this.utils.showLoader("Please Wait...");
      this.rest.getRatingList(reqBody).subscribe(res => {

        this.utils.debugLog("prince : ", JSON.stringify(res));
        console.log(JSON.stringify(res));

        this.utils.dismissLoader();
        if (res.statuscode == 200 || res.statuscode == 201) {

          this.relatedVedioRES = res.data.related_image;

        } else {
          this.utils.showToast(res.message);
          this.utils.debugLog("prince", res);
        }
      }, err => {
        this.utils.dismissLoader();
        this.utils.showToast(err);
        this.utils.debugLog("prince", "rajesh");
        this.utils.debugLog(TAG, err);
      })
    } else {
      this.utils.showToast("Network Not Available")
    }

  }
  categorydetails() {
    this.navCtrl.pop();
  }

  dashboard() {
    this.navCtrl.pop();
  }

  setwallpaper() {

  }

}
