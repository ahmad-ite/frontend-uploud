import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogsListComponent implements OnInit {

  langStyle: any;
  constructor(
    public app_ser: AppService,
    public route: ActivatedRoute,
    public router: Router,
    private modalService: NgbModal,
  ) {
    this.langStyle = "wrapper-blog-list-lang-" + this.app_ser.app_lang();
  }

  ngOnInit() {
  }

}