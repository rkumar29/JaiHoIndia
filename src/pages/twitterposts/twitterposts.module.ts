import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TwitterpostsPage } from './twitterposts';

@NgModule({
  declarations: [
    TwitterpostsPage,
  ],
  imports: [
    IonicPageModule.forChild(TwitterpostsPage),
  ],
})
export class TwitterpostsPageModule {}
