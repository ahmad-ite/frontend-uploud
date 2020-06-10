import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatMenuTrigger } from '@angular/material';
import { Data, MainCategory, SubCategory, TemplateCategoryCourse, Slide, videoAPI } from '../../../../_models/loadData';

import { AppService } from '../../../../services/app.service';

import { AuthenticationService } from '../../../../_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { VgAPI } from 'videogular2/compiled/core';


@Component({
  selector: 'app-category-courses',
  templateUrl: './category-courses.component.html',
  styleUrls: ['./category-courses.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CategoryCoursesComponent implements OnInit {
  langStyle: any;
  closeResult: string;
  isLoading: number = 0;
  load_data: Data;
  load_data_temp: Data;
  view_data = {};
  trainer_id: any;
  slides_categories: MainCategory[];
  app_video: string;
  app_img: any;
  bb: any;
  id: Number;
  filter_courses: any[];
  activeMainCategory: Number;
  activeSubCategory: Number;
  allSubCategories: SubCategory[];
  subCategories: SubCategory[];
  activeMainCategoryObj: MainCategory;
  playVideoOnHover: any;
  playSlideOnHover: any;
  mutePlay: boolean;
  tempId: any;
  catId: any;
  mainCategory: MainCategory;
  api: any;
  appVideoApi: any;
  sliderCount: number = 6;
  sliderColumnCount: number = 6;
  sliderRowCount: number;

  constructor(
    public translate: TranslateService,
    public authenticationService: AuthenticationService,
    public app_ser: AppService,
    public router: Router,
    public route: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
  ) {
    this.langStyle = "wrapper-catogory-course-" + this.app_ser.app_lang();
    this.sliderRowCount = this.sliderCount / this.sliderColumnCount;
    this.playVideoOnHover = false;
    this.playSlideOnHover = -1;
    this.activeMainCategory = parseInt(this.route.snapshot.params['tempId'] ? this.route.snapshot.params['tempId'] : 0);
    // this.activeSubCategory = parseInt(this.route.snapshot.params['catId'] ? this.route.snapshot.params['catId'] : 0);
    this.activeSubCategory = 0;
    this.initTemplateCategoryCourses();

  }
  initTemplateCategoryCourses() {
    this.activeMainCategoryObj = null;
    this.load_data = new Data();
    this.mainCategory = new MainCategory();

    this.ngxService.start();
    var data1 = { data: { page: 0, size: 100 } };
    // this.activeMainCategory = parseInt(this.route.snapshot.params['tempId'] ? this.route.snapshot.params['tempId'] : 0);
    // this.activeSubCategory = parseInt(this.route.snapshot.params['catId'] ? this.route.snapshot.params['catId'] : 0);

    this.app_ser.post("site_feed/course/load_template_courses/" + this.activeMainCategory, data1).subscribe(
      data => {
        this.ngxService.stop();
        this.mainCategory = data;
        var itrCategory = 0;
        for (const category of this.mainCategory.sub_categories) {
          var itr = 0;
          this.mainCategory.sub_categories[itrCategory].slide_courses = this.chunk(category.courses, 6);
          itrCategory++;
        }

      },
      error => {

      });
  }

  categoryNavigation(category) {
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
    this.router.navigate(['/course-category/' + category.id + '/' + this.app_ser.urlString(category.name, category.name_en)]);

  }

  changeTemplate(tempId) {
    this.activeMainCategory = tempId;
    // this.activeSubCategory = 0;
    // this.initTemplateCategoryCourses()

  }
  changeCategory(catId) {

    this.activeSubCategory = catId;
    this.initTemplateCategoryCourses()
  }


  // initSlideCoursesData() {

  //   this.templateCategoryCourses.custom_category = [];

  //   var slide = new Slide();
  //   slide.slides = this.chunk(this.templateCategoryCourses.most_views_courses, 6);
  //   slide.name = 'الدورات الأكثر مشاهدة';
  //   this.templateCategoryCourses.custom_category.push(slide);


  //   var slide = new Slide();
  //   slide.slides = this.chunk(this.templateCategoryCourses.recent_courses, 6);
  //   slide.name = 'الدورات الحديثة';
  //   this.templateCategoryCourses.custom_category.push(slide);


  //   var slide = new Slide();
  //   slide.slides = this.chunk(this.templateCategoryCourses.free_courses, 6);
  //   slide.name = 'الدورات المجانية';
  //   this.templateCategoryCourses.custom_category.push(slide);


  //   var slide = new Slide();
  //   slide.slides = this.chunk(this.templateCategoryCourses.recommended, 6);
  //   slide.name = 'الدورات الموصى بها';
  //   this.templateCategoryCourses.custom_category.push(slide);


  //   this.ngxService.stopLoader('loader-01')
  // }

  ngOnInit() {
  }
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  showVideoOnOver(id, slide = -1) {

    // if(!this.playVideoOnHover)
    this.playVideoOnHover = id;
    this.playSlideOnHover = slide;
    this.appVideoApi.pause();


  }
  onPlayerReady(api: VgAPI, mode, course = null) {


    switch (mode) {
      case "video_app":
        this.appVideoApi = api;
        this.api = api;
        this.appVideoApi.getDefaultMedia().subscriptions.loadedData.subscribe(() => {
          this.appVideoApi.volume = 0.3;
          this.appVideoApi.getDefaultMedia().currentTime = 0.1;
          this.appVideoApi.play();

        });
        break;
      case "courses":


        api.volume = 0;
        this.api = api;
        this.api.volume = 0;
        course.volume = 0;

        break;
      default:


    }

  }
  muteAndPlay(course) {
    this.api.volume = !this.api.volume;
    course.volume = this.api.volume;


  }
  // onPlayerReady(api: VgAPI, mode, course = null) {


  //   switch (mode) {
  //     case "video_app":
  //       this.appVideoApi = api;
  //       break;
  //     case "courses":
  //       api.volume = 0;
  //       this.api = api;
  //       this.api.getDefaultMedia().subscriptions.ended.subscribe(() => {
  //       });
  //       this.api.volume = 0;
  //       course.volume = 0;
  //       break;


  //     default:


  //   }

  // }
  hideVideoOnOver() {
    this.playVideoOnHover = 0
    // this.api = null;
    // this.appVideoApi.volume = 0;

  }
  setFavourite(course) {
    this.app_ser.isStudentLogined().then(res => {
      if (res) {

        if (course.is_interested) {
          this.app_ser.post("site_feed/UserCourse/delete_interested/" + course.id, {}).subscribe(
            data => {
              course.is_interested = 0;

            })
        }
        else {
          this.app_ser.post("site_feed/UserCourse/add_interested/" + course.id, {}).subscribe(
            data => {
              course.is_interested = 1;
            })
        }
      }

    });

  }
  getCoursePopupClass(index) {
    if (index % this.sliderColumnCount == 0) {
      if (this.app_ser.app_lang() == 'ar') {
        return 'transition-right';
      }
      else {
        return 'transition-left';
      }

    }
    if (index % this.sliderColumnCount == this.sliderColumnCount - 1) {
      if (this.app_ser.app_lang() == 'ar') {
        return 'transition-left';
      }
      else {
        return 'transition-right';
      }
    }
    return 'transiton-center';
  }

}
