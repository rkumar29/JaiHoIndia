import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { Utils } from '../../itags/Utils';

/**
 * Generated class for the DietyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const TAG:string="DietyPoojaPage => "; 

@IonicPage()
@Component({
  selector: 'page-diety',
  templateUrl: 'diety.html',
})
export class DietyPage {

  page_name:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public utils:Utils,public service:CommonServicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DietyPage');
  }

  ionViewWillEnter(){
    this.page_name = this.navParams.get('p').pageName;
    this.utils.debugLog(TAG,"param "+this.page_name);
  }

  /* loadDietydata(){
    let reqBody = {
      "action":"getDietyData"
    }

    if(this.utils.checkNetWork()){
      this.utils.showLoader("Please Wait...");
      this.utils.debugLog(TAG,"req"+JSON.stringify(reqBody));
      this.service.getRatingList(reqBody).subscribe(res=>{
        this.utils.debugLog(TAG,"res "+JSON.stringify(res));
        this.utils.dismissLoader();
        if(res.statuscode == 200 || res.statuscode == 201){

        }else{
          this.utils.debugLog(TAG,"status code other than 200"+res.message);
        }
      },err=>{
        this.utils.debugLog(TAG,"error"+err);
        this.utils.dismissLoader();
      })

    }else{
      this.utils.showToast("Network Not Available");
    }

  } */

}
