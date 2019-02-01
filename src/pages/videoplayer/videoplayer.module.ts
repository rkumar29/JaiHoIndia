import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VideoplayerPage } from './videoplayer';

@NgModule({
  declarations: [
    VideoplayerPage,
  ],
  imports: [
    IonicPageModule.forChild(VideoplayerPage),
  ],
})
export class VideoplayerPageModule {}
