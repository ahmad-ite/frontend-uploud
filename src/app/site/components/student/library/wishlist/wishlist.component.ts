import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../../../../services/app.service';
import { Course, Pager } from '../../../../../_models/loadData';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../../../services/dialog.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { VgAPI } from 'videogular2/compiled/core';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class WishlistComponent implements OnInit {
  interestedCoursesArr: Course[];
  noData: any = false;
  api: any;
  playVideoOnHover: any;
  langStyle: any;
  pager: Pager;
  loadGifLoader: any = true;
  courseGifLoader: boolean = false;

  constructor(
    public dialogService: DialogService,
    public app_ser: AppService,
    public route: ActivatedRoute,
    public router: Router,
    private ngxService: NgxUiLoaderService,
    public translate: TranslateService
  ) {
    this.pager = new Pager();
    this.interestedCoursesArr = [];
    this.langStyle = "wrapper-my-wishlist-lang-" + this.app_ser.app_lang();
    this.loadPage(1);
  }

  ngOnInit() {
  }


  loadPage(page) {
    this.loadGifLoader = true;
    this.noData = false;
    this.ngxService.start();
    var data1 = { page: page - 1, size: 12 }
    this.pager = new Pager();
    this.app_ser.post("site_feed/UserCourse/interested_rows", { data: data1 }).subscribe(
      data => {
        this.loadGifLoader = false;
        this.ngxService.stop();
        this.pager = this.app_ser.paginate(data.total, data.page + 1, data.size);
        this.noData = true;
        this.interestedCoursesArr = data.rows;
      },

      error => {


      });
  }
  onChangePage(page) {
    this.loadPage(page);
  }
  showVideoOnOver(course) {
    this.courseGifLoader = true;
    this.playVideoOnHover = course.id;
  }

  hideVideoOnOver() {
    this.playVideoOnHover = 0
    this.courseGifLoader = false;
  }
  setFavourite(course) {
    this.app_ser.isStudentLogined().then(res => {
      if (res) {

        if (course.is_interested) {
          this.app_ser.post("site_feed/UserCourse/delete_interested/" + course.id, {}).subscribe(
            data => {
              course.is_interested = 0;
              this.checkPager()

            })
        }
        else {
          this.app_ser.post("site_feed/UserCourse/add_interested/" + course.id, {}).subscribe(
            data => {
              course.is_interested = 1;
            })
        }
      }

    });


    // course.is_interested = !course.is_interested;

  }
  checkPager() {
    if (this.interestedCoursesArr.length == 1 && this.pager.currentPage > 1) {
      return this.loadPage(this.pager.currentPage - 1);
    }
    return this.loadPage(this.pager.currentPage);
  }


  onPlayerReady(api: VgAPI, course) {

    api.volume = 0;
    this.api = api;
    this.api.volume = 0;
    course.volume = 0;
  }

  stopCourseLoader() {
    if (this.api && this.api.getDefaultMedia()) {
      if (this.api.getDefaultMedia().currentTime >= 0.1) {

        this.courseGifLoader = false;
      }

    }
  }
  muteAndPlay(course) {
    this.api.volume = !this.api.volume;
    course.volume = this.api.volume;

  }
}
