import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { VideoPlayer } from '@ionic-native/video-player';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the SplashPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-splash',
  templateUrl: 'splash.html',
})
export class SplashPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public toastCtrl: ToastController, private streamingMedia: StreamingMedia,
    private videoPlayer: VideoPlayer, public service: CommonServicesProvider, ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SplashPage');
  }
  // vedioWithplayer(){
  //   this.videoPlayer.play('http://bailiwicksolution.com/jaihoindia/videos/abc.mp4').then(() => {
  //  console.log('video completed');
  // }).catch(err => {
  //  console.log(err);
  // });
  // }
  onMyhit() {

    let reqBody = {
      // 'emailId': "mehra@indospirit.com",
      // 'password': "123456",
      // 'deviceId': "deviceID",
      // 'deviceName': "manufecture",
      // 'imeiId': '345432',
      // 'fcmId': "fcmID"

      "action":"registration",
      "fname":"Anshul",
      "lname":"Singh",
      "email":"duksha@gmail.com",
      "password":"Hello@123",
      "issocial":"0",
      "mobile_no":"8976543456"
    };

    let formData = new FormData();
    formData.append("action","registration");
    formData.append("fname","Anshul");
    formData.append("lname","Singh");
    formData.append("email","duksha@gmail.com");
    formData.append("password","Hello@123");
    formData.append("issocial","0");
    formData.append("mobile_no","8976543456");

    this.service.getRatingList(reqBody).subscribe(res => {
      console.log("response====>" + JSON.stringify(res));

    }, err => {
      console.log("Error in response====>" + err);

    });

  }
  Playvedio() {

    this.presentToast("hello prince");

    this.playvedioTesting();
  }
  playvedioTesting() {
    let options: StreamingVideoOptions = {
      successCallback: () => { console.log('Video played') },
      errorCallback: (e) => {
        console.log(e.message);
        console.log('Error streaming')
      },
      orientation: 'portrait',
      shouldAutoClose: true,
      controls: true,
    };

    this.streamingMedia.playVideo('http://bailiwicksolution.com/jaihoindia/videos/abc.mp4', options);
  }
  goToDashboard(){
    this.navCtrl.push(DashboardPage);
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1000,
      position: 'top'
    });


    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
