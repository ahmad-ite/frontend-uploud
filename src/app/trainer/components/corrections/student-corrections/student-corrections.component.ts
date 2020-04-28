
import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { AppService } from '../../../../services/app.service';
import { TranslateService } from '@ngx-translate/core';
import { ListOption, Course, Pager, Student, Correction } from 'src/app/_models/loadData';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CorrectionPopupComponent } from '../correction-popup/correction-popup.component';



@Component({
  selector: 'app-student-corrections',
  templateUrl: './student-corrections.component.html',
  styleUrls: ['./student-corrections.component.scss']
})
export class StudentCorrectionsComponent implements OnInit {

  langStyle: any;
  @Input() shadows = true;
  correctionsData: Correction[];
  studentData: Student;
  courseData: any;

  private sorted = false;
  pager: Pager;
  options: ListOption;
  courseId: any;
  studentId: number;
  closeResult: string;
  constructor(

    public app_ser: AppService,
    public translate: TranslateService,
    public route: ActivatedRoute,
    public router: Router,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {
    // alert(111);

    this.courseId = parseInt(this.route.snapshot.params['courseId'] ? this.route.snapshot.params['courseId'] : 0);
    this.studentId = parseInt(this.route.snapshot.params['studentId'] ? this.route.snapshot.params['studentId'] : 0);

    this.options = new ListOption();
    this.correctionsData = [];
    this.pager = new Pager();
    this.options.page = 0;
    this.loadPage();

    this.langStyle = "wrapper-student-corrections-" + this.app_ser.app_lang();


  }

  ngOnInit() {
  }

  sortBy(by: string | any): void {
    
    // this.options.ordering(by);
    
    // this.loadPage();

    this.correctionsData.sort((a: any, b: any) => {
      if (a[by] < b[by]) {
        return this.sorted ? 1 : -1;
      }
      if (a[by] > b[by]) {
        return this.sorted ? -1 : 1;
      }

      return 0;
    });

    this.sorted = !this.sorted;
  }
  loadPage(index = 0) {

    // this.ngxService.start();
    // this.ngxService.startLoader('loader-01')
    var data1 = { page: this.pager.currentPage, size: this.pager.pageSize }


    this.app_ser.post("site_feed/TrainerCourse/student_corrections/" + this.courseId + "/" + this.studentId, { data: data1 }).subscribe(
      data => {
        
        // this.ngxService.stopLoader('loader-01')
        this.pager = this.app_ser.paginate(data.total, data.page + 1, data.size);
        
        this.correctionsData = data.rows;
        this.studentData = data.student;
        this.courseData = data.course;
        if (this.correctionsData[index])
          this.showCorrectionPopup(index);
        else {
          if (this.correctionsData.length)
            this.showCorrectionPopup(this.correctionsData.length - 1);

        }

      },
      error => {
        
      });
  }
  onChangePage(page) {
    this.pager.currentPage = page - 1;
    this.loadPage();
  }
  corrections(stdId) {

    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
    this.router.navigate(["trainer/corrections/" + this.courseId + "/student/" + stdId + "/answers"]);

  }
  async showCorrectionPopup(index) {
    // alert(index);
    if (this.correctionsData[index]) {
      const correctionModal = this.modalService.open(CorrectionPopupComponent, { windowClass: 'correctionPopup', size: 'lg', centered: true, backdrop: false });
      correctionModal.componentInstance.correctionData = this.correctionsData[index];
      correctionModal.componentInstance.studentData = this.studentData;
      correctionModal.componentInstance.courseData = this.courseData;

      return await correctionModal.result.then((result) => {
       
        this.closeResult = `Closed with: ${result}`;
        if (result == 'false')
          return false;
        if (result) {
          return this.popNext(index);
        }




        return;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        return false;
      });
    }

  }
  popNext(index) {
    this.correctionsData.splice(index, 1);
    if (index == this.correctionsData.length) {
      this.pager.currentPage = this.pager.currentPage - 1;
      this.loadPage(index)

    }
    else {
      this.showCorrectionPopup(index);
    }

  }
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
