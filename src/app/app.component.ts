import { Component, OnInit, isDevMode } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TooltipModule, ButtonsModule, WavesModule } from 'ng-uikit-pro-standard'
import { Router } from "@angular/router";
import { fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Observable } from "rxjs/Rx";
import { AuthenticationService, UserService } from "./_services";
import { DataService } from "./_services/data.service";
import { Globals } from './globals'
import { AppService } from './services/app.service';
import { User, response } from "./_models";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  currentUser: User;
  cssUrl: string;
  loaded: boolean;

  constructor(
    public app_ser: AppService,
    private router: Router,
    public translate: TranslateService,
    private authenticationService: AuthenticationService,
    private dataService: DataService,
    public globals: Globals,
    public sanitizer: DomSanitizer
  ) {
    this.loaded = false;
    translate.setDefaultLang("ar");


    this.loadTrans();
    this.loadNationalities();
    this.loadInstructions();

    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );
  }

  ngOnInit() {

  }


  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  loadTrans() {
    setTimeout(() => {
      this.dataService.getTranslationData().subscribe(
        response => {
          this.translate.setTranslation("en", response.data.en);
          this.translate.setTranslation("ar", response.data.ar);
          this.loaded = true;
        },

        err => {
          
        }
      );
    }, 1);
  }
  loadNationalities() {
    this.app_ser.post("site_feed/Home/nationalities", {}).subscribe(
      res => {
        this.globals.ar_nationalities = res.ar;
        this.globals.en_nationalities = res.en;

      });
  }

  loadInstructions() {
    this.app_ser.post("site_feed/Home/instructions", {}).subscribe(
      res => {
        this.globals.ar_instructions = res.ar;
        this.globals.en_instructions = res.en;

      });
  }
  appLang() {
    return this.translate.getDefaultLang();
  }

  changedLang() {
    let lang = this.translate.getDefaultLang();
    
    if (lang == "ar") {
      this.translate.setDefaultLang("en");
      this.cssUrl = "src/scss/ar-global.scss";
     
    } else {
      this.translate.setDefaultLang("ar");
      this.cssUrl = "src/scss/en-global.scss";
     
    }
    
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(["/login"]);
  }

  getFileUploadHeader() {
    const token = sessionStorage.getItem("token");
    const headers = new HttpHeaders({
      // Angular's HttpHeader
      "Content-Type": "multipart/form-data",
      Accept: "application/json", // some google searches suggested i drop this but it still doesnt work
      Authorization: "Bearer " + token
    });
    return headers;
  }
  title = "ang8";
}
