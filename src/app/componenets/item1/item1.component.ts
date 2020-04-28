import { Component, OnInit } from '@angular/core';
import { MetafrenzyService } from 'ngx-metafrenzy';
import { TranslateService } from '@ngx-translate/core';
import { Globals } from '../../globals'
@Component({
  selector: 'app-item1',
  templateUrl: './item1.component.html',
  styleUrls: ['./item1.component.css']
})
export class Item1Component implements OnInit {

  constructor(private readonly metafrenzyService: MetafrenzyService,
    private translate: TranslateService, public globals: Globals) {


    this.metafrenzyService.setTitle('My title  from component ooooooooooo');
    this.metafrenzyService.setMetaTag('og:title', 'open Graph for item 11');
    this.metafrenzyService.setMetaTag('description', 'description description descriptiondescriptiondescriptiondescription');
    this.metafrenzyService.setLinkTag({
      rel: 'canonical asdsa',
      href: 'http://localhost/'
    });
  }

  ngOnInit() {
  }

  changedLang() {
    let lang = this.translate.getDefaultLang();

    if (lang == "ar")
      this.translate.setDefaultLang('en');
    else
      this.translate.setDefaultLang('ar');
  }

}
