import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Utils } from '../../itags/Utils';
import { Storage } from '@ionic/storage';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { ItagStorage } from '../../itags/ItageStorage';
import { OtpPage } from '../otp/otp';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const TAG: string = "SignUpPage ==> ";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
@Injectable()
export class SignupPage {

  email: AbstractControl;
  name: AbstractControl;
  password: AbstractControl;
  mobileNumber: AbstractControl;
  address_line_1: AbstractControl;
  address_line_2: AbstractControl;
  signUpFormGroup: FormGroup;
  signUpResponse: any;
  calendar_type: AbstractControl;
  religion: AbstractControl;
 // current_location: AbstractControl;

  selected_city: any;
  selected_state: any;
  selected_country: any;
  country_id: any;
  state_id: any;
  city_id: any;
  cityName: any;
  stateName: any;
  countryName: any;
  addressDetails: any;
  address_line1: any;
  address_line2: any;
  state: any;
  city: any;
  country: any;
  calendarType: any;
  religionType: any;
  lat: any;
  lng: any;
  address: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public utils: Utils,
    private storage: Storage,
    public service: CommonServicesProvider) {

    this.signUpFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      address_line_1: ['', Validators.required],
      address_line_2: ['', Validators.required],
      selected_country: ['', Validators.required],
      selected_city: ['', Validators.required],
      selected_state: ['', Validators.required],
      religion: ['', Validators.required],
      calendar_type: ['', Validators.required]/* ,
      current_location: ['', Validators.required] */
    });

    this.name = this.signUpFormGroup.controls['name'];
    this.email = this.signUpFormGroup.controls['email'];
    this.password = this.signUpFormGroup.controls['password'];
    this.mobileNumber = this.signUpFormGroup.controls['mobileNumber'];
    this.address_line_1 = this.signUpFormGroup.controls['address_line_1'];
    this.address_line_2 = this.signUpFormGroup.controls['address_line_2'];
    this.selected_country = this.signUpFormGroup.controls['selected_country'];
    this.selected_state = this.signUpFormGroup.controls['selected_state'];
    this.selected_city = this.signUpFormGroup.controls['selected_city'];
    this.calendar_type = this.signUpFormGroup.controls['calendar_type'];
    this.religion = this.signUpFormGroup.controls['religion'];
  //  this.current_location = this.signUpFormGroup.controls['current_location'];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
    this.getCountry();
  }

  countrySelect(count: any) {
    this.utils.debugLog(TAG, " country => " + count);
  }

  getCountryId(countryId) {
    this.utils.debugLog(TAG, "country id => " + countryId);
    this.country_id = countryId;
    this.getState(countryId);
  }

  stateSelect(s: any) {
    this.utils.debugLog(TAG, "state => " + s);
  }

  getStateId(stateid) {
    this.utils.debugLog(TAG, "state id => " + stateid);
    this.state_id = stateid;
    this.getCity(this.state_id);
  }

  citySelect(c: any) {
    this.utils.debugLog(TAG, "city => " + c);
  }

  getCityId(cityId) {
    this.utils.debugLog(TAG, "state id => " + cityId);
    this.city_id = cityId;
  }

  religionSelect(religion: any) {
    this.utils.debugLog(TAG, "religion" + religion);
    this.religionType = religion;
  }

  calendarSelect(calendar: any) {
    this.utils.debugLog(TAG, "calendar " + calendar);
    this.calendarType = calendar;
  }

  myLoc() {
/* 
    this.utils.debugLog(TAG, "Inside method");
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
          this.utils.debugLog(TAG, "Req Success");
        },
          err => {
            this.utils.debugLog(TAG, "Req Error" + err);
          })
      }
    });

    let options = { timeout: 10000, enableHighAccuracy: true, maximumAge: 3600 };
    //this.checkLocation();
    this.geolocation.getCurrentPosition(options).then((resp) => {
      // resp.coords.latitude
      this.lat = resp.coords.latitude;
      console.log("current_lat ==> " + this.lat);
      // resp.coords.longitude
      this.lng = resp.coords.longitude;
      console.log("current_lon ==> " + this.lng);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
 */

  }

  login() {
    this.navCtrl.pop();
  }

  signUp() {

    var name: string = this.name.value;
    var index = name.indexOf(" ");
    var fname = name.substring(0, index).trim();
    var lname = name.substring(index).trim();
    console.log(fname + "  " + lname + " " + this.email.value + "  " + this.password.value);

    this.utils.debugLog(TAG, index);
    if (index != -1) {

      if (this.utils.checkNetWork()) {
        this.utils.showLoader("Please Wait...")
        let requestBody = {
          "action": "registration",
          "fname": fname,
          "lname": lname,
          "email": this.email.value,
          "password": this.password.value,
          "issocial": "0",
          "mobile_no": this.mobileNumber.value,
          "address_line1": this.address_line_1.value,
          "address_line2": this.address_line_2.value,
          "city_id": this.city_id,
          "religion": this.religionType,
          "calendar": this.calendarType
        }

        console.log("Request => ", JSON.stringify(requestBody))

        this.service.getRatingList(requestBody).subscribe(response => {
          this.utils.dismissLoader();
          this.utils.debugLog(TAG, JSON.stringify(response));
          if (response.statuscode == 200 || response.statuscode == 201) {
            this.utils.showToast(response.message);
            this.signUpResponse = response.data;
            this.storage.set(ItagStorage.user_id, this.signUpResponse.user_id);
            this.navCtrl.push(OtpPage)
          } else {
            this.utils.showToast(response.message);
          }
        }, err => {
          this.utils.showToast(err);
        });
      }
    } else {
      this.utils.showToast("Please Provide Full Name");
    }

  }

  getCountry() {
    let reqBody = {
      "action": "getCountry"
    }

    this.utils.debugLog(TAG, " req => " + JSON.stringify(reqBody));
    if (this.utils.checkNetWork()) {
      this.utils.showLoader("Please Wait...");
      this.service.getRatingList(reqBody).subscribe(res => {
        this.utils.dismissLoader();
        this.utils.debugLog(TAG, JSON.stringify(res));
        if (res.statuscode == 200 || res.statuscode == 201) {
          this.country = res.data;
        } else {
          this.utils.debugLog(TAG, "status code other than 200 " + JSON.stringify(res));
        }

      }, err => {
        this.utils.dismissLoader();
        this.utils.debugLog(TAG, " err " + err);
      })

    } else {
      this.utils.showToast("Network Not Available");
    }
  }

  getState(countryId) {

    let reqBody = {
      "action": "getState",
      "country_id": countryId
    }
    this.utils.debugLog(TAG, " req => " + JSON.stringify(reqBody));
    if (this.utils.checkNetWork()) {
      this.utils.showLoader("Please Wait...");
      this.service.getRatingList(reqBody).subscribe(res => {
        this.utils.dismissLoader();
        this.utils.debugLog(TAG, JSON.stringify(res));
        if (res.statuscode == 200 || res.statuscode == 201) {
          this.state = res.data;
          /* res.data.forEach(element=>{
            this.state.push
          }) */

        } else {
          this.utils.debugLog(TAG, "status code other than 200 " + JSON.stringify(res));
        }

      }, err => {
        this.utils.dismissLoader();
        this.utils.debugLog(TAG, " err " + err);
      })

    } else {
      this.utils.showToast("Network Not Available");
    }


  }

  getCity(state_id) {

    let reqBody = {
      "action": "getCities",
      "state_id": state_id
    }
    this.utils.debugLog(TAG, " req => " + JSON.stringify(reqBody));
    if (this.utils.checkNetWork()) {
      this.utils.showLoader("Please Wait...");
      this.service.getRatingList(reqBody).subscribe(res => {
        this.utils.dismissLoader();
        if (res.statuscode == 200 || res.statuscode == 201) {
          this.city = res.data;

        } else {
          this.utils.debugLog(TAG, "status code other than 200 " + JSON.stringify(res));
        }

      }, err => {
        this.utils.dismissLoader();
        this.utils.debugLog(TAG, " err " + err);
      })

    } else {
      this.utils.showToast("Network Not Available");
    }
  }

}
