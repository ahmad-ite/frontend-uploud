import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from 'src/app/services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Globals } from '../globals';
@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrainerComponent implements OnInit {
  langStyle: any;

  constructor(
    public globals: Globals,
    public app_ser: AppService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {
    this.langStyle = "wrapper-trainer-layout-" + this.app_ser.app_lang();
    this.loadCategories();
  }

  ngOnInit() {
  }
  loadCategories() {

    this.app_ser.post("site_feed/TrainerCourse/templates_with_all_categories", {}).subscribe(
      data => {
        this.globals.templates = data.rows;
        this.globals.subCategories = data.sub_categories;

        const arrayToObject = (array) =>
          array.reduce((obj, item) => {
            obj[item.id] = item
            return obj
          }, {})

        this.globals.templatesDic = arrayToObject(this.globals.templates)
        this.globals.subCategoriesDic = arrayToObject(this.globals.subCategories)

      },
      error => {
      });

  }

}
