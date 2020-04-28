import { Component, OnInit } from '@angular/core';
import {
  IPayPalConfig,
  ICreateOrderRequest
} from 'ngx-paypal';
import { Payment } from 'src/app/_models/loadData';
import { AppService } from 'src/app/services/app.service';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public payPalConfig?: IPayPalConfig;

  showError: boolean;
  showCancel: boolean;
  showSuccess: boolean;
  curruncyCode: string = "USD"
  clientId: string;
  cost: any;
  constructor(public app_ser: AppService) { }

  ngOnInit() {
    this.clientId = 'AfT6neiUbhp0cf35qKHJ0EmPmC8Fi2eCOgLxJ35UsWX3BjA2uX-iCLzapR05m46jzL-ahracVeY5bML6';
    this.cost = "1.0";

    this.initConfig();
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
            value: this.cost,
            breakdown: {
              item_total: {
                currency_code: this.curruncyCode,
                value: this.cost
              }
            }
          },
          items: [{
            name: 'Enterprise Subscription',
            quantity: '1',
            category: 'DIGITAL_GOODS',
            unit_amount: {
              currency_code: this.curruncyCode,
              value: this.cost,
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
    var payment = new Payment();
    var myJSON = JSON.stringify(data);
    payment.course = 1;
    payment.currency = this.curruncyCode;
    payment.amount = this.cost;
    payment.status = "completed";
    payment.type = "paypal";
    payment.payment_id = data.id;
    payment.all_details = myJSON;

    payment.intent = data.intent;

    payment.payer_email = data.payer.email_address;
    payment.payer_id = data.payer.payer_id;
    this.app_ser.post("site_feed/Bank_payment/add_payment", { data: payment }).subscribe(
      data => {

      },
      error => {
      });



  }

  resetStatus() {

  }
}
