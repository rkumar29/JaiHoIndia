import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FacebookpostsPage } from './facebookposts';

@NgModule({
  declarations: [
    FacebookpostsPage,
  ],
  imports: [
    IonicPageModule.forChild(FacebookpostsPage),
  ],
})
export class FacebookpostsPageModule {}
