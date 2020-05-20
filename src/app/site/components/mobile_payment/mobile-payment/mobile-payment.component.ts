


import { Component, OnInit, Input, Inject, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DialogService } from '../../../../services/dialog.service';
import { User, Student, CourseView } from '../../../../_models/loadData'
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../../../services/app.service';
import { KeyValue } from '@angular/common';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';
import { Payment } from 'src/app/_models/loadData';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-mobile-payment',
  templateUrl: './mobile-payment.component.html',
  styleUrls: ['./mobile-payment.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MobilePaymentComponent implements OnInit {

  coupenSucces: boolean = false;
  langStyle: any;
  coupon: any = "";
  loader: boolean = true;
  paymentShow: boolean = true;
  bankPageLoadCounter: number = -1;
  // @Input() inputCourseDetail: CourseView;


  public payPalConfig?: IPayPalConfig;
  inputCourseDetail: CourseView;
  showError: boolean;
  showCancel: boolean;
  showSuccess: boolean;
  curruncyCode: string = "USD"
  clientId: string;
  cost: any;
  costString: any;
  userId: any;
  courseId: any;
  orderREF: any;
  token: number;
  showResult: boolean;
  couponId: any = 0;
  paymentURL: any = "https://kun.academy/#/payment/loading";
  constructor(
    private sanitizer: DomSanitizer,
    // public captchaComponent: CaptchaComponent,
    public app_ser: AppService,
    private translate: TranslateService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal

  ) {

    this.showResult = false;
    this.langStyle = "wrapper-payment-gateway-" + this.app_ser.app_lang();

    this.courseId = parseInt(this.route.snapshot.params['courseId']);
    this.token = this.route.snapshot.params['token'];

    this.initData();
  }
  initData() {
    this.loader = true;
    this.app_ser.post_without_token("site_feed/course/row/" + this.courseId, {}).subscribe(
      data => {
        this.inputCourseDetail = data;
        this.clientId = data.client_id;
        // this.initRating();
        this.loader = false;
        this.initConfig();
        this.startPayment();

      },
      error => {
        this.loader = false;
      });
  };

  ngOnInit() {





  }


  initConfig(): void {

    if (!this.inputCourseDetail.price || this.inputCourseDetail.price == 'null')
      this.inputCourseDetail.price = 0
    this.cost = this.inputCourseDetail.price;
    this.costString = this.cost.toString();

    // this.clientId = 'AZ1k6Xu14SJGAX1sLqmjBspP2RejzFrIZjwJjv7QYMf0wvuswqqrNckOeuN8X-JW5CT2GcgjWkWv_-Ry';


    this.payPalConfig = {
      currency: this.curruncyCode,
      clientId: this.clientId,
      createOrderOnClient: (data) => <ICreateOrderRequest>{
        intent: 'CAPTURE',
        purchase_units: [{
          amount: {
            currency_code: this.curruncyCode,
            value: this.costString,
            breakdown: {
              item_total: {
                currency_code: this.curruncyCode,
                value: this.costString
              }
            }
          },
          items: [{
            name: this.inputCourseDetail.name,
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: this.curruncyCode,
              value: this.costString,
            },
          }]
        }]
      },
      advanced: {
        commit: 'true'
      },
      style: {
        label: 'paypal',
        layout: 'vertical'
      },
      onApprove: (data, actions) => {

        actions.order.get().then(details => {

        });

      },
      onClientAuthorization: (data) => {

        this.showSuccess = true;
        this.paymentShow = true;
        this.addPayment(data);
        this.showResult = true;
        this.paymentShow = true;

      },
      onCancel: (data, actions) => {
        this.showCancel = true;
        this.failure();

      },
      onError: err => {
        this.showError = true;
        this.failure();
      },
      onClick: (data, actions) => {
        this.resetStatus();
      },
    };
  }
  addPayment(data) {
    this.paymentShow = true;
    this.loader = true;
    var payment = new Payment();
    var myJSON = JSON.stringify(data);
    payment.course = this.inputCourseDetail.id;
    payment.currency = this.curruncyCode;
    payment.amount = this.cost;
    payment.status = "completed";
    payment.type = "paypal";
    payment.payment_id = data.id;
    payment.all_details = myJSON;

    payment.intent = data.intent;

    payment.payer_email = data.payer.email_address;
    payment.payer_id = data.payer.payer_id;
    this.app_ser.post_without_token("site_feed/Bank_payment/add_payment" + "?token=" + this.token, { data: payment }).subscribe(
      data => {


        this.loader = false;
        this.paymentShow = false;
        // alert(this.showResult);
        this.success(data);


      },
      error => {
        this.failure();
      });



  }

  resetStatus() {

  }

  success(data) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigate(['/payment/success/' + data]);
  }
  failure() {
    this.loader = false;
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigate(['/payment/failure']);
    return 0;
  }


  checkCoupon() {
    this.loader = true;
    this.app_ser.post_without_token("site_feed/UserCourse/check_coupon" + "?token=" + this.token, { coupon: this.coupon, course: this.inputCourseDetail.id }).subscribe(
      data => {
        this.toastr.success(this.translate.instant('Coupon is valid'), this.translate.instant('Congratulations'));


        this.couponId = data.id;
        if (data.final_price == 0) {
          this.coupenSucces = true

        }
        if (data.final_price != 0) {

          this.bankPageLoadCounter = 0;
          this.startPayment();
        }
        this.cost = data.final_price;
        this.costString = this.cost.toString();
        this.loader = false;
      }
      , error => {

        this.cost = this.inputCourseDetail.price;
        this.costString = this.cost.toString();
        this.loader = false;
        // this.toastr.error(this.translate.instant('Coupon is invalid'), this.translate.instant('error'));

      });
    // this.toastr.error(this.translate.instant('الكوبون غير صالح '), this.translate.instant('عذرا'));
    // this.cobone='';
    // this.coupenSucces = true;

  }
  checked({ value, valid }) {
    if (!valid)
      return false;
    return true;
  }
  buyFreeCourse() {
    this.addFreePayment();

  }
  addFreePayment() {
    this.loader = true;
    var payment = new Payment();

    payment.course = this.inputCourseDetail.id;
    payment.currency = this.curruncyCode;
    payment.amount = this.cost;
    payment.status = "completed";
    payment.type = "free";
    payment.payment_id = "free";

    payment.coupon_id = this.couponId;

    this.app_ser.post_without_token("site_feed/Bank_payment/add_payment" + "?token=" + this.token, { data: payment }).subscribe(
      data => {
        this.loader = false;
        this.paymentShow = false;
        // alert(this.showResult);
        this.success(data);

      },
      error => {
        this.loader = false;
      });



  }


  // Bank Config
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  startPayment() {
    this.loader = true;
    this.app_ser.post_without_token("site_feed/Bank_payment/start_payment" + "?token=" + this.token, { course: this.inputCourseDetail.id, coupon: this.couponId }).subscribe(
      data => {
        this.paymentURL = this.transform(data.payment_url + "&slim=true");
        this.orderREF = data.order_ref;
        this.loader = false;
      },
      error => {
        this.loader = false;
      });



  }


  checkPayment() {
    this.loader = true;
    this.app_ser.post_without_token("site_feed/Bank_payment/check_payment" + "?token=" + this.token, { order_ref: this.orderREF }, false).subscribe(
      data => {
        this.loader = false;
        this.success(data);


      },
      error => {
        // this.toastr.error(this.translate.instant('Payment is invalid'), this.translate.instant('error'));

        this.loader = false;
        this.failure();



      });



  }

  onMyFrameLoad(event) {

    if (this.bankPageLoadCounter > 0) {


      this.checkPayment();
    }
    this.bankPageLoadCounter++;

  };

  onTabChange($event: NgbTabChangeEvent) {

    if ($event.nextId = "bank_tab") {
      this.bankPageLoadCounter = 0;
    }


  }

}
