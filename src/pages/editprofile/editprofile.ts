import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfilePage } from '../profile/profile';
import { LoginRegisterPage } from '../login-register/login-register';
import { SignupPage } from '../signup/signup';
import { Storage } from '@ionic/storage';
import { ItagStorage } from '../../itags/ItageStorage';
import { FaqPage } from '../faq/faq';
import { TermsPage } from '../terms/terms';
import { PrivacypolicyPage } from '../privacypolicy/privacypolicy';
import { RatePage } from '../rate/rate';
import { DashboardPage } from '../dashboard/dashboard';
import { TranslatePage } from '../translate/translate';
import { SettingsPage } from '../settings/settings';

/**
 * Generated class for the EditprofilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class EditprofilePage {

  user_id: any;
  isLogin: boolean = false;

  user_email: any;
  user_fName: any;
  user_lName: any;
  user_name: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditprofilePage');
  }

  ionViewWillEnter() {
    this.storage.get(ItagStorage.user_id).then((val) => {
      this.user_id = val;
      console.log()
      if (this.user_id != null) {
        if (this.user_id > 0) {
          this.isLogin = true;
        }
      }
    });

    this.storage.get(ItagStorage.userFname).then((val) => {
      this.user_fName = val;
      this.user_name = "User : " + this.user_fName + "  " + this.user_lName;
    });

    this.storage.get(ItagStorage.userLname).then((val) => {
      this.user_lName = val;
      this.user_name = "User " + this.user_fName + "  " + this.user_lName;
   
    });
    this.storage.get(ItagStorage.userEmail).then((val) => {
      this.user_email = "Email : "+val;

    });
  }
  profile() {
    this.navCtrl.push(ProfilePage);
  }
  editprofile() {
    this.navCtrl.pop();
  }
  pushRegister() {
    this.navCtrl.push(SignupPage)
  }
  pushLogin() {
    this.navCtrl.push(LoginRegisterPage);
  }

  logout() {
    console.log("i m heree");
    this.storage.set(ItagStorage.user_id, "0").then(() => {
      this.navCtrl.setRoot(DashboardPage);

    });
  }
  change_language() {
    this.navCtrl.push(TranslatePage);

  }


  FAQ() {
    this.navCtrl.push(FaqPage);
  }
  terms() {
    this.navCtrl.push(TermsPage);
  }
  privacy() {
    console.log("Hello");
    this.navCtrl.push(PrivacypolicyPage);
  }
  rateUs() {
    this.navCtrl.push(RatePage);
  }

  //// Footer

  dashboard() {
    this.navCtrl.setRoot(DashboardPage);
  }

  download() {
    //this.utils.showToast("Available Soon...");
  }

  settings() {
    this.navCtrl.push(SettingsPage);
  }

}
