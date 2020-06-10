
import { Component, OnInit, Input, Inject, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModalConfig, NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
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
import { browser } from 'protractor';
import { Globals } from 'src/app/globals';
// import { CaptchaComponent } from 'angular-captcha';
@Component({
  selector: 'app-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [NgbModalConfig, NgbModal]
})
export class PaymentGatewayComponent implements OnInit {
  disabled: boolean = false;
  langStyle: any;
  loader: boolean;
  @Input() inputCourseDetail: CourseView;


  public payPalConfig?: IPayPalConfig;

  showError: boolean;
  showCancel: boolean;
  showSuccess: boolean;
  curruncyCode: string = "USD"
  clientId: string;
  cost: any;
  costString: any;
  coupon: any;
  couponId: any = 0;
  coupenSucces: boolean = false;
  paymentURL: any = "https://kun.academy/#/payment/loading";
  orderREF: any;
  bankPageLoadCounter: number = -1;
  activeTab: string;
  constructor(
    // public captchaComponent: CaptchaComponent,
    private sanitizer: DomSanitizer,
    public app_ser: AppService,
    private translate: TranslateService,
    private dialogService: DialogService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private toastr: ToastrService,
    private modalService: NgbModal,
    public globals: Globals,
    public activeModal: NgbActiveModal

  ) {

    this.langStyle = "wrapper-payment-gateway-" + this.app_ser.app_lang();
    this.coupon = "";
    // this.disabled = true;


  }

  ngOnInit() {
    this.startPayment();
    this.loader = false;
    if (!this.inputCourseDetail.price || this.inputCourseDetail.price == 'null')
      this.inputCourseDetail.price = 0
    this.cost = this.inputCourseDetail.price;
    this.costString = this.cost.toString();

    this.clientId = 'AZ1k6Xu14SJGAX1sLqmjBspP2RejzFrIZjwJjv7QYMf0wvuswqqrNckOeuN8X-JW5CT2GcgjWkWv_-Ry';


    this.initConfig();

    // <any>document.getElementById('soundMarquee')).setAttribute('scrollamount', '' + this.scrollAmount);
    // this.startMarquee('soundMarquee');
    // (<any>document.getElementById('bankFrame')).load(function () {
    //   alert(111);
    //   //The iframe has loaded or reloaded.
    // })
    // $("bangFrame").load(function () {
    //   alert(111);
    //   //The iframe has loaded or reloaded.
    // });

  }



  checkCoupon() {
    this.loader = true;
    this.app_ser.post("site_feed/UserCourse/check_coupon", { coupon: this.coupon, course: this.inputCourseDetail.id }).subscribe(
      data => {
        this.toastr.success(this.translate.instant('Coupon is valid'), this.translate.instant('Congratulations'));


        this.couponId = data.id;
        if (data.final_price == 0) {
          this.coupenSucces = true

        }

        this.cost = data.final_price;
        this.costString = this.cost.toString();
        this.loader = false;

        if (data.final_price != 0) {

          this.bankPageLoadCounter = 0;
          this.startPayment();
        }

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
  private initConfig(): void {
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
        this.addPayment(data);
        this.showSuccess = true;
      },
      onCancel: (data, actions) => {
        this.showCancel = true;

      },
      onError: err => {
        this.showError = true;
      },
      onClick: (data, actions) => {
        this.resetStatus();
      },
    };
  }
  addPayment(data) {
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
    payment.coupon_id = this.couponId;

    payment.intent = data.intent;

    payment.payer_email = data.payer.email_address;
    payment.payer_id = data.payer.payer_id;
    this.app_ser.post("site_feed/Bank_payment/add_payment", { data: payment }).subscribe(
      data => {
        this.activeModal.close(data);
        this.loader = false;

      },
      error => {
        this.toastr.error(this.translate.instant('Payment is invalid'), this.translate.instant('error'));

        this.loader = false;
      });



  }

  close() {
    this.app_ser.closePaymentGateway("232");
    return
    this.app_ser.paymentModal.close(
      "34"
    );
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

    this.app_ser.post("site_feed/Bank_payment/add_payment", { data: payment }).subscribe(
      data => {
        this.activeModal.close(data);
        // this.activeModal.dismiss("ds");
        this.loader = false;

      },
      error => {
        this.loader = false;
      });



  }

  resetStatus() {

  }


  // Bank Config
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  startPayment() {
    this.loader = true;
    this.app_ser.post("site_feed/Bank_payment/start_payment", { course: this.inputCourseDetail.id, coupon: this.couponId }).subscribe(
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
    this.app_ser.post("site_feed/Bank_payment/check_payment", { order_ref: this.orderREF }, false).subscribe(
      data => {
        this.loader = false;
        this.activeModal.close(data);



      },
      error => {
        this.loader = false;
        if (error && error.error == 3) {// Payment Status is started

        }
        else {
          this.toastr.error(this.translate.instant('The data is incorrect'), this.translate.instant('error'));

        }

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

