

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-kun-certificates',
  templateUrl: './kun-certificates.component.html',
  styleUrls: ['./kun-certificates.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class KunCertificatesComponent implements OnInit {
  langStyle: string;

  constructor(
    public app_ser: AppService,
    public route: ActivatedRoute,
    public router: Router,
    private modalService: NgbModal,
  ) { 
    this.langStyle = "wrapper-kun-certificate-" + this.app_ser.app_lang();
  }

  ngOnInit() {
  }

}

