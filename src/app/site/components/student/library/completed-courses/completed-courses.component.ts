import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../../../../services/app.service';
import { Course, Pager } from '../../../../../_models/loadData';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../../../services/dialog.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { VgAPI } from 'videogular2/compiled/core';

@Component({
  selector: 'app-completed-courses',
  templateUrl: './completed-courses.component.html',
  styleUrls: ['./completed-courses.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CompletedCoursesComponent implements OnInit {
  mycourses: Course[];
  noData: any = false;
  api: any;
  langStyle: any;
  pager: Pager;
  playVideoOnHover: any;
  loadGifLoader: any = true;
  constructor(
    public dialogService: DialogService,
    public app_ser: AppService,
    public route: ActivatedRoute,
    public router: Router,
    private ngxService: NgxUiLoaderService
  ) {
    this.pager = new Pager();
    this.mycourses = [];

    this.langStyle = "wrapper-completed-courses-lang-" + this.app_ser.app_lang();
    this.loadPage(1);
  }


  ngOnInit() {
  }

  loadPage(page) {
    this.ngxService.start();
    var data1 = { page: page - 1, size: 12 }
    this.pager = new Pager();
    this.app_ser.post("site_feed/UserCourse/my_completed_courses", { data: data1 }).subscribe(
      data => {
        this.loadGifLoader = false;
        this.ngxService.stop();
        this.pager = this.app_ser.paginate(data.total, data.page + 1, data.size);
        this.noData = true;
        this.mycourses = data.rows;
      },

      error => {


      });
  }
  onChangePage(page) {
    this.loadPage(page);
  }

  myCourses() {

    this.app_ser.post("site_feed/UserCourse/my_completed_courses", {}).subscribe(
      data => {
        this.ngxService.stop();
        this.noData = true;
        this.mycourses = data.rows;

      },
      error => {
        // this.toastr.error(error.error.message, 'Error');

      });


    // this.router.navigate(["dashboard/"+id]);
  }

  showVideoOnOver(course) {
    // this.appVideoApi.pause();
    this.playVideoOnHover = course.register_id;
    // this.muteAndPlay(course);
    // this.api.volume = 0;

  }

  hideVideoOnOver() {
    this.playVideoOnHover = 0


  }
  issueCertificate(course: Course) {

    this.playVideoOnHover = 0

    if (course.certificate) {
      this.app_ser.showPdf(course.certificate);
      return
    }
    this.app_ser.openInpuCertificate().then(res => {
      if (res) {
        this.loadGifLoader = true;

        this.app_ser.post("site_feed/UserCourse/issue_certificate/" + course.register_id, { name: res }).subscribe(
          data => {
            this.loadGifLoader = false;
            course.certificate = data;
            this.app_ser.showPdf(data);

          })
      }
    });




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

