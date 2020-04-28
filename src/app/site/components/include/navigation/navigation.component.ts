import { Component, OnInit, ViewChild, ViewEncapsulation, Output, EventEmitter, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Data, MainCategory, SubCategory } from '../../../../_models/loadData';
import { AppService } from '../../../../services/app.service';
import { AuthenticationService } from '../../../../_services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Location } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {
  @Input() parentName: string;
  @Output() valueChange = new EventEmitter();
  @Output() tempChange = new EventEmitter();
  @Output() catChange = new EventEmitter();
  @Output() subCatChange = new EventEmitter();
  isLoading: number = 0;
  load_data: Data;
  load_data_temp: Data;
  view_data = {};

  activeMainCategory: Number;
  activeSubCategory: Number;
  allSubCategories: SubCategory[];
  subCategories: SubCategory[];
  activeMainCategoryObj: MainCategory;
  activeSubCategoryObj: SubCategory;
  langStyle: any;


  constructor(
    private ngxService: NgxUiLoaderService,
    private location: Location,
    public translate: TranslateService,
    public authenticationService: AuthenticationService,
    public app_ser: AppService,
    public router: Router,
    public route: ActivatedRoute,
  ) {
    this.initData();
  }

  ngOnInit() {
  }
  initData() {
    // this.ngxService.start();
    // this.activeSubCategory = parseInt(this.route.snapshot.params['catId'] ? this.route.snapshot.params['catId'] : 0);
    this.activeSubCategory = parseInt(this.route.snapshot.firstChild.params['catId'] ? this.route.snapshot.firstChild.params['catId'] : 0);

    var data1 = { data: { page: 0, size: 100 } };
    this.load_data = new Data();
    this.langStyle = "wrapper-header-navigation-" + this.app_ser.app_lang();

    this.app_ser.post("site_feed/course/load_categories", data1).subscribe(
      data => {
        // this.ngxService.stop();

        this.load_data = data;
        this.subCategories = this.load_data.sub_categories;
        // this.initActiveMainCategory();
        this.initActiveSubCategory();

      },
      error => {

      });
  }
  initCategoriesData() {
    // this.ngxService.start();

    this.ngxService.startLoader('loader-02')
    this.activeMainCategory = parseInt(this.route.snapshot.params['tempId'] ? this.route.snapshot.params['tempId'] : 0);
    this.activeSubCategory = parseInt(this.route.snapshot.params['catId'] ? this.route.snapshot.params['catId'] : 0);
    this.activeMainCategoryObj = null;
    var data1 = { data: { page: 0, size: 100 } };
    this.load_data = new Data();
    this.langStyle = "wrapper-lang-" + this.app_ser.app_lang();

    this.app_ser.post("site_feed/course/load_categories", data1).subscribe(
      data => {
        // this.ngxService.stop();
        this.ngxService.stopLoader('loader-02')
        this.load_data = data;
        this.allSubCategories = this.load_data.sub_categories;
        this.initActiveMainCategory();
        this.initActiveSubCategory();

      },
      error => {

      });
  }
  initActiveMainCategory() {
    if (this.activeMainCategory == 0) {
      this.activeMainCategoryObj = null;
      this.subCategories = this.allSubCategories;
      return;
    }

    for (var j = 0; j < this.load_data.main_categories.length; j++) {
      if (this.load_data.main_categories[j].id == this.activeMainCategory) {
        this.activeMainCategoryObj = this.load_data.main_categories[j];
        this.subCategories = this.activeMainCategoryObj.sub_categories;
        return
      }

    }
    this.activeMainCategory = 0;
    this.activeMainCategoryObj = null;
    this.subCategories = this.allSubCategories;
    return null

  }


  initActiveSubCategory() {
    if (this.activeSubCategory == 0) {
      this.activeSubCategoryObj = null;
      return;
    }

    for (var j = 0; j < this.subCategories.length; j++) {
      if (this.subCategories[j].id == this.activeSubCategory) {
        this.activeSubCategoryObj = this.subCategories[j];
        return;

      }

    }
    // this.activeSubCategory = 0;
    // this.activeSubCategoryObj = null;
    return null

  }

  activeMainCatName(lang = "ar") {
    if (this.activeMainCategoryObj) {
      if (lang == "ar")
        return this.activeMainCategoryObj.name
      else
        return this.activeMainCategoryObj.name_en
    }

    if (lang == "ar")
      return 'الكل'
    else
      return 'all'

  }

  activeSubCatName(lang = "ar") {
    if (this.activeSubCategoryObj) {
      if (lang == "ar")
        return this.activeSubCategoryObj.name
      else
        return this.activeSubCategoryObj.name_en
    }

    if (lang == "ar")
      return 'الكل'
    else
      return 'all'

  }

  activeMainCat(template = null) {
    if (template) {
      this.activeMainCategory = template.id;
      this.activeMainCategoryObj = template;
    }
    else {
      this.activeMainCategoryObj = null;
      this.activeMainCategory = 0;
    }

    if (this.activeMainCategory == 0) {
      this.activeMainCategoryObj = null;
      this.subCategories = this.allSubCategories;
      if (this.parentName == 'category-course') {
        this.location.go("course-category/" + this.activeMainCategory + '/' + this.activeSubCategory + '/' + this.app_ser.urlString(this.activeMainCatName(), this.activeMainCatName("en")) + '/' + this.app_ser.urlString(this.activeSubCatName(), this.activeSubCatName("en")))
        this.tempChange.emit(this.activeMainCategory);
        this.catChange.emit(this.activeSubCategory);
        return;
      }
      if (this.parentName == 'home') {
        return this.router.navigate(['/course-category/' + this.activeMainCategory + "/" + this.activeSubCategory + '/' + this.app_ser.urlString(this.activeMainCatName(), this.activeMainCatName("en")) + '/' + this.app_ser.urlString(this.activeSubCatName(), this.activeSubCatName("en"))])
      }

      return;
    }


    this.subCategories = this.activeMainCategoryObj.sub_categories;
    this.initActiveSubCategory();

    if (this.parentName == 'category-course') {
      this.location.go("course-category/" + this.activeMainCategory + '/' + this.activeSubCategory + '/' + this.app_ser.urlString(this.activeMainCatName(), this.activeMainCatName("en")) + '/' + this.app_ser.urlString(this.activeSubCatName(), this.activeSubCatName("en")))
      this.tempChange.emit(this.activeMainCategory);
      this.catChange.emit(this.activeSubCategory);
    }
    if (this.parentName == 'home') {
      this.router.navigate(['/course-category/' + this.activeMainCategory + "/" + this.activeSubCategory + '/' + this.app_ser.urlString(this.activeMainCatName(), this.activeMainCatName("en")) + '/' + this.app_ser.urlString(this.activeSubCatName(), this.activeSubCatName("en"))])
    }

  }
  setactiveSubCategory(subCategory = null) {
    if (subCategory) {
      this.activeSubCategoryObj = subCategory;
      this.activeSubCategory = this.activeSubCategoryObj.id
      this.router.routeReuseStrategy.shouldReuseRoute = function () {
        return false;
      };

      this.router.navigate(['/course-category/' + this.activeSubCategory + "/" + this.app_ser.urlString(this.activeSubCatName(), this.activeSubCatName("en"))])

    } else {
      this.activeSubCategoryObj = null;
      this.activeSubCategory = 0
      this.router.navigate(['/'])

    }


  }
  setactiveSubCategory1(subCategory = null) {
    if (subCategory) {
      this.activeSubCategoryObj = subCategory;
      this.activeSubCategory = this.activeSubCategoryObj.id

    } else {
      this.activeSubCategoryObj = null;
      this.activeSubCategory = 0
    }


    if (this.parentName == "category-course") {
      this.location.go("course-category/" + this.activeMainCategory + '/' + this.activeSubCategory + '/' + this.app_ser.urlString(this.activeMainCatName(), this.activeMainCatName("en")) + '/' + this.app_ser.urlString(this.activeSubCatName(), this.activeSubCatName("en")))
      this.catChange.emit(this.activeSubCategory);
    }
    if (this.parentName == 'home') {
      this.router.navigate(['/course-category/' + this.activeMainCategory + "/" + this.activeSubCategory + '/' + this.app_ser.urlString(this.activeMainCatName(), this.activeMainCatName("en")) + '/' + this.app_ser.urlString(this.activeSubCatName(), this.activeSubCatName("en"))])
    }

    if (this.parentName == "home-index") {
      // this.location.go("course-category/" + this.activeMainCategory + '/' + this.activeSubCategory + '/' + this.app_ser.urlString(this.activeMainCatName(), this.activeMainCatName("en")) + '/' + this.app_ser.urlString(this.activeSubCatName(), this.activeSubCatName("en")))
      this.subCatChange.emit(this.activeSubCategory);
    }

  }
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }

}
