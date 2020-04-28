import { Component, OnInit, ViewChild, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatMenuTrigger } from '@angular/material';
import { Data, videoAPI, Media, MainCategory, SubCategory } from '../../../../_models/loadData';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

import { DialogService } from '../../../../services/dialog.service';
import { SignInComponent } from '../../registration/sign-in/sign-in.component';
import { SignUpComponent } from '../../registration/sign-up/sign-up.component';

import { AppService } from '../../../../services/app.service';

import { AuthenticationService } from '../../../../_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { VgAPI, VgCoreModule } from 'videogular2/compiled/core';
import { VgControlsModule } from 'videogular2/compiled/controls';
import { VgOverlayPlayModule } from 'videogular2/compiled/overlay-play';
import { Globals } from 'src/app/globals';
import { MetafrenzyService } from 'ngx-metafrenzy';
@Component({
  selector: 'app-index-page',
  templateUrl: './index-page.component.html',
  styleUrls: ['./index-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class IndexPageComponent implements OnInit {

  // pdfSrc = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  pdfSrc: any;
  courseGifLoader: boolean = false;

  @Input()
  public set loadCourses(data: any) {

    this.load_data = data;
  }



  @ViewChild(MatMenuTrigger, null) trigger: MatMenuTrigger;
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
  avtiveSubCategory: Number;
  activeSubCategory: Number;
  allSubCategories: SubCategory[];
  subCategories: SubCategory[];
  activeMainCategoryObj: MainCategory;
  playVideoOnHover: any;
  mutePlay: boolean;
  courseApi: VgAPI;
  api: any;
  appVideoApi: any;
  sliderCount: number = 6;
  sliderColumnCount: number = 3;
  sliderRowCount: number;
  templateVideoApi: any;
  langStyle: any;
  constructor(
    public globals: Globals,
    public translate: TranslateService,
    public dialogService: DialogService,
    public authenticationService: AuthenticationService,
    public app_ser: AppService,
    public router: Router,
    public route: ActivatedRoute,
    private ngxService: NgxUiLoaderService,
    private readonly metafrenzyService: MetafrenzyService,
    private modalService: NgbModal
  ) {
    this.templateVideoApi = [];
    this.courseApi = null;
    this.mutePlay = true;
    this.playVideoOnHover = false;
    this.sliderRowCount = this.sliderCount / this.sliderColumnCount;
    this.activeMainCategory = 0;
    this.activeSubCategory = 0;
    this.activeSubCategory = parseInt(this.route.snapshot.params['catId'] ? this.route.snapshot.params['catId'] : 0);

    this.initData();
    this.langStyle = "wrapper-index-page-" + this.app_ser.app_lang();

  }
  initData() {
    this.ngxService.start();

    this.activeMainCategoryObj = null;
    var data1 = { data: { page: 0, size: 100 } };
    this.load_data = new Data();


    this.app_ser.post("site_feed/course/load_data/" + this.activeSubCategory, data1).subscribe(
      data => {

        this.globals.appVideo = data.app_video;
        this.globals.appVideoDeravations = data.video_derivation;


        this.isLoading = 1;
        this.subCategories = data.sub_categories;
        this.load_data = data;
        var itr = 0;
        for (const value of this.load_data.main_categories) {
          this.load_data.main_categories[itr].slide_courses = this.chunk(value.courses, 6);
          itr++;
        }
        // this.filterCategory(this.activeSubCategory);

        this.ngxService.stop();

      },
      error => {

      });
  }
  // filterCategory(cat_id) {
  //   // this.router.routeReuseStrategy.shouldReuseRoute = function () {
  //   //   return false;
  //   // };
  //   this.activeSubCategory = cat_id;

  //   this.load_data.main_categories = []

  //   if (cat_id) {
  //     let main_cat_obj: MainCategory;
  //     for (let i = 0, len = this.load_data_temp.main_categories.length; i < len; i += 1) {
  //       let temp_arr = [];
  //       main_cat_obj = this.app_ser.copyObj(this.load_data_temp.main_categories[i]);
  //       for (let j = 0, len1 = main_cat_obj.courses.length; j < len1; j += 1) {
  //         if (main_cat_obj.courses[j].course_category == cat_id) {
  //           temp_arr.push(main_cat_obj.courses[j]);
  //         }
  //       }

  //       if (temp_arr.length != 0) {
  //         main_cat_obj.courses = temp_arr;
  //         this.load_data.main_categories.push(main_cat_obj);
  //       }
  //     }
  //   }
  //   else {
  //     this.load_data = this.app_ser.copyObj(this.load_data_temp);
  //   }

  //   var itr = 0;
  //   for (const value of this.load_data.main_categories) {

  //     this.load_data.main_categories[itr].slide_courses = [];
  //     this.load_data.main_categories[itr].slide_courses = this.chunk(value.courses, 6);
  //     itr++;
  //   }
  //   // this.main_categories_test = this.load_data.main_categories;

  // }
  ngOnInit() {

  }


  templateNavigation(template) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigate(['/template/' + template.id + '/' + this.app_ser.urlString(template.name, template.name_en)]);

  }
  openMyMenuGallery(b) {
    this.trigger.toggleMenu();
  }
  openMyMenuCategories(a) {
    this.trigger.toggleMenu();
  }
  closeMyMenuGallery() {
    this.trigger.closeMenu();
  }
  closeMyMenuCategories() {
    this.trigger.closeMenu();
  }
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }


  getCoursePopupClass(index, length, id) {
    if (index % this.sliderColumnCount == 0) {
      if (this.app_ser.app_lang() == 'ar') {
        return 'transition-right' + ' ' + this.courseBorderRadiusClasses(index, length) + ' ' + this.courseHover(id);
      }
      else {
        return 'transition-left' + ' ' + this.courseBorderRadiusClasses(index, length) + ' ' + this.courseHover(id);
      }

    }
    if (index % this.sliderColumnCount == this.sliderColumnCount - 1) {
      if (this.app_ser.app_lang() == 'ar') {
        return 'transition-left' + ' ' + this.courseBorderRadiusClasses(index, length) + ' ' + this.courseHover(id);
      }
      else {
        return 'transition-right' + ' ' + this.courseBorderRadiusClasses(index, length) + ' ' + this.courseHover(id);
      }
    }
    return 'transiton-center' + ' ' + this.courseBorderRadiusClasses(index, length) + ' ' + this.courseHover(id);
  }

  showVideoOnOver(course) {
    this.courseGifLoader = true;
    this.appVideoApi.pause();
    for (var key in this.templateVideoApi) {
      // check if the property/key is defined in the object itself, not in parent
      this.templateVideoApi[key].pause();
    }
    this.playVideoOnHover = course.id;
    // this.ngxService.start('loader-02');
    // this.muteAndPlay(course);
    // this.api.volume = 0;

  }
  runTemplateVideo(template) {
    this.appVideoApi.pause();
    for (var key in this.templateVideoApi) {
      if (key != template.id) {
        this.templateVideoApi[key].pause();
      }
    }
  }
  runAppVideo() {

    for (var key in this.templateVideoApi) {
      this.templateVideoApi[key].pause();
    }
  }
  courseHover(id) {

    if (this.playVideoOnHover == id) {
      return 'courseHoverClass';
    }
    return;
  }

  hideVideoOnOver(course) {
    // this.ngxService.stop('loader-02');
    this.playVideoOnHover = 0;
    this.courseGifLoader = false;
    course.volume = 0;


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

  onPlayerReady(api: VgAPI, mode, element = null) {


    switch (mode) {
      case "video_app":
        this.appVideoApi = api;
        this.appVideoApi.getDefaultMedia().subscriptions.loadedData.subscribe(() => {
          this.appVideoApi.volume = 0.3;
          this.appVideoApi.getDefaultMedia().currentTime = 0.1;
          this.appVideoApi.play();


          // this.appVideoApi.pause();
          // this.appVideoApi.play();

        });

        // this.api = api;
        break;

      case "courses":

        // this.ngxService.startLoader('loader-02')
        api.volume = 0;
        this.api = api;
        this.courseApi = api;
        // this.ngxService.stop('loader-02')
        this.api.getDefaultMedia().subscriptions.loadedData.subscribe(() => {
          // this.ngxService.stop('loader-02');

          this.api.volume = 0;

        });


        // this.api.volume = 0;
        // element.volume = 0;

        break;

      case "template":

        this.templateVideoApi[element.id] = api;
        this.templateVideoApi[element.id].getDefaultMedia().subscriptions.loadedData.subscribe(() => {
          this.templateVideoApi[element.id].getDefaultMedia().currentTime = 2;
        });
        this.appVideoApi.pause();
        for (var key in this.templateVideoApi) {
          // check if the property/key is defined in the object itself, not in parent
          if (key != element.id) {
            this.templateVideoApi[key].pause();
          }
        }
        // this.api.pause();

        break;


      default:


    }

  }

  stopCourseLoader() {
    if (this.courseApi && this.courseApi.getDefaultMedia()) {
      if (this.courseApi.getDefaultMedia().currentTime >= 0.1) {
        this.courseGifLoader = false;
      }

    }

  }

  muteAndPlay(course) {
    this.api.volume = !this.api.volume;
    course.volume = this.api.volume;

  }
  previousSlide() {
    alert('hellow');
  }
  courseBorderRadiusClasses(index, length) {

    switch (length) {
      case 1:
        return 'first-element third-element fourth-element sixth-element';
        break;

      case 2:
        switch (index) {
          case 0:
            return 'first-element fourth-element';
            break;
          case 1:
            return 'third-element sixth-element';
            break;
        }

        break;

      case 3:
        switch (index) {
          case 0:
            return 'first-element fourth-element';
            break;
          case 2:
            return 'third-element sixth-element';
            break;
        }

        break;

      case 4:
        switch (index) {
          case 0:
            return 'first-element';
            break;
          case 2:
            return 'third-element sixth-element';
            break;
          case 3:
            return 'fourth-element sixth-element';
            break;
        }

        break;

      case 5:
        switch (index) {
          case 0:
            return 'first-element';
            break;
          case 2:
            return 'third-element sixth-element';
            break;
          case 3:
            return 'fourth-element';
            break;
          case 4:
            return 'sixth-element';
            break;
        }

        break;



      case 6:
        switch (index) {
          case 0:
            return 'first-element';
            break;
          case 2:
            return 'third-element';
            break;
          case 3:
            return 'fourth-element';
            break;
          case 5:
            return 'sixth-element';
            break;
        }

        break;

      default:


    }
  }
  courseBorderRadiusClasses1(index, length) {
    switch (index) {
      case 0:
        return 'first-element';
        break;

      case 2:
        return 'third-element';
        break;

      case 3:
        return 'fourth-element';
        break;

      case 5:
        return 'sixth-element';
        break;

      default:


    }
  }
  // onFileSelected() {
  //   let $img: any = document.querySelector('#file');

  //   if (typeof (FileReader) !== 'undefined') {
  //     let reader = new FileReader();

  //     reader.onload = (e: any) => {
  //       this.pdfSrc = e.target.result;
  //     };

  //     reader.readAsArrayBuffer($img.files[0]);
  //   }
  // }

}
