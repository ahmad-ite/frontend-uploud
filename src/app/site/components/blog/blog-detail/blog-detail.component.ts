
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';




  @Component({
    selector: 'app-blog-detail',
    templateUrl: './blog-detail.component.html',
    styleUrls: ['./blog-detail.component.scss'],
    encapsulation: ViewEncapsulation.None
  })
  export class BlogDetailComponent implements OnInit {

  langStyle: any;
  constructor(
    public app_ser: AppService,
    public route: ActivatedRoute,
    public router: Router,
    private modalService: NgbModal,
  ) {
    this.langStyle = "wrapper-blog-detail-lang-" + this.app_ser.app_lang();
  }

  ngOnInit() {
  }

}
