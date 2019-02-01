import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, ToastController } from 'ionic-angular';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { Network } from '@ionic-native/network';
import { ItagStorage } from '../../itags/ItageStorage';
import { DomSanitizer } from '@angular/platform-browser';
import { Storage } from '@ionic/storage';
import { Utils } from '../../itags/Utils';
import { ProfilePage } from '../profile/profile';
import { DashboardPage } from '../dashboard/dashboard';
import { SettingsPage } from '../settings/settings';
import { EditprofilePage } from '../editprofile/editprofile';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the VideoplayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-videoplayer',
  templateUrl: 'videoplayer.html',
})
export class VideoplayerPage {

  public vedio_id: any;
  public content_type: any;
 
  public user_id: any;

  public check_state: any;
  public vediosDetailsRES: any[];
  public relatedVedioRES: any;
  // Vedio Details
  public Vname: any;
  public Vduration: any;
  public description: any;
  public isFollow: any;
  public cat_name: any;
  public thumb_nail: any;

  public youtube_id: any;
  public whatsapp_msg: any;
  public video_id: any;
  public tags: any;
  public liked: any;
  public embeded_url: any;
  public cat_banner: any;
  public cat_id: any;
  public TAG: any = "VideoPlayer";

public hideframe:boolean=false;



  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage,
    public platform: Platform, private network: Network, public toastCtrl: ToastController,
    public service: CommonServicesProvider, public sanitizer: DomSanitizer,
    private utils: Utils,private socialSharing: SocialSharing) {

    //this.vedio_id = navParams.get('content_id');
    //  console.log('nav par ',this.vedio_id);

  }

  ionViewDidLoad() {
   // this.embeded_url = this.transform("http://www.youtube.com/embed/Q48tagwurUw");
    console.log('ionViewDidLoad VideoplayerPage');
    console.log("i am here","i am heree 1");

  }
  ionViewWillEnter() {
    console.log('ionViewWillEnter VideoplayerPage');
    
    this.getStorageDetails();
  } 

  getStorageDetails() {
    


    console.log("i am here","i am heree 2");

    this.storage.get(ItagStorage.last_vedios_Content).then((res) => {
      console.log("vedio id", "value : " + res);
      this.vedio_id = res;

    },error=>{
      console.log("msg ==> "+error);
    }).then(() => this.storage.get(ItagStorage.last_vedios_Content_type).then((val) => {
      this.content_type = val;
      console.log("content_type id", "content_type : " + this.content_type);

    })).then(() => this.storage.get(ItagStorage.user_id).then((val1) => {
      this.user_id = val1;
      console.log("user id", "value : " + val1);

    }).then((res) => {
     // this.checkNetwork();
     console.log("i am here","i am heree 3");

     this.getVedioDetail();
    })).catch(err=>{
      console.log("Ravinder sir : "+ err);
    });


  }
  videoplayer() {
    this.navCtrl.push(VideoplayerPage);
  }

  checkNetwork() {

    this.platform.ready().then(() => {
      this.check_state = <string>this.network.type;

      if (this.check_state == "unknown" || this.check_state == "none") {
        // Network not available  Save in Db  

        this.presentToast("Network not available");
      } else {
        // Network  available   Network Calling
       // this.presentToast("Network  available");

        


      }
    });

  }
  getVedioDetail() {
    console.log("i am here","i am heree 4");

    console.log("vedio Player", "Params : prince");

    let reqBody = {
      "action": "getVideoDetails",
      "user_id": this.user_id,
      "vid_id": this.vedio_id
    };

    this.utils.showLoader("Please Wait...");
    console.log("vedio Player", "Params : " + JSON.stringify(reqBody));
    this.service.getRatingList(reqBody).subscribe(res => {
      console.log("vedio Player", JSON.stringify(res));
      this.utils.dismissLoader();
      if (res.status == 1) {

        console.log("message" + res.message);
        this.vediosDetailsRES = res.data.video_details;
        this.relatedVedioRES = res.data.related_video;
        console.log("message legnth " + this.vediosDetailsRES.length);



        this.Vduration = this.vediosDetailsRES[0].duration;
        this.Vname = this.vediosDetailsRES[0].tittle;


        this.isFollow = this.vediosDetailsRES[0].follow;
        this.cat_name = this.vediosDetailsRES[0].cat_name;
        this.thumb_nail = this.vediosDetailsRES[0].thumbnail;
        this.tags = this.vediosDetailsRES[0].tags;
        this.video_id = this.vediosDetailsRES[0].video_id;
        this.whatsapp_msg = this.vediosDetailsRES[0].whatsapp_msg;
        this.youtube_id = this.vediosDetailsRES[0].youtube_id;
        this.liked = this.vediosDetailsRES[0].liked;
        this.description = this.vediosDetailsRES[0].description;
        this.cat_banner = "http://bailiwickstudioz.com/jaihoindia/images/"+this.vediosDetailsRES[0].cat_banner;
        this.cat_id = this.vediosDetailsRES[0].cat_id;
        console.log("thumb_nail url t "+this.thumb_nail);
        this.embeded_url = this.transform(this.youtube_id+"?autoplay=1");
        console.log("Embed url t "+this.embeded_url);
        if(this.embeded_url!=undefined){
          this.hideframe=true;

        }
        //this.embeded_url = this.youtube_id
        console.log("message" + this.cat_banner + "   value : " + this.Vduration);
        console.log("message" + this.cat_banner + "   value : " + this.Vduration);


      } else {
        this.presentToast(res.message);
      }


    }, err => {
      this.utils.dismissLoader();
      console.log("Error in response====>" + err);
    });
  }

  // Change Vedio 
  searchRelatedVedio(vDetail) {
    let videoID: any;

    videoID = vDetail.video_id;
    this.storage.set(ItagStorage.last_vedios_Content, videoID);
    this.getStorageDetails();

 
  }

  // Set Follow
  changeFollow(myFollow: any) {

    if(this.user_id!=null && this.user_id>0){
      this.changeFollowApi(myFollow);

    }else{
      this.navCtrl.push(EditprofilePage);
    }

  }
  changeFollowApi(myFollow: any){
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
    console.log(this.TAG, "Params : " + JSON.stringify(reqBody));
    this.service.getRatingList(reqBody).subscribe(res => {
      console.log(this.TAG, JSON.stringify(res));
      if (res.status == 1) {
        this.isFollow = followValue;
      }
      console.log("Message ====>" + res.message);
    }, err => {
      console.log("Error in response====>" + err);
    });

  }

  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }


  
  whatsappShare() {
   
    this.socialSharing.shareViaWhatsApp(this.description +"  "+ItagStorage.msgShare_app_name, null, "http://jaihoindia.net/puja/kumbh2019/");

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
