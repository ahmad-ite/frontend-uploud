import { Injectable } from '@angular/core';


import { HttpClient, HttpEvent, HttpErrorResponse, HttpEventType, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ShowVideoComponent } from '../components/show-video/show-video.component';
import { NgbActiveModal, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Injectable({
  providedIn: 'root'
})
export class AppService {
  HttpUploadOptions: { headers: HttpHeaders; };
  header: HttpHeaders;
  endPoint: string;
  closeResult: string;

  constructor(
    public http: HttpClient,
    private modalService: NgbModal,
  ) {
    this.endPoint = "http://127.0.0.1:4000/";
    this.endPoint = "http://ec2-52-86-56-42.compute-1.amazonaws.com/api/";
    this.HttpUploadOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT',
        'Access-Control-Allow-Origin': '*',
        "Accept": 'application/json'
      })
    }


    this.header = new HttpHeaders();
    this.header.append('Access-Control-Allow-Origin', '*');
    this.header.append('Access-Control-Allow-Methods', 'GET,POST,OPTIONS,DELETE,PUT');
    this.header.append('content-type', 'application/json');
    this.header.append("Accept", 'application/json');


  }


  init_params(params) {
    var postData: any = new FormData();

    if (params) {
      const keys = Object.entries(params);
      console.log("keys ", keys);
      for (const [key, value] of keys) {
        console.log("key ", key);
        if (key == "data") {
          postData = this.init_param_data(postData, value);
        } else {
          postData.append(key, value);
        }
      }
    }

    let user: any;


    return postData;
  }
  init_param_data(postData, data) {
    const keys = Object.entries(data);
    for (const [key, value] of keys) {
      postData.append("data[" + key + "]", value);
    }
    return postData;
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
  }
  post(url: string, params: object, showError = true) {
    var postData = this.init_params(params);

    console.log("postData params", params);
    console.log("postData", postData);
    return this.http.post<any>(this.endPoint + url, postData, { headers: this.header }).pipe(
      map(response => {
        console.log("response", response)

        if (response) {
          return response;
        }
        else {




          throw "error"



        }
        //
      }, this)

    )
    return this.http.post<any>(url, postData, this.HttpUploadOptions).pipe(

      map(res => res.json())

    )

  }


  get(url: string) {

    return this.http.get<any>(this.endPoint + url, { headers: this.header }).pipe(

      map(response => {
        console.log("response", response)

        if (response) {
          return response;
        }
        else {

          throw "error"



        }
        //
      }, this)

    )


  }






  upload(url, formData) {
    return this.http.post<any>(this.endPoint + url, formData, {

      reportProgress: true,
      observe: 'events'
    }).pipe(
      map(event => this.getEventMessage(event, formData)),
      catchError(this.handleError)
    );
  }

  private getEventMessage(event: HttpEvent<any>, formData) {

    switch (event.type) {
      case HttpEventType.UploadProgress:
        return this.fileUploadProgress(event);
        break;
      case HttpEventType.Response:
        return this.apiResponse(event);
        break;
      default:
        return `File "${formData.get('profile').name}" surprising upload event: ${event.type}.`;
    }
  }

  private fileUploadProgress(event) {
    const percentDone = Math.round(100 * event.loaded / event.total);
    return { status: 'progress', message: percentDone };
  }

  private apiResponse(event) {
    return event.body;
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(`Backend returned code ${error.status}, ` + `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened. Please try again later.');
  }


  async showVideo(video) {
    var modalService = this.modalService.open(ShowVideoComponent, { windowClass: 'termsModal', size: 'lg', centered: true, backdrop: false });

    modalService.componentInstance.activeVideo = video;
    return await modalService.result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result == 'false')
        return false;


      return result;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      return false;
    });

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
