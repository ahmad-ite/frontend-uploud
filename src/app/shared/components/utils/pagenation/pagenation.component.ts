
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { Pager } from 'src/app/_models/loadData';

// import paginate = require('jw-paginate');
@Component({
  selector: 'jw-pagination',
  templateUrl: './pagenation.component.html',
  styleUrls: ['./pagenation.component.scss']
})
export class PagenationComponent implements OnInit {

  @Output() changePage = new EventEmitter<any>(true);
  @Input() pager: Pager;

  constructor(public app_ser: AppService) {

  }

  ngOnInit() {

  }

  setPage(page: number) {
    this.changePage.emit(page);
  }
}
