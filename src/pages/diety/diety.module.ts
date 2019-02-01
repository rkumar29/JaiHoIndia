import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DietyPage } from './diety';

@NgModule({
  declarations: [
    DietyPage,
  ],
  imports: [
    IonicPageModule.forChild(DietyPage),
  ],
})
export class DietyPageModule {}
