import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { FormBuilder, FormGroup } from '@angular/forms';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TestComponent implements OnInit {
  profileForm: FormGroup;
  error: string;

  fileUpload = { status: '', message: '', filePath: '' };
  streams: any;
  activeVideo: any = null;
  file: any = null;
  loadGifLoader: boolean;
  constructor(private app_ser: AppService, private fb: FormBuilder) { }

  ngOnInit() {
    this.profileForm = this.fb.group({
      name: [''],
      profile: ['']
    });

    this.initMedia();
  }

  initMedia() {
    this.app_ser.get("media").subscribe(
      data => {

        this.streams = data;
        // if (this.streams.length) {
        //   this.showVideo(this.streams[this.streams.length - 1]);

        // }

      },
      error => {
      });
  }

  onSelectedFile(event) {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.profileForm.get('profile').setValue(this.file);
    }
  }
  // return this.http.post<any>(this.endPoint + url, formData, {

  //   reportProgress: true,
  //   observe: 'events'
  // }).pipe(
  //   map(event => this.getEventMessage(event, formData)),
  //   catchError(this.handleError)
  // );
  onSubmit() {
    this.loadGifLoader = true;
    this.file = null;
    this.app_ser.post("upload_video", { file: this.profileForm.get('profile').value }).subscribe(
      data => {
        console.log("test", data)

        this.initMedia();
        this.loadGifLoader = false;

      },
      error => {
        this.loadGifLoader = false;
      });
    return

    this.app_ser.post("upload_video", { file: this.profileForm.get('profile').value }).subscribe(
      data => {
        this.file = null
        console.log("test", data)
        this.initMedia();

      },
      error => {
      });
    return


  }




  showVideo(stream) {
    this.app_ser.showVideo(stream);

  }

}


