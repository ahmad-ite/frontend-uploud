import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Student } from '../../../../_models/loadData';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnInit {
  langStyle: any;
  user: Student;
  templateChecked: any;
  emailChecked: boolean;
  constructor(
    public app_ser: AppService,
    public route: ActivatedRoute,
    public router: Router,
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal,
    private translate: TranslateService,
    private toastr: ToastrService,
  ) { 
    this.langStyle = "wrapper-contact-lang-" + this.app_ser.app_lang();
  }

  ngOnInit() {
    this.user = new Student();
    this.user.nationality = null;
  }
  checked({ value, valid }) {
    if (!valid)
      return false;
    return true;
  }
  submitContactForm({ value, valid }) {

    if (!this.checked({ value, valid })) {
      this.toastr.error(this.translate.instant("please, check your data"), this.translate.instant('error'));
      return
    }

    this.app_ser.post("site_feed/contact/save", { data: this.user }).subscribe(
      data => {
        if (data) {
          this.toastr.success(this.translate.instant('Message Sent Successfully'), this.translate.instant('Welcome') + " " + this.user.name);
          this.user = new Student();
        }
       
      },
      err => {

      });



  }

}
