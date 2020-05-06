import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { InternalPayment } from 'src/app/_models/loadData';

@Component({
  selector: 'app-quarter-report',
  templateUrl: './quarter-report.component.html',
  styleUrls: ['./quarter-report.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class QuarterReportComponent implements OnInit {
  activeYear : any;
  paymentInfo:InternalPayment[];

  quarterReport: object[] = [
    { paymentNo: 'الدفع الأولى', quarterMonths:'',total:'$3500',registrationDate: '01-04-2020', transferDetails: 'التفاصيل', paymentDetails: 'التفاصيل'},
    { paymentNo: 'الدفعه ثانية', quarterMonths:'',total:'$6500',registrationDate: '03-04-2020', transferDetails: 'التفاصيل', paymentDetails: 'التفاصيل'},
    { paymentNo: 'الدفعه ثالثة', quarterMonths:'',total:'$4500',registrationDate: '06-04-2020', transferDetails: 'التفاصيل', paymentDetails: 'التفاصيل'},
    { paymentNo: 'الدفعه الرابعة', quarterMonths:'',total:'$2500',registrationDate: '07-04-2020', transferDetails: 'التفاصيل', paymentDetails: 'التفاصيل'},
    
    
    
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
  constructor(
    public app_ser: AppService,
    public route: ActivatedRoute,
    public router: Router,
    private modalService: NgbModal,
  ) {
    this.langStyle = "wrapper-report-" + this.app_ser.app_lang();
    this.activeYear = 2020;
    this.initPaymentInfo();
  }
  initPaymentInfo(){

    this.paymentInfo = [];
    var p = new InternalPayment();
    p.from = "01-01-"+this.activeYear;
    p.to = "03-31-"+this.activeYear;
    p.detailsAr = "شهر 1|شهر2|شهر3";
    p.detailEn = "Jan|Feb|Mar";
    this.paymentInfo .push(p);

    p = new InternalPayment();
    p.from = "01-04-"+this.activeYear;
    p.to = "30-06-"+this.activeYear;
    p.detailsAr = "شهر4|شهر5|شهر6";
    p.detailEn = "April|May|June";
    this.paymentInfo .push(p);

    p = new InternalPayment();
    p.from = "01-07-"+this.activeYear;
    p.to = "30-09-"+this.activeYear;
    p.detailsAr = "شهر7|شهر8|شهر9";
    p.detailEn = "July|Aug|Sep";
    this.paymentInfo.push(p);

    p = new InternalPayment();
    p.from = "01-10-"+this.activeYear;
    p.to = "31-12-"+this.activeYear;
    p.detailsAr = "شهر10|شهر11|شهر12";
    p.detailEn = "Oct|Nov|Dec";
    this.paymentInfo .push(p);

    
  }
  ngOnInit() {
  }

  paymentDetail(index){
    this.router.navigate(["/trainer/currentYearReport/"+ this.paymentInfo[index].from+"/"+ this.paymentInfo[index].to]);
  }

}
