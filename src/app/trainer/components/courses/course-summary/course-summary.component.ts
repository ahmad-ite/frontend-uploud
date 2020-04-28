
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { Course, Pager, CourseView } from 'src/app/_models/loadData';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-summary',
  templateUrl: './course-summary.component.html',
  styleUrls: ['./course-summary.component.scss']
})
export class CourseSummaryComponent implements OnInit {
  langStyle: any;
  id: any;

  courseItems: any[];
  courseInfo: CourseView;

  constructor(
    public app_ser: AppService,
    private toastr: ToastrService,
    private translate: TranslateService,
    public route: ActivatedRoute,
    public router: Router,
  ) {
    this.courseInfo = new CourseView();
    this.courseItems = [];
    this.langStyle = "wrapper-trainer-course-summary-" + this.app_ser.app_lang();
    this.id = this.route.snapshot.params['courseId'];
    this.initData();
  }
  shadows: boolean = true;

  initData() {

    this.app_ser.post("site_feed/TrainerCourse/view/" + this.id, {}).subscribe(
      data => {
        this.courseInfo = data.row;
        this.courseItems = data.items;

      },
      error => {
      });
  }

  ngOnInit() {
  }

  sortBy(m = "") {

  }

}
