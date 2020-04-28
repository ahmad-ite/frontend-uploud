import { Component, OnInit } from '@angular/core';
import { VgAPI } from 'videogular2/compiled/core';
import { Course, SearchResult, SearchRow } from 'src/app/_models/loadData';
import { DialogService } from 'src/app/services/dialog.service';
import { AppService } from 'src/app/services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  courses: SearchRow[];
  noData: any = false;
  api: any;
  playVideoOnHover: any;
  langStyle: any;
  query: string;
  constructor(
    public dialogService: DialogService,
    public app_ser: AppService,
    public route: ActivatedRoute,
    public router: Router,
    private ngxService: NgxUiLoaderService,
    public translate: TranslateService
  ) {
    this.ngxService.start();
    this.courses = [];
    this.query = this.route.snapshot.params['query'] ? this.route.snapshot.params['query'] : ""
    this.myResult();
    this.langStyle = "wrapper-my-courses-lang-" + this.app_ser.app_lang();

  }
  ngOnInit() {
  }

  myResult() {
    var params = {
      search: this.query,
    }

    this.app_ser.post("site_feed/Search/search", params).subscribe(
      data => {
        this.ngxService.stop();
        this.noData = true;
        this.courses = data.rows;
      },
      error => {
        // this.toastr.error(error.error.message, 'Error');

      });


    // this.router.navigate(["dashboard/"+id]);
  }
  showVideoOnOver(course) {
    // this.appVideoApi.pause();
    this.playVideoOnHover = course.entity_id;
    // this.muteAndPlay(course);
    // this.api.volume = 0;

  }

  hideVideoOnOver() {
    this.playVideoOnHover = 0


  }
  setFavourite(course) {
    this.app_ser.isStudentLogined().then(res => {
      if (res) {

        if (course.is_interested) {
          this.app_ser.post("site_feed/UserCourse/delete_interested/" + course.entity_id, {}).subscribe(
            data => {
              course.is_interested = 0;

            })
        }
        else {
          this.app_ser.post("site_feed/UserCourse/add_interested/" + course.entity_id, {}).subscribe(
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
