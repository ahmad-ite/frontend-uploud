import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Pager, ListOption } from 'src/app/_models/loadData';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ReportComponent implements OnInit {
  reportData: object[] = [
    { studentName: 'أحمد الحوراني', courseName:'اللغة العربية للفنينين',coursePrice: '$70', discountPrice: '$35', paymentMethod: 'بي بال', trainerNetPrice: '$20', date: '01-12-2020' },
    { studentName: 'علي محمد', courseName:'اللغة العربية للإعلاميين',coursePrice: '$70', discountPrice: '$35', paymentMethod: 'بي بال', trainerNetPrice: '$20', date: '01-12-2020' },
    
  ];
  reportYear:any[] = [
    {year:'2020'},
    {year:'2019'},
    {year:'2018'},
    {year:'2017'},
    {year:'2016'},
    {year:'2015'},
  ];
  selectedYear: string= '2020';
  langStyle: string;
  from: any;
  to: any;

  pager: Pager;
  options: ListOption;
  
  constructor(
    public app_ser: AppService,
    public route: ActivatedRoute,
    public router: Router,
    private modalService: NgbModal,
  ) {
    this.langStyle = "wrapper-report-" + this.app_ser.app_lang();
    this.from = this.route.snapshot.params['from'] ? this.route.snapshot.params['from'] : "2020-01-01";
    this.to = this.route.snapshot.params['to'] ? this.route.snapshot.params['to'] : "2020-12-31";

    this.options = new ListOption();
    this.pager = new Pager();
    this.options.page = 0;
    this.loadPage();
    
  }

  ngOnInit() {
  }

  sortBy(m = "") {

  }

  loadPage(page = null) {

    // this.ngxService.start();
    // this.ngxService.startLoader('loader-01')
    //var data1 = { page: this.pager.currentPage, size: this.pager.pageSize, param: {from: this.from, to:this.to} };
    var data1={};
    data1['data[page]']= this.pager.currentPage;
    data1['data[size]']= this.pager.pageSize;
    data1['data[param][from]']= this.from;
    data1['data[param][to]']= this.to;

      this.app_ser.post("site_feed/TrainerReport/students", data1).subscribe(
        data => {
          console.log(data);
          this.pager = this.app_ser.paginate(data.total, data.page + 1, data.size);
          this.reportData= data.rows;
        },
        error => {
        });
  }

  onChangePage(page) {
    this.pager.currentPage = page - 1;
    this.loadPage();
  }

  yearChange() {
    this.from= this.selectedYear + '-01-01';
    this.to= this.selectedYear + '-12-31';
    this.router.navigate(["/trainer/currentYearReport/"+this.from+"/"+this.to]);
    this.loadPage();
  }

}
