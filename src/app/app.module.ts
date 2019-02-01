import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SplashPage } from '../pages/splash/splash';
import { StreamingMedia, StreamingVideoOptions } from '@ionic-native/streaming-media';
import { VideoPlayer } from '@ionic-native/video-player';
import { CommonServicesProvider } from '../providers/common-services/common-services';
import { HttpClientModule } from '@angular/common/http';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { Network } from '@ionic-native/network';

import { SignupPage } from '../pages/signup/signup';
import { DarshanPage } from '../pages/darshan/darshan';
import { AppPreferences } from '@ionic-native/app-preferences';
import { IonicStorageModule } from '@ionic/storage';
import { LoginRegisterPage } from '../pages/login-register/login-register';
import { SettingsPage } from '../pages/settings/settings';
import { IsDebug } from '@ionic-native/is-debug';
import { Utils } from '../itags/Utils';
import { Facebook } from '@ionic-native/facebook';
import { CategorycontentPage } from '../pages/categorycontent/categorycontent';
import { ProfilePage } from '../pages/profile/profile';
import { TranslatePage } from '../pages/translate/translate';
import { WallpaperPage } from '../pages/wallpaper/wallpaper';
import { HoroscopePage } from '../pages/horoscope/horoscope';
import { HoroscopesettingPage } from '../pages/horoscopesetting/horoscopesetting';
import { VideoplayerPage } from '../pages/videoplayer/videoplayer';
import { DemoPage } from '../pages/demo/demo';
import { EditprofilePage } from '../pages/editprofile/editprofile';
import { FaqPage } from '../pages/faq/faq';
import { TermsPage } from '../pages/terms/terms';
import { PrivacypolicyPage } from '../pages/privacypolicy/privacypolicy';
import { RatePage } from '../pages/rate/rate';
import { SocialSharing } from '@ionic-native/social-sharing';
import { FCM } from '@ionic-native/fcm';

import { OtpPage } from '../pages/otp/otp';
import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { FacebookpostsPage } from '../pages/facebookposts/facebookposts';
import { TwitterpostsPage } from '../pages/twitterposts/twitterposts';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { SuperTabsModule, SuperTabs, SuperTabsController } from 'ionic2-super-tabs'
import { PujaPage } from '../pages/puja/puja';


@NgModule({
  declarations: [
    MyApp, 
    SplashPage,
    HomePage,   
    DashboardPage,
    LoginRegisterPage,
    SignupPage ,
    DarshanPage,
    SettingsPage,
    CategorycontentPage,
    ProfilePage,
    TranslatePage,
    WallpaperPage,
    HoroscopePage, 
    HoroscopesettingPage,
    VideoplayerPage,
    DemoPage,
    EditprofilePage,
    FaqPage,
    TermsPage,
    PrivacypolicyPage,
    RatePage,
    OtpPage,
    ForgotPasswordPage,
    FacebookpostsPage,
    TwitterpostsPage,
    PujaPage
 
  ],
  imports: [ 
    BrowserModule,   
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    SuperTabsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SplashPage,
    DashboardPage, 
    LoginRegisterPage,
    SignupPage,
    DarshanPage,
    SettingsPage,
    CategorycontentPage,
    ProfilePage,
    TranslatePage, 
    WallpaperPage,
    HoroscopePage,
    HoroscopesettingPage,
    VideoplayerPage,
    DemoPage,
    EditprofilePage,
    FaqPage,
    TermsPage,
    PrivacypolicyPage, 
    RatePage,
    OtpPage,
    ForgotPasswordPage,
    FacebookpostsPage,
    TwitterpostsPage,
    PujaPage
  ], 
  providers: [
    StatusBar,
    SplashScreen,
    StreamingMedia,
    VideoPlayer,
    { provide: ErrorHandler, useClass: IonicErrorHandler }, 
    CommonServicesProvider ,
    Network, 
    AppPreferences,
    SocialSharing,
    IsDebug,
    Facebook,
    Utils, 
    SocialSharing,
    FCM,
    InAppBrowser,
    PujaPage,
    SuperTabsController   
    
  ]
})
export class AppModule { }
