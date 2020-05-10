import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import * as OT from '@opentok/client';
import { OpentokService } from 'src/app/services/Opentok/opentok.service';

@Component({
  selector: 'app-test-stream',
  templateUrl: './test-stream.component.html',
  styleUrls: ['./test-stream.component.scss'],
  providers: [OpentokService]
})
export class TestStreamComponent implements OnInit {

  title = 'Angular Basic Video Chat';
  session: OT.Session;
  streams: Array<OT.Stream> = [];
  changeDetectorRef: ChangeDetectorRef;

  constructor(private ref: ChangeDetectorRef, private opentokService: OpentokService) {
    this.changeDetectorRef = ref;
  }

  ngOnInit() {
    this.opentokService.initSession().then((session: OT.Session) => {
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
  }
}

