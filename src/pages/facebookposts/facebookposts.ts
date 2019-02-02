import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Utils } from '../../itags/Utils';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the FacebookpostsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const TAG: string = "FacebookPostPage => ";

@IonicPage()
@Component({
  selector: 'page-facebookposts',
  templateUrl: 'facebookposts.html',
})
export class FacebookpostsPage {

  guruName: any;
  facebookLink: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public util: Utils, public iab: InAppBrowser, private sanitize: DomSanitizer) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FacebookpostsPage');
  }

  ionViewWillEnter() {
    this.guruName = this.navParams.get('guru_name');
    this.facebookLink = this.navParams.get('fbLink');
    if (this.facebookLink != null) {
      this.util.debugLog(TAG, "guru" + this.guruName + " &" + this.facebookLink);
      this.facebookLink = this.sanitize.bypassSecurityTrustResourceUrl(this.facebookLink);
    }

  }

  /* urlpaste(){
    this.url = "https://hackerrankgeek.wordpress.com/";
    return this.sanitize.bypassSecurityTrustResourceUrl(this.my_url);
  }
 */

}
