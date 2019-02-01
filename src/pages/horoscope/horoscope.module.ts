import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HoroscopePage } from './horoscope';

@NgModule({
  declarations: [
    HoroscopePage,
  ],
  imports: [
    IonicPageModule.forChild(HoroscopePage),
  ],
})
export class HoroscopePageModule {}
