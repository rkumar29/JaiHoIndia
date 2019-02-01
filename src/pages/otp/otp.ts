import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../itags/Utils';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DashboardPage } from '../dashboard/dashboard';

/**
 * Generated class for the OtpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const TAG:string = "OTP Page => ";

@IonicPage()
@Component({
  selector: 'page-otp',
  templateUrl: 'otp.html',
})
export class OtpPage {

  otp:AbstractControl;
  mobile:AbstractControl;
  mobileForm:FormGroup;
  otpForm:FormGroup; 
  clickSend=false;
  timer:any;
  buttonName:any;
  savedMobile:any;
  timerId:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private utils:Utils,private service:CommonServicesProvider,private formBuilder:FormBuilder) {
      this.mobileForm = this.formBuilder.group({
        mobile:['',Validators.required],
      });

      this.mobile = this.mobileForm.controls['mobile'];  

      this.otpForm = this.formBuilder.group({
        otp: ['', Validators.required]
      })

      this.otp = this.otpForm.controls['otp'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtpPage');
  }

  resendOtp(){

    clearInterval(this.timerId);
    this.sendOtp();
  }

  sendOtp(){

    this.savedMobile = this.mobile.value;

    let reqBody = {
      "action":"generateOtp",
      "otp":this.savedMobile
    }
   
    if(this.utils.checkNetWork()){
      this.utils.showLoader("Please Wait Verifying...");
      this.service.getRatingList(reqBody).subscribe(res=>{
        this.utils.debugLog(TAG,"res=> "+JSON.stringify(res));
        this.clickSend = true;
        this.utils.dismissLoader();
        if(res.statuscode == 200 || res.statuscode == 201){
          this.utils.showToast(res.message);
          this.startTimer();
        }else{
          this.startTimer();
          this.utils.debugLog(TAG,JSON.stringify(res));
        }

      },err=>{
        this.utils.dismissLoader();
        this.utils.debugLog(TAG,err);

      })

    }else{
      this.utils.showToast("Network Not Available");
    }

  }

  verifyOtp(){ 
    this.clickSend = false;
    let reqBody = {
      "action":"verifyOtp",
      "otp":this.otp.value
    }
   
    if(this.utils.checkNetWork()){
      this.utils.showLoader("Please Wait Verifying...");
      this.service.getRatingList(reqBody).subscribe(res=>{
        this.utils.debugLog(TAG,"res=> "+JSON.stringify(res));
        this.utils.dismissLoader();
        if(res.statuscode == 200 || res.statuscode == 201){
          this.utils.showToast(res.message);
          this.navCtrl.pop();
          clearInterval(this.timerId);
        }else{
          clearInterval(this.timerId);
          this.navCtrl.pop();
          this.utils.debugLog(TAG,JSON.stringify(res));
        }

      },err=>{
        this.utils.dismissLoader();
        this.utils.debugLog(TAG,err);

      })

    }else{
      this.utils.showToast("Network Not Available");
    }
   }


   startTimer(){
     this.timer = 60;
     this.timerId = setInterval(function(){
       if(this.timer > -1){
        let tim = this.timer--;
        this.checkOtpFilled(tim);
       }
     }.bind(this),1000)
   }

   checkOtpFilled(time){
     let mob:string = this.savedMobile;

     this.utils.debugLog(TAG,"mobile => "+mob);
     this.utils.debugLog(TAG,"time => "+time);

     if(time == 0 && mob.length > 0){
     //  this.buttonName = "Resend Otp";
       this.otpForm.valid;
     }else{
       this.otpForm.invalid;
     }
   }


}
