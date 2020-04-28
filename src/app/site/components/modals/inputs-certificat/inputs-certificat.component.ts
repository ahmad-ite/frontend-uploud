import { Component, OnInit, Input, Inject, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { AppService } from '../../../../services/app.service';


@Component({
  selector: 'app-inputs-certificat',
  templateUrl: './inputs-certificat.component.html',
  styleUrls: ['./inputs-certificat.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class InputsCertificatComponent implements OnInit {
  name: string;
  langStyle: any;
  @Input() signup: any;
  constructor(public app_ser: AppService,
    private translate: TranslateService,
    private toastr: ToastrService,
    public activeModal: NgbActiveModal) {
    this.name = "";
    this.langStyle = 'wrapper-input-certificate-' + this.app_ser.app_lang();
  }

  ngOnInit() {
  }
  checked({ value, valid }) {
    if (!valid)
      return false;
    return true;
  }
  register({ value, valid }) {

    if (!valid) {

      this.toastr.error(this.translate.instant("please, check your data"), this.translate.instant('error'));
      return
    }
    this.activeModal.close(this.name);
  }
}
