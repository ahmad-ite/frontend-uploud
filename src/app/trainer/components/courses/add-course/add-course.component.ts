import { Component, OnInit, Input, ViewEncapsulation, ViewChild } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { MainCategory, Course, SubCategory } from 'src/app/_models/loadData';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Globals } from 'src/app/globals';
import { MatStepper } from '@angular/material';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddCourseComponent implements OnInit {
  templates: MainCategory[];
  course: Course;
  categories: SubCategory[];
  // @ViewChild('stepper') stepper: MatStepper;


  langStyle: any;
  courseId: number;
  title: string;



  constructor(
    public globals: Globals,
    public route: ActivatedRoute,
    public router: Router,
    public app_ser: AppService,
    public translate: TranslateService
  ) {
    this.templates = [];
    this.categories = [];
    // this.mycourses = [];
    this.courseId = parseInt(this.route.snapshot.params['courseId'] ? this.route.snapshot.params['courseId'] : 0);
    this.title = "Add Course";
    this.course = new Course();

    if (this.globals.templates) {
      this.templates = this.globals.templates;
    }
    else {
      this.app_ser.post("site_feed/TrainerCourse/templates_with_all_categories", {}).subscribe(
        data => {
          this.templates = data.rows;
        },
        error => {
        });
    }

    this.course.template_id = 0;
    this.course.course_category = 0;



    this.langStyle = "wrapper-add-course-" + this.app_ser.app_lang();

  }
  save() {
    this.app_ser.post("site_feed/TrainerCourse/save/" + this.courseId, { data: this.course }).subscribe(
      data => {
        // this.router.navigate(["/trainer/courses/list"]);
        // this.stepper.next();
        this.router.navigate(["/trainer/courses/" + data.id + "/edit"]);

      });

  }

  checked({ value, valid }) {
    if (!valid || !this.course.course_category || !this.course.template_id)
      return false;
    return true;
  }
  onChangeTemplate() {
    for (let i = 0; i < this.templates.length; i++) {
      if (this.templates[i].id == this.course.template_id) {
        this.categories = this.templates[i].categories;
        return;
      }
    }
    this.categories = [];
  }
  ngOnInit() {
    this.initCourse();
  }
  initCourse() {
    if (this.courseId) {
      this.title = "Edit Course";
      this.app_ser.post("site_feed/TrainerCourse/view/" + this.courseId, {}).subscribe(
        data => {
          this.course = data.row;
          this.onChangeTemplate();
        },
        error => {
        });
    }
  }

}
