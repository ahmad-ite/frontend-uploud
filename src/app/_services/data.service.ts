import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs/Rx"
import { map } from 'rxjs/operators';
// import 'core-js/es7/object';
@Injectable({ providedIn: 'root' })
export class DataService {
  constructor(private http: HttpClient

  ) { }

  public getTranslationData() {
    return this.http.post<any>(`site_feed/Home/all_keys`, {}).pipe(
      map(response => response
      ));
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
      ))

      ;
  }

}

