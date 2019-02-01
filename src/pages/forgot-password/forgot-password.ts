import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../itags/Utils';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { FormBuilder, FormGroup, AbstractControl, Validators } from '@angular/forms';

/**
 * Generated class for the ForgotPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const TAG:string="Forgot PasswordPage => ";

@IonicPage()
@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
})
export class ForgotPasswordPage {

  forgotPasswordForm:FormGroup;
  email:AbstractControl;

  constructor(public navCtrl: NavController, public navParams: NavParams,
  private utils:Utils,private service:CommonServicesProvider,private formBuilder:FormBuilder) {
    this.forgotPasswordForm = this.formBuilder.group({
      email:['',Validators.required]
    });

    this.email = this.forgotPasswordForm.controls['email'];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPasswordPage');
  }

  forgotPassword(){
    let reqBody = {
      "action":"forgot_password",
      "email":this.email.value
    }

    this.utils.debugLog(TAG,"req=>"+JSON.stringify(reqBody));
    this.utils.showLoader("Please Wait...");
    if(this.utils.checkNetWork()){
      this.service.getRatingList(reqBody).subscribe(res=>{
        this.utils.dismissLoader();
        this.utils.debugLog(TAG,"res=> "+JSON.stringify(res));
        if(res.statuscode == 200 || res.statuscode == 201 ){
          this.utils.showToast(res.message);
          this.navCtrl.pop();
        }else{
          this.utils.debugLog(TAG,JSON.stringify(res));
          this.navCtrl.pop();
        }
      },err=>{
        this.utils.dismissLoader();
        this.utils.debugLog(TAG,err);
      })

    }else{
      this.utils.showToast("Network Not Available");
    }

  }

}
