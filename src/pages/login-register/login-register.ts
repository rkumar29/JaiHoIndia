import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast, ToastController } from 'ionic-angular';

import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook'

import { SignupPage } from '../signup/signup';

import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms'

import { AppPreferences } from '@ionic-native/app-preferences';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { Utils } from '../../itags/Utils';
import { Storage } from '@ionic/storage';
import { ItagStorage } from '../../itags/ItageStorage';
import { DashboardPage } from '../dashboard/dashboard';
import { TranslatePage } from '../translate/translate';
import { ForgotPasswordPage } from '../forgot-password/forgot-password';

/**
 * Generated class for the LoginRegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const TAG: string = "LoginRegisterPage => ";

@IonicPage()
@Component({
  selector: 'page-login-register',
  templateUrl: 'login-register.html',
})

export class LoginRegisterPage {

  email: AbstractControl;
  password: AbstractControl;
  formgroup: FormGroup;
  isSocial: string = "0";
  loginResponse: any;
  fbToken: any;
  userIdFb: any;
  signUpResponse: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams, private fb: Facebook,
    public formBuilder: FormBuilder,
    public service: CommonServicesProvider,
    public utils: Utils, private storage: Storage) {

    this.formgroup = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.email = this.formgroup.controls['email'];
    this.password = this.formgroup.controls['password'];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginRegisterPage');
  }

  login() {

    if (this.utils.checkNetWork()) {

      this.utils.showLoader("Please Wait...");
      let reqBody = {
        "action": "login",
        "email": this.email.value,
        "password": this.password.value,
        "issocial": this.isSocial
      }
      console.log(JSON.stringify(reqBody));
      this.service.getRatingList(reqBody).subscribe(response => {
        console.log("loginpage", JSON.stringify(response));
        this.utils.dismissLoader();
        //   this.utils.debugLog(TAG, JSON.stringify(response));
        console.log(JSON.stringify(response));
        if (response.statuscode === 200 || response.statuscode === 201) {
          this.loginResponse = response.data;
          console.log("loginpage", response.message);
          this.utils.debugLog(TAG, JSON.stringify(this.loginResponse.user_id));

          this.storage.set(ItagStorage.userEmail, this.email.value).then(() => {
            this.storage.set(ItagStorage.user_id, this.loginResponse.user_id).then(() => {
              this.storage.set(ItagStorage.userFname, this.loginResponse.fname).then(() => {
                this.storage.set(ItagStorage.userLname, this.loginResponse.lname).then(() => {

                  this.storage.set(ItagStorage.islogin, true).then(() => {
                    this.navCtrl.push(TranslatePage);
                  })
                })
              })
            })
          });




        } else {
          this.utils.showToast(response.message);
        }

      }, err => {
        console.log("Error in response====>" + err);
      });


    }
  }



  loginWithFb() {
    this.fb.login(['public_profile', 'email'])
      .then((res: FacebookLoginResponse) => {
        console.log("reponse ==>" + res);
        if (res.status == 'connected') {
          this.fbToken = res.authResponse.accessToken;
          this.userIdFb = res.authResponse.userID;
          this.getFbData();
        } else {

        }
        console.log('Logged into Facebook!', res)
      })
      .catch(e => console.log('Error logging into Facebook', e));
    // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART)
  }


  getFbData() {
    this.service.fetchFacebookResponse(this.userIdFb, this.fbToken).subscribe(res => {
      let name: string = res.name;
      let index = name.indexOf(" ");
      let fname = name.substring(0, index);
      let lname = name.substring(index + 1);

     /*  let req = JSON.stringify({
        action: "login",
        email: res.email,
        password: "",
        issocial: "1"
      }); */

      let reqSignUp = {
        "action": "registration",
        "fname": fname,
        "lname": lname,
        "email": res.email,
        "password": "",
        "issocial": "1"
      }
      this.signUpFacebook(reqSignUp);

      /* this.storage.get(ItagStorage.islogin).then(val => {
        if (val === "1") {
          this.loginFacebook(req);
        } else if (val === "0") {
          this.signUpFacebook(reqSignUp);
        }
      }) */
      
    }, err => {
      this.utils.showToast(err)
    })
  }

  loginFacebook(req) {

    if (this.utils.checkNetWork()) {

      this.utils.showLoader("Please Wait...");

      console.log("Request => ", req);

      this.service.getRatingList(req).subscribe(response => {

        this.utils.dismissLoader();
        this.utils.debugLog(TAG, JSON.stringify(response));

        if (response.statuscode === 200 || response.statuscode === 201) {
          //   this.utils.showToast(response.message);
          console.log(response.message);
          this.storage.set(ItagStorage.user_id, response.data.user_id);
        } else {
          this.utils.showToast(response.message);
        }
      }, err => {
        this.utils.showToast(err);
      });

    } else {
      this.utils.showToast("No Network");
    }

  }

  signUpFacebook(reqBody) {

    if (this.utils.checkNetWork()) {
      this.utils.showLoader("Please Wait...")

      console.log("Request => ", JSON.stringify(reqBody))

      this.service.getRatingList(reqBody).subscribe(response => {
        this.utils.dismissLoader();
        this.utils.debugLog(TAG, JSON.stringify(response));
        if (response.statuscode == 200 || response.statuscode == 201) {
          this.utils.showToast(response.message);
          this.signUpResponse = response.data;
          this.storage.set(ItagStorage.user_id, this.signUpResponse.user_id).then(()=>{
            this.navCtrl.setRoot(DashboardPage);
          }); 
        } else {
          this.utils.showToast(response.message);
        }
      }, err => {
        this.utils.showToast(err);
      });
    } else {
      this.utils.showToast("Please Provide Full Name");
    }

  }

  /*   loginWithGoogle() {
      this.google.login({})
        .then(res => console.log(res))
        .catch(err => console.error(err)); 
    }
   */
  signUp() {
    this.navCtrl.push(SignupPage);
  }

  forgotPage() {
    this.navCtrl.push(ForgotPasswordPage);
  }


}
