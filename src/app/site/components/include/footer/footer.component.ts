
import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { TrainerData } from '../../../../_models/loadData';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from '../../../../services/dialog.service';
import { Globals } from 'src/app/globals';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  langStyle: any;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private translate: TranslateService,
    public app_ser: AppService,
    public globals: Globals,

  ) {
    this.langStyle = "wrapper-footer-lang-" + this.app_ser.app_lang();
  }

  ngOnInit() {
  }
  templateNavigation(template) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigate(['/template/' + template.id + '/' + this.app_ser.urlString(template.name, template.name_en)]);



  }

}
