import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../itags/Utils';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the TwitterpostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

const TAG:string = "TwitterPostPage => "; 

@IonicPage()
@Component({
  selector: 'page-twitterposts',
  templateUrl: 'twitterposts.html',
})
export class TwitterpostsPage {

  guruName:any;
  twitterLink:any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public util:Utils,private sanitize: DomSanitizer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TwitterpostsPage');
  }

  ionViewWillEnter(){
    this.guruName = this.navParams.get('guru_name');
    this.twitterLink = this.navParams.get('twitterLink');
    this.util.debugLog(TAG,"guru"+this.guruName+" &"+this.twitterLink);
    this.twitterLink = this.sanitize.bypassSecurityTrustResourceUrl(this.twitterLink);

  }


}
