import { Injectable } from '@angular/core';
import { StepCategory, StepTemplate } from '../models/stepModel';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }


  initTools() {
    let stepCatogories = [];


    /* =============****************============= INIT TEXT CATEGORIES START =============****************============= */
    let stepCatogory = new StepCategory();
    stepCatogory.id = 'text';
    stepCatogory.name = 'Text'
    stepCatogory.icon = 'far fa-text-size';


    /* ********** INSERT TEXT START ********** */
    let step = new StepTemplate();
    step.type = 'textbox';
    step.name = 'Text insert';
    step.icon = 'far fa-text-size';
    stepCatogory.steps.push(step);
    /* ********** INSERT TEXT END ********** */

    stepCatogories.push(stepCatogory);
    /* =============****************============= INIT TEXT CATEGORIES END =============****************============= */


    /* =============****************============= INIT OPTIONS CATEGORIES START =============****************============= */
    stepCatogory = new StepCategory();
    stepCatogory.id = 'options';
    stepCatogory.name = 'Options';
    stepCatogory.icon = 'far fa-list-ul';


    /* ********** CHOICE START ********** */
    step = new StepTemplate();
    step.type = 'choice'
    step.name = 'Choice';
    step.icon = 'far fa-list-alt';
    stepCatogory.steps.push(step);
    /* ********** CHOICE END ********** */

    /* ********** CORRECT START ********** */
    step = new StepTemplate();
    step.type = 'correct'
    step.name = 'Correct';
    step.icon = 'far fa-clipboard-list-check';
    stepCatogory.steps.push(step);
    /* ********** CORRECT END ********** */

    /* ********** MATCH START ********** */
    step = new StepTemplate();
    step.type = 'match'
    step.name = 'Match';
    step.icon = 'far fa-clone';
    // stepCatogory.steps.push(step);
    /* ********** MATCH END ********** */

    /* ********** ARRANGE START ********** */
    step = new StepTemplate();
    step.type = 'arrange'
    step.name = 'Arrange';
    step.icon = 'far fa-sort-alt';
    // stepCatogory.steps.push(step);
    /* ********** ARRANGE END ********** */




    stepCatogories.push(stepCatogory);
    /* =============****************============= INIT OPTIONS CATEGORIES START =============****************============= */

    /* =============****************============= INIT VIDEO TOOL START =============****************============= */
    stepCatogory = new StepCategory();
    stepCatogory.id = 'play';
    stepCatogory.name = 'Video'
    stepCatogory.icon = 'far fa-play-circle';


    /* ********** VIDEO START ********** */
    step = new StepTemplate();
    step.type = 'play';
    step.name = 'Video';
    step.icon = 'far fa-tv';
    stepCatogory.steps.push(step);
    /* ********** VIDEO END ********** */

    stepCatogories.push(stepCatogory);
    /* =============****************============= INIT VIDEO TOOL END =============****************============= */

    /* =============****************============= INIT AUTOCUE TOOL START =============****************============= */
    stepCatogory = new StepCategory();
    stepCatogory.id = 'autocue';
    stepCatogory.name = 'Autocue test'
    stepCatogory.icon = 'far fa-video';


    /* ********** VIDEO AUTOCUE START ********** */
    step = new StepTemplate();
    step.type = 'autocue';
    step.name = 'Video Autocue Test';
    step.icon = 'far fa-video';
    stepCatogory.steps.push(step);
    /* ********** VIDEO AUTOCUE END ********** */

    /* ********** VOICE AUTOCUE START ********** */
    step = new StepTemplate();
    step.type = 'autocue-voice';
    step.name = 'Voice Autocue';
    step.icon = 'far fa-microphone-alt';
    stepCatogory.steps.push(step);
    /* ********** VOICE AUTOCUE END ********** */

    stepCatogories.push(stepCatogory);
    /* =============****************============= INIT AUTOCUE TOOL END =============****************============= */

    /* =============****************============= INIT RECORD TOOL START =============****************============= */
    stepCatogory = new StepCategory();
    stepCatogory.id = 'record';
    stepCatogory.name = 'Record'
    stepCatogory.icon = 'far fa-camcorder';


    /* ********** VIDEO RECORD START ********** */
    step = new StepTemplate();
    step.type = 'video';
    step.name = 'Video record';
    step.icon = 'far fa-camcorder';
    stepCatogory.steps.push(step);
    /* ********** VIDEO RECORD END ********** */

    /* ********** VOICE RECORD START ********** */
    step = new StepTemplate();
    step.type = 'sound';
    step.name = 'Record Sound';
    step.icon = 'far fa-headphones-alt';
    stepCatogory.steps.push(step);
    /* ********** VOICE RECORD END ********** */

    stepCatogories.push(stepCatogory);
    /* =============****************============= INIT RECORD TOOL END =============****************============= */


    /* =============****************============= INIT UPLOAD TOOL START =============****************============= */
    stepCatogory = new StepCategory();
    stepCatogory.id = 'upload';
    stepCatogory.name = 'Upload'
    stepCatogory.icon = 'far fa-cloud-upload-alt';


    /* ********** UPLOAD VIDEO START ********** */
    step = new StepTemplate();
    step.type = 'upload-video';
    step.name = 'Upload Video';
    step.icon = 'far fa-file-video';
    stepCatogory.steps.push(step);
    /* ********** UPLOAD VIDEO END ********** */

    /* ********** UPLOAD SOUND START ********** */
    step = new StepTemplate();
    step.type = 'upload-sound';
    step.name = 'Upload Sound';
    step.icon = 'far fa-file-audio';
    stepCatogory.steps.push(step);
    /* ********** UPLOAD SOUND END ********** */

    /* ********** UPLOAD IMAGE START ********** */
    step = new StepTemplate();
    step.type = 'upload-image';
    step.name = 'Upload Image';
    step.icon = 'far fa-file-image';
    stepCatogory.steps.push(step);
    /* ********** UPLOAD IMAGE END ********** */

    /* ********** UPLOAD FILE START ********** */
    step = new StepTemplate();
    step.type = 'upload-document';
    step.name = 'Upload File';
    step.icon = 'far fa-file-word';
    stepCatogory.steps.push(step);
    /* ********** UPLOAD FILE END ********** */

    stepCatogories.push(stepCatogory);
    /* =============****************============= INIT UPLOAD TOOL END =============****************============= */



    return stepCatogories

  }
}
