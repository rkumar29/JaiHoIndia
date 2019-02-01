import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { Utils } from '../../itags/Utils';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { SocialSharing } from '@ionic-native/social-sharing';
import { WallpaperPage } from '../wallpaper/wallpaper';
import { ProfilePage } from '../profile/profile';
import { VideoplayerPage } from '../videoplayer/videoplayer';
import { DashboardPage } from '../dashboard/dashboard';
import { SettingsPage } from '../settings/settings';
import { Storage } from '@ionic/storage';
import { ItagStorage } from '../../itags/ItageStorage';
import { Network } from '@ionic-native/network'; 
import { EditprofilePage } from '../editprofile/editprofile';
import { FacebookpostsPage } from '../facebookposts/facebookposts';
import { TwitterpostsPage } from '../twitterposts/twitterposts';

/**
 * Generated class for the CategorycontentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const TAG: string = "CategoryContent => ";

@IonicPage()
@Component({
  selector: 'page-categorycontent',
  templateUrl: 'categorycontent.html',
})
export class CategorycontentPage {

  BASE_URL_IMAGE = "http://bailiwickstudioz.com/jaihoindia/images/";
  banner: any;
  guru_profile: any;
  guruName: any;
  guruDescription: any;
  twitterLink: any;
  facebookLink: any;
  audio: any;
  video: any;
  wallpaper: any;
  catId: any;
  user_id: any;
  public check_state: any;
  public isFollow: any;
  public cat_id: any;
  default_css: any;
  more = false;
  isLoad:boolean=false;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public utils: Utils, public rest: CommonServicesProvider, private storage: Storage,
    public socialShare: SocialSharing, public platform: Platform, private network: Network, public toastCtrl: ToastController) {
    //this.catId = navParams.get('cat_id');
    this.utils.debugLog(TAG, "cat_id " + this.catId);
    this.default_css = 'cat_details';
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
    this.getDetails();

  }
  getDetails() {
    this.storage.get(ItagStorage.last_sub_catagory).then((res) => {
      console.log("sub catagory id", "value : " + res);
      this.catId = res;

    }).then(() => this.storage.get(ItagStorage.user_id).then((val1) => {
      this.user_id = val1;
      console.log("user id", "value : " + val1);

    }).then((res) => {
      this.loadCategoryPage();

    }));
  }

  showMore() {
    //  this.utils.showToast("Show More...");
    this.default_css = 'cat_on_click';
    this.more = true;
  }

  hideMore() {
    this.default_css = 'cat_details';
    this.more = false;
  }

  shareContent() {
    this.socialShare.shareVia("*", "Hello this is test", "Test", null, null);
  }

  loadCategoryPage() {

    let reqBody = {
      "action": "getContentByCatId",
      "user_id": this.user_id,
      "cat_id": this.catId
    };

    this.utils.debugLog(TAG, reqBody);
    console.log("1 Am Here");

    if (this.utils.checkNetWork()) {
      this.utils.showLoader("Please Wait...");
      this.rest.getRatingList(reqBody).subscribe(res => {

        this.utils.debugLog("prince : ", JSON.stringify(res));
        console.log(JSON.stringify(res));

        this.utils.dismissLoader();
        if (res.statuscode == 200 || res.statuscode == 201) {
          this.isLoad=true;
          this.utils.debugLog(TAG + "load cat -> ", JSON.stringify(res));
          this.banner = res.data.banner;

          this.banner.forEach(element => {
            this.utils.debugLog(TAG, "-> " + element.thumbnail);
          })

          this.audio = res.data.audio;
          this.video = res.data.video;
          this.wallpaper = res.data.image_content;

          this.audio.forEach(element => {
            this.utils.debugLog(TAG, "-> " + element.audio_type);
          })

          this.guru_profile = res.data.guru_profile;
          this.setGuruProfile();
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

  setGuruProfile() {
    this.guruName = this.guru_profile.guru_name;
    this.guruDescription = this.guru_profile.profile;
    this.twitterLink = this.guru_profile.tweeter;
    this.facebookLink = this.guru_profile.facebook;
    this.isFollow = this.guru_profile.follow;
    this.cat_id = this.guru_profile.cat_id;
  }

  videoplayer(video_content) {
    this.utils.debugLog(TAG, " aud-con=> " + JSON.stringify(video_content));
    let content_id: any, content_type: any;
    content_id = video_content.content_id;
    content_type = ItagStorage.iVideo;

    this.storage.set(ItagStorage.last_vedios_Content, content_id);
    this.storage.set(ItagStorage.last_vedios_Content_type, content_type);

    this.presentToast(content_id);
    if (content_type == ItagStorage.iVideo) {
      this.navCtrl.push(VideoplayerPage);
    } else if (content_type == ItagStorage.iVideo) {
      console.log(" Wall Paper is in process " + content_type);
    } else {
      console.log(" content Type page not develop for id " + content_type);
    }

  }

  audioplayer(audio_content) {
    this.navCtrl.push(VideoplayerPage, {
      content_id: audio_content.content_id
    });
  }

  openWallpaper(wall_content) {

    let wallContent_id: any;
    wallContent_id = wall_content.content_id;
    this.storage.set(ItagStorage.last_Wallpaper_Select, wallContent_id);
    this.navCtrl.push(WallpaperPage);

  }

  openNextPage(banner_content) {

    let content_id: any, content_type: any;
    content_id = banner_content.content_id;
    content_type = banner_content.content_type;

    /*  this.storage.set(ItagStorage.last_vedios_Content, content_id);
     this.storage.set(ItagStorage.last_vedios_Content_type, content_type); */
    this.utils.debugLog(TAG, "content id => " + content_id);

    //  content_type = "4";

    if (content_type == ItagStorage.iVideo) {
      this.storage.set(ItagStorage.last_vedios_Content, content_id).then(() => {
        this.storage.set(ItagStorage.last_vedios_Content_type, content_type).then(() => {
          this.navCtrl.push(VideoplayerPage);
        });
      });

    } else if (content_type == ItagStorage.iAudio) {
      this.storage.set(ItagStorage.last_vedios_Content, content_id).then(() => {
        this.storage.set(ItagStorage.last_vedios_Content_type, content_type).then(() => {
          this.navCtrl.push(VideoplayerPage);
        });
      });

    } else if (content_type == ItagStorage.iWallpaper) {

      this.storage.set(ItagStorage.last_Wallpaper_Select, content_id).then(() => {
        this.navCtrl.push(WallpaperPage);
      });

    } else {
      this.utils.showToast("No Content Available for this Type Select Another Type");
      console.log("No Content Available for this Type Select Another Type" + content_type);
    }

  }

  // Set Follow
  changeFollow(myFollow: any) {
    if (this.user_id != null && this.user_id > 0) {
      this.changeFollowApi(myFollow);

    } else {
      this.navCtrl.push(EditprofilePage);
    }

  }

  changeFollowApi(myFollow: any) {
    console.log(myFollow);
    //catValue.followed = 1; 
    let followValue: any;

    if (myFollow == 0) {
      followValue = "1";
    } else if (myFollow == 1) {
      followValue = "0";
    }
    console.log("follow value " + followValue);

    let reqBody = {
      "action": "followCategory",
      "user_id": this.user_id,
      "following_status": followValue,
      "cat_id": this.cat_id
    };
    console.log("Tag", "Params : " + JSON.stringify(reqBody));
    this.rest.getRatingList(reqBody).subscribe(res => {
      console.log("Tag", JSON.stringify(res));
      if (res.status == 1) {
        this.isFollow = followValue;
      }
      console.log("Message ====>" + res.message);
    }, err => {
      console.log("Error in response====>" + err);
    });


  }

  profile() {
    this.navCtrl.push(ProfilePage);
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



  dashboard() {
    this.navCtrl.setRoot(DashboardPage);
  }

  download() {
    this.utils.showToast("Available Soon...");
  }

  settings() {
    this.navCtrl.push(SettingsPage);
  }

  openFbPosts(){
    this.navCtrl.push(FacebookpostsPage,{
      fbLink:this.facebookLink,
      guru_name:this.guruName
    });
  }

  openTwitterPosts(){
    this.navCtrl.push(TwitterpostsPage,{
      twitterLink:this.twitterLink,
      guru_name:this.guruName
    });
  }


}
