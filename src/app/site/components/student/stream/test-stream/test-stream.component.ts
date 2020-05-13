import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import * as OT from '@opentok/client';
import { OpentokService } from 'src/app/services/Opentok/opentok.service';
import { AppService } from 'src/app/services/app.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { Stream } from 'stream';
import { StreamConfig } from 'src/app/_models/loadData';

@Component({
  selector: 'app-test-stream',
  templateUrl: './test-stream.component.html',
  styleUrls: ['./test-stream.component.scss'],
  providers: [OpentokService]
})
export class TestStreamComponent implements OnInit {

  title = 'Live Testing';
  session: OT.Session;
  streams: Array<OT.Stream> = [];
  changeDetectorRef: ChangeDetectorRef;
  sessionID: string;
  streamConfig: StreamConfig;

  constructor(private ref: ChangeDetectorRef, private opentokService: OpentokService
    , public app_ser: AppService,
    private translate: TranslateService,

    private route: ActivatedRoute,
    private router: Router,

    private toastr: ToastrService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal) {
    this.changeDetectorRef = ref;
  }

  ngOnInit() {
    this.initUser()


  }

  initUser() {
    this.sessionID = '2_MX40NjcxNTc0Mn5-MTU4OTA5MjA4MjI5OH50eG16SFdNSW5SYUVXRWxicTFpZTFuazJ-QX4';
    this.streamConfig = new StreamConfig();

    // this.streamConfig.SESSION_ID = this.sessionID;
    // this.streamConfig.TOKEN = ;
    this.opentokService.initSessionData(this.streamConfig).then((session: OT.Session) => {
      this.session = session;
      this.session.on('streamCreated', (event) => {
        this.streams.push(event.stream);
        this.changeDetectorRef.detectChanges();
      });
      this.session.on('streamDestroyed', (event) => {
        const idx = this.streams.indexOf(event.stream);
        if (idx > -1) {
          this.streams.splice(idx, 1);
          this.changeDetectorRef.detectChanges();
        }
      });
    })
      .then(() => this.opentokService.connect())
      .catch((err) => {
        console.error(err);
        alert('Unable to connect. Make sure you have updated the config.ts file with your OpenTok details.');
      });

    return


    this.app_ser.post("site_feed/Stream/generate_token/" + this.sessionID, {}).subscribe(
      data => {

        this.streamConfig.TOKEN = data;
        this.opentokService.initSessionData(this.streamConfig).then((session: OT.Session) => {
          this.session = session;
          this.session.on('streamCreated', (event) => {
            this.streams.push(event.stream);
            this.changeDetectorRef.detectChanges();
          });
          this.session.on('streamDestroyed', (event) => {
            const idx = this.streams.indexOf(event.stream);
            if (idx > -1) {
              this.streams.splice(idx, 1);
              this.changeDetectorRef.detectChanges();
            }
          });
        })
          .then(() => this.opentokService.connect())
          .catch((err) => {
            console.error(err);
            alert('Unable to connect. Make sure you have updated the config.ts file with your OpenTok details.');
          });



      },
      error => {


      });
  }
}

