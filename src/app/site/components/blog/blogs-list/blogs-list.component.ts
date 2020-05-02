import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Pager, Course, Blog } from 'src/app/_models/loadData';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogsListComponent implements OnInit {

  langStyle: any;
  loadGifLoader: boolean;
  pager: Pager;
  blogs: Blog[];
  noData: boolean;
  constructor(
    public app_ser: AppService,
    public route: ActivatedRoute,
    public router: Router,
    private modalService: NgbModal,
  ) {
    this.langStyle = "wrapper-blog-list-lang-" + this.app_ser.app_lang();
    this.loadPage(1)
  }

  ngOnInit() {
  }
  loadPage(page) {
    this.blogs = [];
    // this.ngxService.start();
    // this.ngxService.startLoader('loader-01')
    var data1 = { page: page - 1, size: 9 }
    this.noData = false;
    this.loadGifLoader = true;
    this.pager = new Pager();
    this.app_ser.post("site_feed/Blog/pages", { data: data1 }).subscribe(
      data => {
        // this.ngxService.stop();
        this.loadGifLoader = false;
        // this.ngxService.stopLoader('loader-01')
        this.pager = this.app_ser.paginate(data.total, data.page + 1, data.size);
        this.noData = true;
        this.blogs = data.rows;
      },

      error => {
        this.loadGifLoader = false;


      });
  }

  onChangePage(page) {
    this.loadPage(page);
  }

}
