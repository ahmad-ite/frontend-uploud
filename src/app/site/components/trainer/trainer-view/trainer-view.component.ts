import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { TrainerData } from '../../../../_models/loadData';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-trainer-view',
  templateUrl: './trainer-view.component.html',
  styleUrls: ['./trainer-view.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TrainerViewComponent implements OnInit {

  trainerData: TrainerData;
  id: Number;
  langStyle: any;

  constructor(
    public app_ser: AppService,
    public route: ActivatedRoute,
    public router: Router,
    public translate: TranslateService
  ) {
    this.langStyle = newFunction() + this.app_ser.app_lang();
    this.id = this.route.snapshot.params['id'];
    this.trainerData = new TrainerData();

    // var data1 = { load_data: { page: 0, size: 100 } };
    // data1.page=0;
    this.app_ser.post("site_feed/course/view_trainer/" + this.id, {}).subscribe(
      data => {

        this.trainerData = data;



      },
      error => {

        // this.toastr.error(error.error.message, 'Error');

      });

  }

  ngOnInit() {
  }

  view_trainer(id) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigate(["trainer-view/" + id]);
  }

  viewCourse(course) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigate(["course-view/" + course.code + "/" + this.app_ser.urlString(course.name)]);

  }

}

function newFunction() {
  return "wrapper-trainer-view-";
}

