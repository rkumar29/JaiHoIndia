import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SplashPage } from '../pages/splash/splash';
import { FCM } from '@ionic-native/fcm';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private fcm: FCM) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      //fcm.subscribeToTopic('all');
      if(platform.is('cordova')){
        fcm.getToken().then(token=>{
          console.log("fcm tokken ==> "+token);
      });

      }


      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

 