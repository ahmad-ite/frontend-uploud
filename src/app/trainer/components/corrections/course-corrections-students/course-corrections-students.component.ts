
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { ListOption, Course, Pager, Student } from 'src/app/_models/loadData';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-corrections-students',
  templateUrl: './course-corrections-students.component.html',
  styleUrls: ['./course-corrections-students.component.scss']
})
export class CourseCorrectionsStudentsComponent implements OnInit {

  langStyle: any;
  @Input() shadows = true;
  students: Student[];

  private sorted = false;
  pager: Pager;
  options: ListOption;
  courseId: any;
  constructor(

    public app_ser: AppService,
    public translate: TranslateService,
    public route: ActivatedRoute,
    public router: Router,
  ) {
    // alert(111);

    this.courseId = parseInt(this.route.snapshot.params['courseId'] ? this.route.snapshot.params['courseId'] : 34);

    this.options = new ListOption();
    this.students = [];
    this.pager = new Pager();
    this.options.page = 0;
    this.loadPage();

    this.langStyle = "wrapper-trainer-courses-" + this.app_ser.app_lang();


  }

  ngOnInit() {
  }

  sortBy(by: string | any): void {
    
    // this.options.ordering(by);
    
    // this.loadPage();

    this.students.sort((a: any, b: any) => {
      if (a[by] < b[by]) {
        return this.sorted ? 1 : -1;
      }
      if (a[by] > b[by]) {
        return this.sorted ? -1 : 1;
      }

      return 0;
    });

    this.sorted = !this.sorted;
  }
  loadPage(page = null) {

    // this.ngxService.start();
    // this.ngxService.startLoader('loader-01')
    var data1 = { page: this.options.page, size: this.options.size, order_by: this.options.order }


    this.app_ser.post("site_feed/TrainerCourse/course_correction_students/" + this.courseId, { data: data1 }).subscribe(
      data => {
        
        // this.ngxService.stopLoader('loader-01')
        this.pager = this.app_ser.paginate(data.total, data.page + 1, data.size);
        this.students = data.rows;
      },
      error => {
        
      });
  }
  onChangePage(page) {
    this.options.page = page - 1;
    this.loadPage();
  }
  corrections(stdId) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigate(["trainer/corrections/" + this.courseId + "/student/" + stdId + "/answers"]);

  }

}
