import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../itags/Utils';
import { CommonServicesProvider } from '../../providers/common-services/common-services';
import { ItagStorage } from '../../itags/ItageStorage';
import { Storage } from '@ionic/storage';
import { FormGroup, AbstractControl, FormBuilder, Validators } from '@angular/forms';


/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const TAG: string = "Profile Page => ";

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {


  profileResponse: any;
  user_id: any;
  name: any;
  mobile: any;
  emailId: any;
  dateOfBirth: string;
  profile_pic: any;
  gender: string[] = ['Male', 'Female'];
  state: any;
  city: any;
  selected_gender: any;
  selected_city: any;
  selected_state: any;
  state_id: any;
  city_id: any;
  selected_country:any;
  country_id:any;
  countryName:any;
  country:any;

  profileForm: FormGroup;
  full_name: AbstractControl;
  email_id: AbstractControl;
  mobile_no: AbstractControl;
  dob: AbstractControl;
  address_line_1: AbstractControl;
  address_line_2: AbstractControl;
  calendar_type:AbstractControl;
  religion:AbstractControl;

  option1: any;
  lang: any;
  cityName: any;
  stateName: any;
  addressDetails: any;
  address_line1:any;
  address_line2:any;
  calendarType:any;
  religionType:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private utils: Utils, private commonService: CommonServicesProvider,
    public formBuilder: FormBuilder,
    private storage: Storage) {

    this.profileForm = this.formBuilder.group({
      full_name: ['', Validators.required],
      email_id: ['', Validators.required],
      mobile_no: ['', Validators.required],
      dob: ['', Validators.required],
      selected_gender: ['', Validators.required],
      selected_country:['',Validators.required],
      selected_city: ['', Validators.required],
      selected_state: ['', Validators.required],
      address_line_1: ['', Validators.required],
      address_line_2: ['', Validators.required],
      religion:['',Validators.required],
      calendar_type:['',Validators.required]
    });

    this.full_name = this.profileForm.controls['full_name'];
    this.email_id = this.profileForm.controls['email_id'];
    this.mobile_no = this.profileForm.controls['mobile_no'];
    this.dob = this.profileForm.controls['dob'];
    this.address_line_1 = this.profileForm.controls['address_line_1'];
    this.address_line_2 = this.profileForm.controls['address_line_2'];
    this.selected_gender = this.profileForm.controls['selected_gender'];
    this.selected_country = this.profileForm.controls['selected_country'];
    this.selected_state = this.profileForm.controls['selected_state'];
    this.selected_city = this.profileForm.controls['selected_city'];
    this.calendar_type = this.profileForm.controls['calendar_type'];
    this.religion = this.profileForm.controls['religion'];

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.getUserId();

    this.storage.get(ItagStorage.language).then(res => {
      this.lang = res;
    });

  }

  options(event: any) {
    this.utils.debugLog(TAG, "gen => " + this.option1);
  }

  countrySelect(count : any){
    this.utils.debugLog(TAG," country => "+count);
  }

  getCountryId(countryId){
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

  religionSelect(religion : any){
    this.utils.debugLog(TAG,"religion"+religion);
    this.religionType = religion;
  }

  calendarSelect(calendar:any){
    this.utils.debugLog(TAG,"calendar "+calendar);
    this.calendarType = calendar;
  }

  changeProfilePicture(profileUrl){
    
  }

  getUserId() {

    this.storage.get(ItagStorage.user_id).then((res) => {
      this.user_id = res;
    }).then(() => {
      this.loadProfile();
    }).then(() => {

    });
    // return this.storage.get(ItagStorage.user_id);
  }

  loadProfile() {

    //  this.user_id = this.getUserId();
    this.utils.debugLog(TAG + " user_id ", "" + this.user_id);
    let reqBody = {
      "action": "getProfile",
      "user_id": this.user_id,
    }
    this.utils.debugLog(TAG, JSON.stringify(reqBody));

    if (this.utils.checkNetWork()) {
      this.utils.showLoader("Please Wait...");
      this.commonService.getRatingList(reqBody).subscribe(res => {
        this.utils.dismissLoader();
        if (res.statuscode == 200 || res.statuscode == 201) {

          this.utils.debugLog(TAG, JSON.stringify(res));

          this.profileResponse = res.data.user_data;
          this.addressDetails = res.data.user_address;
          this.name = this.profileResponse.name;
          this.mobile = this.profileResponse.mobile;
          this.emailId = this.profileResponse.email;
         // this.dateOfBirth = this.profileResponse.dob;
          this.profileForm.get('dob').setValue(this.profileResponse.dob);
          this.profile_pic = "http://bailiwickstudioz.com/jaihoindia/images/" + this.profileResponse.profile_pic;
          if (this.profileResponse.gender === "1") {
            this.selected_gender = "Male";
            this.profileForm.get('selected_gender').setValue("Male");
          } else if (this.profileResponse.gender === "2") {
            this.selected_gender = "Female";
            this.profileForm.get('selected_gender').setValue("Female");
          }
            console.log("Rajesh check  : "+this.dateOfBirth);
          this.address_line1 = this.addressDetails.address_line1;
          this.address_line2 = this.addressDetails.address_line2;

          if (this.lang == "Hindi") {
            this.cityName = res.data.user_address.city_name_hn;
            this.stateName = res.data.user_address.state_name_hn;
          } else if (this.lang == "English") {
            this.cityName = res.data.user_address.city_name;
            this.stateName = res.data.user_address.state_name;
          }
          this.profileForm.get('selected_state').setValue(this.stateName);
          this.profileForm.get('selected_city').setValue(this.cityName);


          this.getCountry();

        } else {
          this.utils.debugLog(TAG, res.message);
          this.utils.showToast(res.message);
        }
      }, err => {
        this.utils.dismissLoader();
      })
    } else {
      this.utils.showToast("Network Not Available");
    }
  }

  updateProfile() {

    let name: string = this.name;
    let index = name.indexOf(" ");
    let fname = name.substring(0, index);
    let lname = name.substring(index + 1);

    let gen: any;
    if (this.option1 === "Male") {
      gen = 1;
    } else {
      gen = 2;
    }

    let reqBody = {
      "action": "updateProfile",
      "user_id": this.user_id,
      "fname": fname,
      "lname": lname,
      "mobile": this.mobile_no.value,
      "fcm": "kshvnolsd&^%vpgnvp;dnbipdnb;mcxv*nlb",
      "gender": gen,
      "dob": this.dob.value,
      "city_id": this.city_id,
      "address_line1": this.address_line_1.value,
      "address_line2": this.address_line_2.value,
      "religion":this.religionType,
      "calendar":this.calendarType
    }

    this.utils.debugLog(TAG, " req => " + JSON.stringify(reqBody));
    if (this.utils.checkNetWork()) {
      this.utils.showLoader("Please Wait...");
      this.commonService.getRatingList(reqBody).subscribe(res => {
        this.utils.dismissLoader();
        if (res.statuscode == 200 || res.statuscode == 201) {
          this.utils.debugLog(TAG, " update " + JSON.stringify(res));
          this.utils.showToast(res.message);
        } else {
          this.utils.debugLog(TAG, res.message);
        }
      }, err => {
        this.utils.dismissLoader();
        this.utils.debugLog(TAG, err);
        this.utils.showToast(err);
      });
    } else {
      this.utils.showToast("No Network Coverage");
    }

  }

  getCountry(){
    let reqBody = {
      "action": "getCountry"
    }

    this.utils.debugLog(TAG, " req => " + JSON.stringify(reqBody));
    if (this.utils.checkNetWork()) {
      this.utils.showLoader("Please Wait...");
      this.commonService.getRatingList(reqBody).subscribe(res => {
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
      this.commonService.getRatingList(reqBody).subscribe(res => {
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
      this.commonService.getRatingList(reqBody).subscribe(res => {
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
