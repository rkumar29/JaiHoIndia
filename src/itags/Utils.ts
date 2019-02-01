import { ToastController, LoadingController, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import { IsDebug } from '@ionic-native/is-debug';
import { Network } from '@ionic-native/network';

@Injectable()
export class Utils {


    loading: any;
    check_state:any;

    constructor(public toastCtrl: ToastController, private isDebug: IsDebug,
        public loadingCtrl: LoadingController, private network: Network,private platform : Platform) {
    }

    showToast(msg) {
        let newToast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'bottom'
        });
        newToast.present();
    }

    debugLog(TAG, message) {
        if (this.isDebug.getIsDebug()) {
            console.debug(TAG, message)
        }
    }

    showLoader(message) {
        this.loading = this.loadingCtrl.create({
            content: message
        });
        this.loading.present();

    }

    dismissLoader() {
        this.loading.dismiss();
    }

    checkNetWork(): boolean {

        this.platform.ready().then(()=>{
            this.check_state = this.network.type;
        })
       console.log(" == > "+this.check_state);
       if(this.check_state === "unknown" || this.check_state === "none" /* || this.check_state == null */){
           return false;
       }else{
           return true;
       }

    } 

}