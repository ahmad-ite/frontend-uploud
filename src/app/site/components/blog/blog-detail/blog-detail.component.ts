
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Blog } from 'src/app/_models/loadData';
import { MetafrenzyService } from 'ngx-metafrenzy';




@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class BlogDetailComponent implements OnInit {

  langStyle: any;
  id: any;
  blog: Blog;
  loadGifLoader: boolean;
  constructor(
    public app_ser: AppService,
    public route: ActivatedRoute,
    public router: Router,
    private readonly metafrenzyService: MetafrenzyService,
    private modalService: NgbModal,
  ) {
    this.langStyle = "wrapper-blog-detail-lang-" + this.app_ser.app_lang();
    this.id = this.route.snapshot.params['id'];
    this.blog = new Blog();
    this.view();
  }

  view() {
    this.loadGifLoader = true;
    this.app_ser.post("site_feed/Blog/view/" + this.id, {}).subscribe(
      data => {
        this.loadGifLoader = false;
        this.blog = data.row;
        if (this.blog.seo) {
          var seo = JSON.parse(this.blog.seo);
          this.metafrenzyService.setTags({
            title: seo.title,
            description: seo.description,

          });
        }



      },
      error => {

        // this.toastr.error(error.error.message, 'Error');

      });

  }

  ngOnInit() {
  }

}
