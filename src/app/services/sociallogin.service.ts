

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class SocialloginService {
  constructor(private http: HttpClient) { }
  Savesresponse(responce) {

    var postData: any = new FormData();
    postData.append('email', responce.email);
    postData.append('token', responce.token);
    postData.append('name', responce.name);
    postData.append('image', responce.image);
    //site_feed/Home/all_keys
    return this.http.post("site_feed/account/login_social", postData);
  }
  post(url: string, params: object) {
    var postData: any = new FormData();
    if (params) {
      const keys = Object.entries(params)
      for (const [key, value] of keys) {
        postData.append(key, value);
      }
    }
    return this.http.post<any>("site_feed/course/load_data", {}).pipe(
      map(response => response
      ));
  }
}
