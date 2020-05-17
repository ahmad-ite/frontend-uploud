import { VgAPI, VgCoreModule } from 'videogular2/compiled/core';
export class Data {
  main_categories: MainCategory[];
  sub_categories: SubCategory[];
  slides_categories: MainCategory[];
  trainers: Trainer[];
  app_video: string;
  video_derivation: VideoDerivation;
}
export class videoAPI {
  video_app: any;
  courses: any[];
  templates: any[];
}
export class Media {
  api: any
  volume: number
  constructor(api: any = null) {
    this.volume = 0;
    if (api)
      this.api = api;

  }
}

export class DashboardInfo {
  students_count: number;
  students_finished_count: number;
  students_unfinished_count: number;
  courses_count: number;
  courses_correction_count: number;
  certificates_count: number;
}

export class SubCategory {
  id: number;
  name: string;
  name_en: string;
  arrange: number;
  status: number;
  added_by?: any;
  image: string;
  fa_icon: string;
  courses: Course[];
  slide_courses: Course[];
}

export class MainCategory {
  id: number;
  name: string;
  name_en: string;
  arrange: number;
  status: number;
  added_by: number;
  image: string;
  video: string;
  video_derivation: VideoDerivation;
  sub_categories: SubCategory[];
  courses: Course[];
  slide_courses: Course[];
  fa_icon: string;
  color: string;
  css_class: string;
  categories: SubCategory[];
}
export class TemplateCategoryCourse {
  main_category: MainCategory;
  sub_categores: SubCategory[];
  sub_category: SubCategory;
  app_video: string;
  video_derivation: VideoDerivation;
  most_views_courses: Course[];
  recent_courses: Course[];
  free_courses: Course[];
  recommended: Course[];
  custom_category: Slide[];
}
export class Slide {
  name: String;
  slides: Course[];
}
export class TrainerData {
  trainer: Trainer;
  other_trainers: Trainer[];
}

export class Trainer {
  id: number;
  status: number;
  is_trainer: number;
  isPanelAdmin: number;
  updated: string;
  regDate: string;
  lastLogin: null;
  name: string;
  lang: string;
  email: string;
  gender: number;
  nationality: number;
  qualifications: number;
  residence: number;
  position: null;
  foundation: null;

  description: null;
  family: number;
  image: string;
  dob: null;
  phone: null;
  origin: string;
  address: string;
  pobox: null;
  facebook: string;
  institute: number;
  certificates: TrainerDoc[];
  experience: number;
  twitter: string;
  instagram: string;
  linkedin: string;
  allowAutocue: number;
  trainerApproved: number;
  demonstration_video: TrainerDoc;
  training_video: TrainerDoc;
  trainer_signature: TrainerDoc;
  signature: TrainerDoc;
  cv: TrainerDoc;
  details: Details;
  bank_details: Details;
  bankDetail: Details;
  categories: any[];
  courses: Course[];
  captcha: string;
  pwd: string;
  confirmPwd: string;
  code: string;


}

export class InputTrainer {
  id: number;
  name: string;
  lang: string;
  email: string;
  gender: number;
  nationality: number;
  qualifications: number;
  residence: number;
  position: null;
  foundation: null;
  description: null;
  family: number;
  image: string;
  dob: null;
  phone: null;
  origin: string;
  address: string;
  pobox: null;
  facebook: string;
  institute: number;
  certificates: [];
  experience: number;
  twitter: string;
  instagram: string;
  linkedin: string;

  demonstration_video: string;
  training_video: string;
  trainer_signature: string;
  signature: string;
  cv: string;
  bank: string;
  account_number: number;
  iban: any;
  swift_code: number;
  categories: any[];
  captcha: string;

}
export class Pager {
  pages: any[];
  currentPage: any = 0;
  totalPages: any;
  show: boolean;
  totalItems: any;
  pageSize: any = 10;
  startPage: any;
  endPage: any;
  startIndex: any;
  endIndex: any

}


export class ListOption {
  page: any = 0;
  size: any = 10;
  total: any;
  disablePager: boolean;
  orderBy: any = "id";
  orderType: any = "asc";
  order: any = "";

  ordering(field: any) {
    this.orderBy = field;
    if (this.orderType == "asc") {
      this.orderType = ""
      this.order = "";
      return
    }
    if (this.orderType == "") {
      this.orderType = "desc"
    }
    if (this.orderType == "desc") {
      this.orderType = "asc"
    }

    this.order = this.orderBy + " " + this.orderType;

  }


}
export class Certificate {
  id: number;
  user: number;
  register: number;
  cirtificate: string;
  enter_date: any;
  course_name: string;
  course_image: string;
  trainer_name: string;
}

export class Payment {
  id: number;
  payment_id: any;
  status: any;
  type: any;
  amount: any;
  currency: any;
  course: any;
  user: any;
  coupon_id: any;

  create_time: any;
  intent: any;

  all_details: any;
  payer_email: any;
  payer_id: any;



}
export class Course {
  id: number = 0;
  name: string;
  code: number;
  template: string;
  create_date: string;
  updated: string;
  status: number;
  listed: number;
  last_approved: string;
  course_category: number;
  price: any;
  text_price: any;
  old_price: any;
  cover_image: string;
  hours: number;
  trainer: number;
  repeat_count: number;
  level: number;
  pass_mark: number;
  is_ordering: number;
  youtube: string;
  description: string;
  lang: string;
  video: string;
  is_star: number;
  template_id: number;
  last_approve: string;
  register_date: string;
  is_basket: number;
  is_interested: number;
  is_register: number;
  video_derivation: VideoDerivation;
  register_id: number;
  trainer_name: string;
  students_count: number;
  std_rating_count: number;
  average_rate: number;
  items_count: number;
  volume: number = 1;
  certificate: string;
  template_name: string;
  category_name: string;
}
export class SearchResult {
  count: number;
  page: number;
  pager: number;
  size: number;
  rows: SearchRow[];
  lang: string;
}

export interface SearchRow {
  id: string;
  entity_id: number;
  entity_type: string;
  entity_type_id: number;
  name: string;
  code: number;
  description: string;
  status: number;
  price: number;
  gif: string;
  image: string;
  video: string;
  parent_data: string;
  lang: string;
  suggestions: string;
  freq: number;
  _version_: number;
  score: number;
  ad: number;
  is_interested: any;
  volume: any;
}
export class TrainerDoc {
  id: number;
  trainer: number;
  doc: string;
  docType: string;
  name: string;
  video_derivation: string;
}

export class Details {
  importantInfo: string;
  study: string;
  experince: number;
  hours: string;
  old: string;
  institutes: string;
  bank: string;
  account_number: number;
  iban: any;
  swift_code: number;
}

export class CourseView {
  id: number;
  type: string;
  name: string;
  code: number;
  template: string;
  create_date: string;
  updated: string;
  status: number;
  listed: number;
  last_approved: string;
  course_category: number;
  price: any;
  cover_image: string;
  hours: number;
  trainer: string;
  repeat_count: number;
  register_count: any
  level: number;
  passMark: number;
  is_ordering: number;
  youtube: string;
  description: string;
  lang: string;
  video: string;
  summary_video: string;
  show_summary: any;
  isStar: number;
  templateID: number;
  date: string;
  skills: any[];
  items: Item[];
  lessons: number;
  register: Register = new Register();
  comments: any[];
  average_rate: number;
  related_courses: Course[];
  students_count: number;
  category: SubCategory;
  course_level: CourseLevel;
  std_join: number;
  trainer_id: any;
  video_derivation: VideoDerivation
  duration: string;
  text_price: any;
  old_price: any;
  seo: any;
  summary_video_derivation: VideoDerivation
}

export class CourseLevel {
  id: number;
  name: string;
  nameEn: string;
}

export class Item {
  id: number;
  course: number;
  arrange: number;
  name: string;
  type: string;
  status: number;
  passMark: number;
  pass_mark: number;
  last_approved: string;
  settings: Settings;
  is_basic: number;
  image: null;
  apply: Apply[];
  duration: number;
  apply_repeat: number;
  steps_count: number;
}

export class Apply {
  id: number;
  register: number;
  user: number;
  item: number;
  version: string;
  updated: Date;
  finished: Date;
  started: Date;
  status: number;
  mark_status: number;
  apply_marks: number;
  total_marks: number;
  complete: number;



}




export class Settings {
  input_repeat_exams: number;
  save_answers_on_move: number;
  exam_no_mark: number;
  exam_show_result: number;
  exam_no_back: number;
  exam_show_correct: number;
  exam_custom_navigating: number;
  input_repeat_lesson: number;
  lesson_no_mark: number;
  lesson_show_result: number;
  lesson_no_back: number;
  lesson_show_correct: number;
  lesson_custom_navigating: number;
}
export class VideoDerivation {
  uuid: string;
  file_name: string;
  duration: number;
  q_240: string;
  q_360: string;
  q_480: string;
  gif: string;
  thump: string;
  q_720: string;
  q_1080: string;
  dubbings: Dubbings;
  dubbing: Dubbings;
  subtitles: Subtitles;
}
export class Dubbings {
  ar: Directive;
  en: Directive;
  tu: Directive;
  or: Directive;
  fr: Directive;
  ar_video_derivation: VideoDerivation;
  en_video_derivation: VideoDerivation;
  tu_video_derivation: VideoDerivation;
  or_video_derivation: VideoDerivation;
  fr_video_derivation: VideoDerivation;
}
export class Directive {
  id: number;
  basic_uuid: string;
  file: string;
  type: string;
  lang: string;
  name: string;
}
export class Subtitles {
  ar: Directive;
  en: Directive;
  tu: Directive;
  or: Directive;
  fr: Directive;
}
export class stepsInfo {
  course: Course;
  item: Item;
  settings: Settings;
  start_step_arrang: number;
  id: number;
  arrange: number;
  name: string;
  type: string;
  status: number;
  pass_mark: number;
  is_basic: number;
  image: string;
  steps: Step[];
  student_steps: activeStep[];
  hash: string;
  start_index: number;
  start_step_id: number;
  answers: any[];
  register: Register;
  other_items: Item[];
}
export class Register {
  id: number;
  user: number;
  course: number;
  price: number;
  register_date: string;
  status: number;
  rate: number;
  payment_id: number;
  updated: string;
  last_approved: string;
  review: null;
  dubbing_lang: string;
  subtitle_lang: string;
}

export class Step {
  id: number;
  course_item: number;
  type: string;
  status: number;
  arrange: number;
  title: any;
  video: string;
  question: string;
  instructions: string;
  options: any[];
  settings: StepSettings;
  updated: string;
  attachment: Attachment;
  mark: number;
  expected_time: number;
  force_time: number;
  navigating: string;
  navigating_video_derivation: VideoDerivation
  skip: number;
  video_derivation: VideoDerivation;
}

export class ApplyResultDetails {
  user: number;
  item: number;
  apply_id: number;
  step: number;
  seconds: number;
  data: number;
  mark_by: number;
  mark: number;
  apply_result: ApplyResult;
  correct: Correct[];
  is_correct: boolean;
  status: number;
  register: number;
  version: string;
  finished: Date;
  started: Date;
  steps: number[];

}



export class Correct {
  correct: boolean;
  arrange: any;
}

export class activeItem {


  type: string;
  index: any = -1;
  item: Item;
  start: any;
  completed: any;


  constructor() {
    this.index = -1;
    this.item = new Item();
    this.type = "item";
    this.completed = false;
  }

}

export class activeStep {


  type: string;
  index: any = -1;
  step: Step;
  start: any;
  end: any;
  data: any;
  options: any;
  init_options: any;
  selected: any;
  enabled: any;
  skip: any;
  timeout: any;
  isAnswer: any;
  files: any;
  sended: any;
  changeable: any;
  dubbingList: any[];
  subtitleList: any[];
  video: any;
  video_derivation: any;
  showResult: boolean = false;

  constructor() {
    this.index = -1;
    this.step = new Step();
    this.isAnswer = false;
    this.skip = false;
    this.timeout = false;
    this.enabled = false;
    this.showResult = false;
    this.options = [];
    this.init_options = [];
    this.files = [];
    this.type = "default";
    this.sended = 0;
    this.changeable = 1;
    this.dubbingList = [];
    this.subtitleList = [];

  }

}
export class Blog {
  id: number = 0;
  title: string;

  create_date: string;

  status: number;
  writer: string;




  image: string;
  lang: string;

  short: string;
  seo: any;
  description: string;


}
export class Answer {

  data: any;
  seconds: Number;
  id: Number
  user: number;
  item: number;
  apply_id: number;
  updated: Date;
  step: number;
  mark: number;
  mark_by: number;
}



export class ApplyResult {
  apply: Apply;
  answers: Answer[];
}


export class Attachment {
  files: any[];
}
export class StepSettings { }



export class Model {
  id: Number;
  name: string;
}

export class User {
  name: string;
  id: number;
  email: string;
  lang: number;
  password: string;
  token: string;
  token_date: Date;
  is_trainer: number;
  status: number;
  image: string;
  address: string;

  gender: any;
  residence: any;
  nationality: any;
  phone: any;



}


export class Student {
  name: string;
  id: number;
  email: string;
  phone: number;
  lang: number;
  pwd: string;
  confirmPwd: string;
  is_trainer: number;
  gender: number;
  status: number;
  image: string;
  nationality: any;
  residence: string;
  family: string;
  captcha: string;
  code: string;
  subject: string;
  message: string;
  answers_count: any; image_url: any;
  address: any;


}

export class Correction {
  id: number;
  user: number;
  item: number;
  item_name: string;
  apply_id: number;
  updated: Date;
  step: number;
  seconds: number;
  mark: number;
  mark_by: number;
  data: any;
  version: any;
  student_name: any;
  type: string;
  expected_time: number;
  question: string;
  skip: number;
  news: string;
}

export class Socialusers {
  provider: string;
  id: string;
  email: string;
  name: string;
  image: string;
  token?: string;
  idToken?: string;
}
export class InternalPayment {
  from: any;
  to: any;
  detailsAr: any;
  detailEn: any;
}
export class StreamConfig {
  API_KEY: any = "46715742";
  SESSION_ID: any = "2_MX40NjcxNTc0Mn5-MTU4OTY5OTUyNTMxOX5SUlpsdWZJbWc4RUNQWnJRRGd2b0hQZ2l-QX4";
  TOKEN: any = "T1==cGFydG5lcl9pZD00NjcxNTc0MiZzaWc9Yzg1YzMyZTE1NTQ1Y2FjYzA1N2IwODA1YjZlYWY1NmUwMTM0ZTdhZjpzZXNzaW9uX2lkPTJfTVg0ME5qY3hOVGMwTW41LU1UVTRPVFk1T1RVeU5UTXhPWDVTVWxwc2RXWkpiV2M0UlVOUVduSlJSR2QyYjBoUVoybC1RWDQmY3JlYXRlX3RpbWU9MTU4OTY5OTUyNSZyb2xlPW1vZGVyYXRvciZub25jZT0xNTg5Njk5NTI1LjM4OTIyMDQyMzQ0ODM4JmV4cGlyZV90aW1lPTE1OTAzMDQzMjUmY29ubmVjdGlvbl9kYXRhPW5hbWUlM0RKb2hubnkmaW5pdGlhbF9sYXlvdXRfY2xhc3NfbGlzdD1mb2N1cw==";
  SAMPLE_SERVER_BASE_URL: 'http://kun.academy';



}
export class KEY_CODE {
  RIGHT_ARROW: number = 39;
  LEFT_ARROW: number = 37;
  UP_ARROW: number = 38;
  DOWN_ARROW: number = 40;
  SPACE: number = 32;
  ENTER: number = 13;


  ESC: number = 27;



}
