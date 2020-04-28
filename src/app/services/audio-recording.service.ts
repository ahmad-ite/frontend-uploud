import { Injectable, NgZone } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { AppService } from './app.service';
interface RecordedAudioOutput {
  blob: Blob;
  title: string;
}
@Injectable({
  providedIn: 'root'
})
export class AudioRecordingService {



  private stream;
  private recorder;
  private interval;
  private startTime;
  private _recorded = new Subject<RecordedAudioOutput>();
  private _recordingTime = new Subject<string>();
  private _recordingFailed = new Subject<string>();
  public app_ser: AppService;
  public video = document.querySelector('video');

  getRecordedBlob(): Observable<RecordedAudioOutput> {
    return this._recorded.asObservable();
  }

  getRecordedTime(): Observable<string> {
    return this._recordingTime.asObservable();
  }

  recordingFailed(): Observable<string> {
    return this._recordingFailed.asObservable();
  }


  stopRecordingCallback() {
    this.video.src = this.video.srcObject = null;
    this.video.muted = false;
    this.video.volume = 1;
    this.video.src = URL.createObjectURL(this.recorder.getBlob());

    this.recorder.camera.stop();
    this.recorder.destroy();
    this.recorder = null;
  }

  startRecording(medai = 'audio') {

    if (this.recorder) {
      // It means recording is already started or it is already recording something
      return;
    }
    var conf = {

    }
    if (medai == 'video') {


      conf = { video: true, audio: true }


      // navigator.mediaDevices.getUserMedia({
      //   video: true,
      //   audio: true
      // }).then(async function (stream) {
      //   let recorder = RecordRTC(stream, {
      //     type: 'video'
      //   });
      //   recorder.startRecording();

      //   const sleep = m => new Promise(r => setTimeout(r, m));
      //   await sleep(3000);

      //   recorder.stopRecording(function () {
      //     let blob = recorder.getBlob();
      //     invokeSaveAsDialog(blob);
      //   });
      // });
    } else {
      conf = { audio: true }

    }
    this._recordingTime.next('00:00');
    navigator.mediaDevices.getUserMedia(conf).then(s => {
      this.stream = s;
      this.record(medai);
    }).catch(error => {
      alert(error);
      this._recordingFailed.next();
    });


  }

  captureCamera(callback) {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true }).then(function (camera) {
      callback(camera);
    }).catch(function (error) {
      alert('Unable to capture your camera. Please check console logs.');
      console.error(error);
    });
  }

  abortRecording() {
    this.stopMedia();
  }

  private record(medai = 'audio') {
    var conf = {

    }
    if (medai == 'video') {
      conf = {
        type: medai,
        mimeType: 'video/mp4'
      }
    }
    else {
      conf = {
        type: medai,
        mimeType: 'audio/webm'
      }
    }

    this.recorder = new RecordRTC.StereoAudioRecorder(this.stream, conf);

    // this.recorder =new RecordRTC.Stereo
    this.recorder.record();
    this.startTime = moment();
    this.interval = setInterval(
      () => {
        const currentTime = moment();
        const diffTime = moment.duration(currentTime.diff(this.startTime));
        const time = this.toString(diffTime.minutes()) + ':' + this.toString(diffTime.seconds());
        this._recordingTime.next(time);
      },
      1000
    );
  }

  private toString(value) {
    let val = value;
    if (!value) {
      val = '00';
    }
    if (value < 10) {
      val = '0' + value;
    }
    return val;
  }

  stopRecording(medai = 'audio') {

    if (this.recorder) {
      this.recorder.stop((blob) => {
        if (this.startTime) {
          var mp3Name = '';
          if (medai == 'video') {
            mp3Name = encodeURIComponent('video_' + new Date().getTime() + '.mp4');
          }
          else {
            mp3Name = encodeURIComponent('audio_' + new Date().getTime() + '.mp3');
          }

          this.stopMedia();
          this._recorded.next({ blob: blob, title: mp3Name });
        }
      }, () => {
        this.stopMedia();
        this._recordingFailed.next();
      });
    }
  }


  private stopMedia() {
    if (this.recorder) {
      this.recorder = null;
      clearInterval(this.interval);
      this.startTime = null;
      if (this.stream) {
        this.stream.getAudioTracks().forEach(track => track.stop());
        this.stream = null;
      }
    }
  }
}
