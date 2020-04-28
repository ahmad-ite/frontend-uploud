import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../../../services/app.service';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TermsAndConditionsComponent implements OnInit {
  langStyle: any;
  @Input() name;

  constructor(
    public activeModal: NgbActiveModal,
    public translate: TranslateService,
    public authenticationService: AuthenticationService,
    public app_ser: AppService,
    public router: Router,
    public route: ActivatedRoute

  ) {
    this.langStyle = "wrapper-terms-lang-" + this.app_ser.app_lang();
  }

  ngOnInit() {
  }

}
