import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/services/app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ResetFormComponent implements OnInit {
  email: string;
  langStyle: any;

  constructor(
    public app_ser: AppService,
    private translate: TranslateService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal
  ) {
    this.email = '';
    this.langStyle = "wrapper-lang-resetPassword-" + this.app_ser.app_lang();
  }

  ngOnInit() {
  }

  checked({ value, valid }) {
    if (!valid)
      return false;
    return true;
  }
  send({ value, valid }) {

    if (!valid) {

      this.toastr.error(this.translate.instant("please, check your data"), this.translate.instant('error'));
      return
    }

    this.app_ser.post("site_feed/Account/forget_pass", { email: this.email }).subscribe(
      res => {
        this.activeModal.close(res);
        return

      });
    // this.activeModal.close(this.name);
  }

}
