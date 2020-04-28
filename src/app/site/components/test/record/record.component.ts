import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { MediaRecorder } from '../../../../_models/loadData';

declare var MediaRecorder: any;
// declare var MediaRecorderOptions: any;
@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.scss']
})
// export class RecordComponent {}
export class RecordComponent implements OnInit {
  @ViewChild('recordedVideo', { static: false }) recordVideoElementRef: ElementRef
  @ViewChild('video', { static: false }) videoElementRef: ElementRef

  videoElement: HTMLVideoElement
  recordVideoElement: HTMLVideoElement
  mediaRecorder: any;
  recordedBlobs: Blob[]
  isRecording: boolean = false
  downloadUrl: string
  stream: MediaStream

  constructor() {
  }
  // ngAfterViewInit() {
  //   setTimeout(()=>{
  //     this.loadingMap = true;
  //     if (this.loadingMap == true) {
  //       this.loadMap();
  //     }
  //   },3000);
  // }

  async ngOnInit() {
    
    setTimeout(() => {
      
      this.videoElement = this.videoElementRef.nativeElement
      this.recordVideoElement = this.recordVideoElementRef.nativeElement

      // navigator.mediaDevices.getUserMedia({
      //   video: {
      //     width: 360
      //   },
      //   audio: true
      // }).then(stream => {
      //   this.stream = stream
      //   this.videoElement.srcObject = this.stream
      // })

    }, 1000);

  }
  start() {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 360
      },
      audio: true
    }).then(stream => {
      this.stream = stream
      this.videoElement.srcObject = this.stream
      this.startRecording();
    })
  }

  startRecording() {
    this.recordedBlobs = []
    let options: any = { mimeType: 'video/webm' }

    try {

      if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
        options = { mimeType: 'video/webm; codecs=vp9' };
      } else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
        options = { mimeType: 'video/webm; codecs=vp8' };
      }

      this.mediaRecorder = new MediaRecorder(this.stream, options)
    } catch (err) {
    }

    this.mediaRecorder.start() // collect 100ms of data
    this.isRecording = !this.isRecording
    this.onDataAvailableEvent()
    this.onStopRecordingEvent()
  }

  stopRecording() {
    this.mediaRecorder.stop()
    this.isRecording = !this.isRecording
  }

  playRecording() {
    if (!this.recordedBlobs || !this.recordedBlobs.length) {
      return
    }
    this.recordVideoElement.play()
  }

  onDataAvailableEvent() {
    try {
      this.mediaRecorder.ondataavailable = (event: any) => {
        if (event.data && event.data.size > 0) {
          this.recordedBlobs.push(event.data)
        }
      }
    } catch (error) {
    }
  }

  onStopRecordingEvent() {
    try {
      this.mediaRecorder.onstop = (event: Event) => {
        const videoBuffer = new Blob(this.recordedBlobs, { type: 'video/webm' })
        this.downloadUrl = window.URL.createObjectURL(videoBuffer) // you can download with <a> tag
        this.recordVideoElement.src = this.downloadUrl
      }
    } catch (error) {
    }
  }

}




