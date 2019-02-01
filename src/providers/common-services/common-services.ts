import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { UtilsUrl } from '../../itags/UtilsUrl';
/*
  Generated class for the CommonServicesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

const httpOptions = {
  headers: new HttpHeaders({
    'KEY': 'NMSSKECHEETE',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Accept, Content-Type, Access-Control-Allow-Headers, Key, X-Requested-With'
    
    // "Access-Control-Allow-Origin": "*",
    // "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
    // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type,Key, Accept, Authorization",
    // 'KEY': 'NMSSKECHEETE',
    // 'Accept': 'application/json',
    // 'Content-Type': 'application/json',
  })
};


@Injectable()
export class CommonServicesProvider {
  public Base_URL: string;
  private api_url_1: string;
 // public static BASE_URL_IMAGE="http://bailiwickstudioz.com/jaihoindia/images/";


  constructor(public http: HttpClient) {
    console.log('Hello CommonServicesProvider Provider');
  }
  getRatingList(requestBody): Observable<any> {
    //  return this.http.post( "http://157.119.91.195:15000/salesforceapi/loginRequest",JSON.stringify(requestBody),httpOptions).retry(1).pipe(map(this.extractData),
    return this.http.post("http://bailiwickstudioz.com/jaihoindia/apis/apis.php", JSON.stringify(requestBody), httpOptions).retry(1).pipe(map(this.extractData),

      catchError(this.handleError));
  }

  // facebook

  //fblogin
  fetchFacebookResponse(id, fbToken): Observable<any> {
    let graphUrl = "https://graph.facebook.com/v3.2/" + id + "?fields=id,name,email,birthday,gender&access_token=" + fbToken;
    return this.http.get(graphUrl).pipe(map(this.extractData), catchError(this.handleError));
  }

  getDashboard(requestBody): Observable<any> {
    return this.http.post(UtilsUrl.base_url, JSON.stringify(requestBody), httpOptions).retry(1).pipe(map(this.extractData),

      catchError(this.handleError));
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }


  // Handler
  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }

    return Observable.throw(errMsg);
  }

}
