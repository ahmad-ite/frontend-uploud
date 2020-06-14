import { Component, OnInit, isDevMode } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { TranslateService } from "@ngx-translate/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { TooltipModule, ButtonsModule, WavesModule } from 'ng-uikit-pro-standard'
import { Router } from "@angular/router";
import { fromEvent } from "rxjs";
import { filter, map } from "rxjs/operators";
import { Observable } from "rxjs/Rx";



@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {

  cssUrl: string;
  loaded: boolean;

  constructor(

    private router: Router,
    public translate: TranslateService,


    public sanitizer: DomSanitizer
  ) {
    this.loaded = true;




  }

  ngOnInit() {

  }



  title = "ang8";
}
