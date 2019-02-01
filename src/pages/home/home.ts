import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LoginRegisterPage } from '../login-register/login-register';
import { ItagStorage } from '../../itags/ItageStorage';
import { DashboardPage } from '../dashboard/dashboard';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public user_id: any;

  constructor(public navCtrl: NavController, private storage: Storage) {
    this.goToLoginPage();
  }

  goToLoginPage() {

    setTimeout(() => { 

      this.storage.get(ItagStorage.user_id).then((val) => {
        console.log("is Login :  " + val);
        if (val == null) {
          this.storage.set(ItagStorage.user_id, "0").then(() => {
            this.navCtrl.setRoot(DashboardPage);
          });
        } else {
          this.navCtrl.setRoot(DashboardPage);
        }

      })
    }, 5000);

  }




}
