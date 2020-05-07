
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { Course, Pager } from 'src/app/_models/loadData';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-trainer-courses',
  templateUrl: './trainer-courses.component.html',
  styleUrls: ['./trainer-courses.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrainerCoursesComponent implements OnInit {
  langStyle: any;
  @Input() shadows = true;
  mycourses: Course[];






  private sorted = false;
  pager: Pager;
  noData: boolean;
  loadGifLoader: boolean;
  constructor(
    public globals: Globals,
    public app_ser: AppService,
    public translate: TranslateService,
    public route: ActivatedRoute,
    public router: Router,
  ) {
    this.mycourses = [];
    this.pager = new Pager();
    this.loadPage(1);
    this.langStyle = "wrapper-trainer-courses-" + this.app_ser.app_lang();
    // console.log("temp ", this.globals.subCategoriesDic, this.globals.templatesDic)

    // app_ser.stringLang(template.name, template.en_name)
  }

  ngOnInit() {
  }

  sortBy(by: string | any): void {


    this.mycourses.sort((a: any, b: any) => {
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

  loadPage(page) {
    this.mycourses = [];
    var data1 = { page: page - 1, size: 10 }
    this.noData = false;
    this.loadGifLoader = true;
    this.pager = new Pager();
    this.app_ser.post("site_feed/TrainerCourse/index", { data: data1 }).subscribe(
      data => {
        this.loadGifLoader = false;
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

  delete(courseId) {
    alert(courseId)
  }
  addCourse(id) {


    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigate(["/trainer/courses/add", id]);

  }

}
