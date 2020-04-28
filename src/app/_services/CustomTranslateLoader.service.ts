import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { catchError, combineAll } from 'rxjs/operators';



@Injectable()
export class CustomTranslateLoader implements TranslateLoader {
  contentHeader = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Credentials': "true",
    'Access-Control-Allow-Origin': '*',
  });

  constructor(private httpClient: HttpClient) { }
  getTranslation(lang: string): Observable<any> {
    // const apiAddress = AppConfig.API_URL + `/static/i18n/${lang}.json`;
    const apiAddress = 'local/i18n/' + lang + '.json';

    
    // return  this.httpClient.get(`/assets/i18n/ar.json`);
    
    
    return this.httpClient.get(apiAddress, { headers: this.contentHeader })
      .pipe(
        catchError(_ => this.httpClient.get('local/i18n/' + lang + '.json', { headers: this.contentHeader }
        )));
  }
}
