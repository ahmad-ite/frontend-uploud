import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';


@Component({
  selector: 'app-live-streaming',
  templateUrl: './live-streaming.component.html',
  styleUrls: ['./live-streaming.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LiveStreamingComponent implements OnInit {
  langStyle: any;
  active_item_index: any;
  opacityShowHide: any = 'hideItemSummary';
  sessionData = [
    {
      title : 'عنوان الجلسة',
      date: '02-02-2020',
      type: 'شغل الفيديو',
      is_archived: 'نعم'
    },
    {
      title : 'عنوان الجلسة',
      date: '02-02-2020',
      type: 'شغل الفيديو',
      is_archived: 'نعم'
    },
    {
      title : 'عنوان الجلسة',
      date: '02-02-2020',
      type: 'شغل الفيديو',
      is_archived: 'نعم'
    },
    {
      title : 'عنوان الجلسة',
      date: '02-02-2020',
      type: 'شغل الفيديو',
      is_archived: 'نعم'
    },
    {
      title : 'عنوان الجلسة',
      date: '02-02-2020',
      type: 'شغل الفيديو',
      is_archived: 'نعم'
    },
    {
      title : 'عنوان الجلسة',
      date: '02-02-2020',
      type: 'شغل الفيديو',
      is_archived: 'نعم'
    },
    {
      title : 'عنوان الجلسة',
      date: '02-02-2020',
      type: 'شغل الفيديو',
      is_archived: 'نعم'
    },
    {
      title : 'عنوان الجلسة',
      date: '02-02-2020',
      type: 'شغل الفيديو',
      is_archived: 'نعم'
    },
    {
      title : 'عنوان الجلسة',
      date: '02-02-2020',
      type: 'شغل الفيديو',
      is_archived: 'نعم'
    },
    {
      title : 'عنوان الجلسة',
      date: '02-02-2020',
      type: 'شغل الفيديو',
      is_archived: 'نعم'
    }
  ];
  itemMouseOverIndex: any;
  constructor(
    public app_ser: AppService,
    public route: ActivatedRoute,
    public router: Router,
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal,
  ) { 
    this.langStyle = "live-streaming-main-" + this.app_ser.app_lang();
    this.active_item_index = 2;
    
  }

  ngOnInit() {
  }
  changeStyle($event: any, itemMouseOverIndex) {
    if ($event.type == 'mouseenter') {
      this.opacityShowHide = this.stepLessonLastItemsClass(itemMouseOverIndex);
      this.itemMouseOverIndex = itemMouseOverIndex;
    }
    else {
      this.opacityShowHide = 'hideItemSummary' + ' ' + this.stepLessonLastItemsClass(itemMouseOverIndex);
      
    }
    // this.opacityShowHide = ($event.type == 'mouseenter') ? ((itemMouseOverIndex > this.items.length / 2) ? 'lastLessonItem' : 'showItemSummary') : 'hideItemSummary';
    // this.itemMouseOverIndex = itemMouseOverIndex;
  }
  stepLessonLastItemsClass(index) {
    var l = 5;
    var length = this.sessionData.length;
    if (length >= l) {
      if (index > length - 6) {
        return 'lastLessonItem'
      }
      else {
        return 'showItemSummary'
      }
    }
    else {
      return 'showItemSummary'
    }
  }
}
