import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Student, DashboardInfo, Course } from '../../../../_models/loadData';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class DashboardComponent implements OnInit {

  langStyle: any;
  public coursesSummary: Course[];

  // CORRECTIONS DATA START
  public chartTypeCorrections: string = 'line';


  public chartDatasetsCorrections: Array<any> = [
    { data: [65, 59, 80, 81, 56, 55, 40, 69, 23, 63, 21, 55, 10, 40], label: 'فحص التصحيحات' },
    { data: [28, 48, 40, 19, 86, 27, 80, 28, 48, 55, 40, 86, 27, 90], label: 'لم يتم التحقق من التصحيحات' }
  ];



  public chartLabelsCorrections: Array<any> = ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونية', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'];

  public chartColorsCorrections: Array<any> = [
    {
      backgroundColor: 'rgba(105, 0, 132, .2)',
      borderColor: 'rgba(200, 99, 132, .7)',
      borderWidth: 2,
    },
    {
      backgroundColor: 'rgba(0, 137, 132, .2)',
      borderColor: 'rgba(0, 10, 130, .7)',
      borderWidth: 2,
    }
  ];

  public chartOptionsCorrections: any = {
    responsive: true
  };
  // CORRECTIONS DATA END


  // PASSED AND FAILED STUDENTS DATA START

  public chartTypePassingRatio: string = 'pie';

  public chartDatasetsPassingRatio: Array<any> = [
    { data: [0, 0], label: 'Students Data' }
  ];

  public chartLabelsPassingRatio: Array<any> = ['الطلاب الذين لم ينتهوا من الدورات', 'الطلاب الذين أنهوا الدورات',];

  public chartColorsPassingRatio: Array<any> = [
    {
      backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C'],
      hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870'],
      borderWidth: 2,
    }
  ];

  public chartOptionsPassingRatio: any = {
    responsive: true
  };


  // PASSED AND FAILED STUDENTS DATA END


  // EARNINGS DATA START
  public chartTypeEarnings: string = 'bar';

  public chartDatasetsEarnings: Array<any> = [
    { data: [5000, 7000, 15000, 21000, 10000, 13000, 5000, 7000, 23000, 21000, 10000, 13000], label: 'مال مكستب' }
  ];

  public chartLabelsEarnings: Array<any> = ['يناير', 'فبراير', 'مارس', 'ابريل', 'مايو', 'يونية', 'يوليو', 'اغسطس', 'سبتمبر', 'اكتوبر', 'نوفمبر', 'ديسمبر'];

  public chartColorsEarnings: Array<any> = [
    {
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 2,
    }
  ];

  public chartOptionsEarnings: any = {
    responsive: true
  };
  DashboardInfo: DashboardInfo;
  // EARNINGS DATA END
  public chartClicked(e: any): void {

  }

  public chartHovered(e: any): void {

  }

  constructor(
    public app_ser: AppService,
    public route: ActivatedRoute,
    public router: Router,
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal,
    private translate: TranslateService,
    private toastr: ToastrService,
  ) {
    this.coursesSummary = [];

    this.DashboardInfo = new DashboardInfo();
    this.langStyle = "wrapper-dashboard-" + this.app_ser.app_lang();
    this.initData();

  }

  ngOnInit() {
  }

  initData() {
    this.app_ser.post("site_feed/TrainerReport/dashboard", {}).subscribe(
      data => {
        console.log("data", data)
        this.DashboardInfo = data;
        this.chartDatasetsPassingRatio = [
          { data: [this.DashboardInfo.students_unfinished_count, this.DashboardInfo.students_finished_count], label: 'Students Data' }
        ];
      },
      error => {
      });


    this.app_ser.post("site_feed/TrainerReport/trainer_money_yearly", {}).subscribe(
      data => {
        console.log("data", data)
        var m = []
        for (const [key, value] of Object.entries(data)) {
          m.push(value);
        }
        this.chartDatasetsEarnings = [
          { data: m, label: 'مال مكستب' }
        ];

      },
      error => {
      });


    this.app_ser.post("site_feed/TrainerReport/correction_yearly", {}).subscribe(
      data => {
        console.log("data", data)
        var pending = []
        var done = []
        for (const [key, value] of Object.entries(data)) {
          pending.push(value["pending"]);
          done.push(value["done"]);
        }

        this.chartDatasetsCorrections = [
          { data: pending, label: 'لم يتم التحقق من التصحيحات' },
          { data: done, label: 'فحص التصحيحات' }

        ];

      },
      error => {
      });


    this.myCourses();

  }

  myCourses() {
    var data1 = { page: 0, size: 5 }


    this.app_ser.post("site_feed/TrainerCourse/index", { data: data1 }).subscribe(
      data => {

        this.coursesSummary = data.rows;
        console.log("coursesSummary", this.coursesSummary)
      },

      error => {



      });
  }

}
