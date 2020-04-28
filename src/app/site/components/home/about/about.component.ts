import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Data } from '../../../../_models/loadData';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AboutComponent implements OnInit {

  langStyle: any;
  load_data: Data;
  constructor(
    public app_ser: AppService,
    public route: ActivatedRoute,
    public router: Router,
    private ngxService: NgxUiLoaderService,
    private modalService: NgbModal,
    
  ) { 
    this.langStyle = "wrapper-about-lang-" + this.app_ser.app_lang();
    this.app_ser.post("site_feed/course/load_data/",{}).subscribe(
      data => {
        
        this.load_data = data;
       

      },
      error => {

      });
    
  }

  ngOnInit() {
    
  }

}
