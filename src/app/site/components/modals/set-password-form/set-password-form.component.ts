import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'src/app/services/app.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-set-password-form',
  templateUrl: './set-password-form.component.html',
  styleUrls: ['./set-password-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SetPasswordFormComponent implements OnInit {
  @Input() user: string;
  pwd1: string;
  code1: string;
  confirmPwd1: string;
  langStyle: any;

  constructor(public app_ser: AppService,
    private translate: TranslateService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal) {
    this.pwd1 = '';
    this.confirmPwd1 = '';
    this.code1 = '';
    this.langStyle = "wrapper-lang-setPassword-" + this.app_ser.app_lang();

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

    this.app_ser.post("site_feed/Account/reset_pass", { password: this.pwd1, code: this.code1, user: this.user }).subscribe(
      res => {
        this.activeModal.close(res);
        return
      });
  }
}
