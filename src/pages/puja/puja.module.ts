import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PujaPage } from './puja';
import { SuperTabsModule } from 'ionic2-super-tabs';

@NgModule({
  declarations: [
    PujaPage,
  ],
  imports: [
    IonicPageModule.forChild(PujaPage),
    SuperTabsModule 
  ],   
})
export class PujaPageModule {}
  