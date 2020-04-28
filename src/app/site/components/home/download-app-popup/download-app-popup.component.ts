import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-download-app-popup',
  templateUrl: './download-app-popup.component.html',
  styleUrls: ['./download-app-popup.component.scss']
})
export class DownloadAppPopupComponent implements OnInit {
  showMobileApp : boolean = true;
  constructor() { }

  ngOnInit() {
  }
  hidePopup(){
    this.showMobileApp = false;
  }
}
