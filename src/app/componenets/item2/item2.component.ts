import { Component, OnInit } from '@angular/core';
import { MetafrenzyService } from 'ngx-metafrenzy';
@Component({
  selector: 'app-item2',
  templateUrl: './item2.component.html',
  styleUrls: ['./item2.component.css']
})
export class Item2Component implements OnInit {

  constructor(private readonly metafrenzyService: MetafrenzyService) { 
    this.metafrenzyService.setTitle('My title  from component2 for mr Khaled');
    this.metafrenzyService.setMetaTag('og:title', 'open Graoh title');
    this.metafrenzyService.setMetaTag('description', "kokokokokokokokokokokokokokokokokokokokokokokokokokokokokokokokokokoko");
    this.metafrenzyService.setLinkTag({
        rel: 'canonical asdsa',
        href: 'http://localhost/'
    });
  }

  ngOnInit() {
  }

}
