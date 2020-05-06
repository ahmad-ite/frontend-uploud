import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

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
  reportYear:object[] = [
    {year:'2020'},
    {year:'2019'},
    {year:'2018'},
    {year:'2017'},
    {year:'2016'},
    {year:'2015'},
  ]
  langStyle: string;
  from: any;
  to: any;
  constructor(
    public app_ser: AppService,
    public route: ActivatedRoute,
    public router: Router,
    private modalService: NgbModal,
  ) {
    this.langStyle = "wrapper-report-" + this.app_ser.app_lang();
    this.from = this.route.snapshot.params['from'];
    this.to = this.route.snapshot.params['to'];
  }

  ngOnInit() {
  }

}
