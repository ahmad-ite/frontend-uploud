import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../../../../services/app.service';
import { Course, Pager } from '../../../../../_models/loadData';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../../../services/dialog.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { VgAPI } from 'videogular2/compiled/core';
// import paginate = require('jw-paginate');
@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.component.html',
  styleUrls: ['./my-courses.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MyCoursesComponent implements OnInit {
  mycourses: Course[];
  noData: any = true;
  api: any;
  playVideoOnHover: any;
  langStyle: any;
  pager: Pager;
  items = [];
  pageOfItems: Array<any>;
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

    this.mycourses = [];
    this.loadPage(1)
    this.langStyle = "wrapper-my-courses-lang-" + this.app_ser.app_lang();
  }
  ngOnInit() {
  }

  loadPage(page) {
    this.mycourses = [];
    // this.ngxService.start();
    // this.ngxService.startLoader('loader-01')
    var data1 = { page: page - 1, size: 12 }
    this.noData = false;
    this.loadGifLoader = true;
    this.pager = new Pager();
    this.app_ser.post("site_feed/UserCourse/my_courses", { data: data1 }).subscribe(
      data => {
        // this.ngxService.stop();
        this.loadGifLoader = false;
        // this.ngxService.stopLoader('loader-01')
        this.pager = this.app_ser.paginate(data.total, data.page + 1, data.size);
        this.noData = true;
        this.mycourses = data.rows;
      },

      error => {
        this.loadGifLoader = false;


      });
  }
  onChangePage(page) {
    this.loadPage(page);
  }
  stopCourseLoader() {
    if (this.api && this.api.getDefaultMedia()) {
      if (this.api.getDefaultMedia().currentTime >= 0.1) {

        this.courseGifLoader = false;
      }

    }
  }
  showVideoOnOver(course) {
    this.courseGifLoader = true;
    this.playVideoOnHover = course.register_id;


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


  }


  onPlayerReady(api: VgAPI, course) {

    api.volume = 0;
    this.api = api;
    this.api.volume = 0;
    course.volume = 0;
  }
  muteAndPlay(course) {
    this.api.volume = !this.api.volume;
    course.volume = this.api.volume;

  }

}
