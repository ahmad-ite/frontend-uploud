
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { ListOption, Course, Pager } from 'src/app/_models/loadData';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from 'src/app/globals';

@Component({
  selector: 'app-correction-index',
  templateUrl: './correction-index.component.html',
  styleUrls: ['./correction-index.component.scss']
})
export class CorrectionIndexComponent implements OnInit {

  langStyle: any;
  @Input() shadows = true;
  mycourses: Course[];
  tableData: object[] = [
    { first: 'Mark', last: 'Otto', username: '@mdo', email: 'markotto@gmail.com', country: 'USA', city: 'San Francisco' },
    { first: 'Jacob', last: 'Thornton', username: '@fat', email: 'jacobt@gmail.com', country: 'France', city: 'Paris' },
    { first: 'Larry', last: 'the Bird', username: '@twitter', email: 'larrybird@gmail.com', country: 'Germany', city: 'Berlin' },
    { first: 'Paul', last: 'Topolski', username: '@P_Topolski', email: 'ptopolski@gmail.com', country: 'Poland', city: 'Warsaw' },
    { first: 'Anna', last: 'Doe', username: '@andy', email: 'annadoe@gmail.com', country: 'Spain', city: 'Madrid' }
  ];

  dateOptionsSelect: object[] = [
    { value: '1', label: 'Today' },
    { value: '2', label: 'Yesterday' },
    { value: '3', label: 'Last 7 days' },
    { value: '4', label: 'Last 30 days' },
    { value: '5', label: 'Last week' },
    { value: '6', label: 'Last month' }
  ];

  templateList: object[] = [
    { value: '1', label: 'Master Class' },
    { value: '2', label: 'Interactive' },
    { value: '3', label: 'Audio Courses' }
  ];
  categoriesList: object[] = [
    { value: '1', label: 'تصميم' },
    { value: '2', label: 'تدريب' },
    { value: '3', label: 'إعلام' }
  ];

  showOnlyOptionsSelect: object[] = [
    { value: '1', label: 'All (2000)' },
    { value: '2', label: 'Never opened (200)' },
    { value: '3', label: 'Opened but unanswered (1800)' },
    { value: '4', label: 'Answered (200)' },
    { value: '5', label: 'Unsunscribed (50)' }
  ];

  filterOptionsSelect: object[] = [
    { value: '1', label: 'Contacts in no segments (100)' },
    { value: '2', label: 'Segment 1  (2000)' },
    { value: '3', label: 'Segment 2  (1000)' },
    { value: '4', label: 'Segment 3  (4000)' }
  ];

  private sorted = false;
  pager: Pager;
  options: ListOption;
  constructor(
    public globals: Globals,
    public app_ser: AppService,
    public translate: TranslateService,
    public route: ActivatedRoute,
    public router: Router,
  ) {

    this.options = new ListOption();
    this.mycourses = [];
    this.pager = new Pager();
    this.options.page = 0;
    this.loadPage();

    this.langStyle = "wrapper-trainer-courses-" + this.app_ser.app_lang();


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
  loadPage(page = null) {

    // this.ngxService.start();
    // this.ngxService.startLoader('loader-01')
    var data1 = { page: this.pager.currentPage, size: this.pager.pageSize, }


    this.app_ser.post("site_feed/TrainerCourse/courses_corrections", { data: data1 }).subscribe(
      data => {
       
        // this.ngxService.stopLoader('loader-01')
        this.pager = this.app_ser.paginate(data.total, data.page + 1, data.size);
        this.mycourses = data.rows;
      },
      error => {
      });
  }
  onChangePage(page) {
    this.pager.currentPage = page - 1;
    this.loadPage();
  }

  students(courseId) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigate(["trainer/corrections/" + courseId + "/students"]);

  }



}
