import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Globals } from '../globals'
import { User } from '../_models';
import { HttpParams } from "@angular/common/http";
import { userInfo } from 'os';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../services/app.service';
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private toastr: ToastrService, private http: HttpClient, public globals: Globals,
    private translate: TranslateService, public app_ser: AppService, ) {


    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }
  getFormUrlEncoded(toConvert) {
    const formBody = [];
    for (const property in toConvert) {
      const encodedKey = encodeURIComponent(property);
      const encodedValue = encodeURIComponent(toConvert[property]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    return formBody.join('&');
  }
  login_social(responce) {
    
    var postData: any = new FormData();
    postData.append('email', responce.email);
    postData.append('name', responce.name);
    postData.append('image', responce.image);

    return this.http.post<any>("site_feed/account/login_social", postData)
      .pipe(map(user => {
        
        if (user.error) {


          this.toastr.error(this.translate.instant(user.msg), this.translate.instant('error'));
          throw user.msg;

        }

        if (user && user.data.token) {
          localStorage.setItem('currentUser', JSON.stringify(user.data));
          this.currentUserSubject.next(user);
          this.globals.role = 1
        }
        return user.data;

      }));
  }


  login(email: string, password: string) {

    var postData: any = new FormData();
    postData.append('email', email);
    postData.append('pwd', password);
    // let data=this.getFormUrlEncoded({email: 'value'});
    return this.http.post<any>(`site_feed/Account/log_in`, postData)
      .pipe(map(data => {
        if (data.error) {
          if (data.error == 199) {
            this.app_ser.openEmailAuthentication(email);
            return { emailAuth: true };

          }
          else {
            this.toastr.error(data.msg, 'Error');
            throw data.msg;
            return
          }



        }
        else {
          
          if (data && data.data.token) {
            // store user details in local storage to keep user logged in
            localStorage.setItem('currentUser', JSON.stringify(data.data));
            this.currentUserSubject.next(data);

            if (data.data.is_trainer)
              this.globals.role = 2
            else
              this.globals.role = 1
          }
          return data.data;
        }




      }, this));
  }

  logout() {
    // remove user data from local storage for log out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.globals.role = 0
  }
}
