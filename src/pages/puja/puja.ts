import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SuperTabs } from 'ionic2-super-tabs';
import { Utils } from '../../itags/Utils';
import { CommonServicesProvider } from '../../providers/common-services/common-services';


const TAG:string = "Pooja Page => ";

@IonicPage()
@Component({
  selector: 'page-puja',
  templateUrl: 'puja.html',
})
export class PujaPage {

  pages = [
    {pageName:'DailyPage',icon:'flame',title:'Daily',id:'dailyTab'},
    {pageName:'FestivalPage',icon:'help-circle',title:'Festival',id:'festivalTab'},
    {pageName:'DietyPage',icon:'body',title:'Diety',id:'dietyTab'}
  
  ];

  selectedTab = 0;  

  @ViewChild(SuperTabs) superTabs:SuperTabs;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public utils:Utils,public service:CommonServicesProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PujaPage');
  }

  onTabSelected(ev:any){
    this.selectedTab = ev.index;
  }

  ionViewWillEnter(){
    this.getPoojaData();
  }

  getPoojaData(){
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

  }



}
