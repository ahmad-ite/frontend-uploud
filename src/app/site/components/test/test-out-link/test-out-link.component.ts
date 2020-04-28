import { OnInit, Pipe, PipeTransform, AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, Event, NavigationStart, NavigationEnd, NavigationError, ActivatedRoute } from '@angular/router';
import { AppService } from 'src/app/services/app.service';
import { filter } from 'rxjs/operators';
@Component({
  selector: 'app-test-out-link',
  templateUrl: './test-out-link.component.html',
  styleUrls: ['./test-out-link.component.scss']
})
@Pipe({ name: 'safe' })
export class TestOutLinkComponent implements OnInit {
  url: string;
  paymentURL: any;
  theBoundCallback: Function;
  orderREF: any;

  constructor(public route: ActivatedRoute, private router: Router, private sanitizer: DomSanitizer, public app_ser: AppService) {

    this.startPayment();
    // this.paymentURL = "https://paypage.sandbox.ngenius-payments.com/?code=25de3e9e40113780";
    this.router.events.subscribe((event: Event) => {
      console.log("Event", event);
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        // Hide loading indicator

        console.log("Event", event);
        if (event.url && event.url.includes('/payment/loading')) {
          this.checkPayment();

        }
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        // console.log(event.error);
      }


    });

  }
  ngOnInit() {
    if (this.router.url.includes('/payment/loading')) {
      this.route.queryParams.subscribe(params => {
        console.log(
          "params ", params
        );

        if (params['ref']) {
          // this.checkPayment(params['ref']);
          this.orderREF = params['ref'];
        }


      });
    }



  }
  start() {
    this.startPayment();
  }
  receiveMessage(event) {
    console.log("event111", event);
  }
  startPayment() {

    this.app_ser.post("site_feed/Bank_payment/start_payment", { course: 34 }).subscribe(
      data => {
        this.paymentURL = this.transform(data.payment_url + "&slim=true");
        this.orderREF = data.order_ref;

      },
      error => {

      });



  }

  checkPayment() {

    this.app_ser.post("site_feed/Bank_payment/check_payment", { order_ref: this.orderREF }).subscribe(
      data => {

        this.router.navigate(['/payment/success/data']);
      },
      error => {
        this.router.navigate(['/payment/failure']);

      });



  }
  click() {
    this.startPayment();
    //post message to http://localhost:4201
    window.postMessage('event11122', "https://mysite.com/redirect");
  }
  transform(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  public theCallback(data) {
    alert(1);

  }


  func() {
    this.router.navigate(['/payment/success/6456457645']);

    return "1234";
  }
  func1() {
    this.router.navigate(['/payment/failure']);
    return 0;
  }

}
