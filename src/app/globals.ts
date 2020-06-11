import { Injectable } from '@angular/core';
import { MainCategory, SubCategory, VideoDerivation } from './_models/loadData';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Injectable()
export class Globals {
  role: number = 1;
  appVideo: string;
  lang: string
  appVideoDeravations: VideoDerivation;
  paymentModal: NgbActiveModal;
  test: any = "test";
  quality: string = 'q_480';
  full_screen: boolean = false;
  ar_nationalities: { [key: number]: string };
  en_nationalities: { [key: number]: string };
  ar_instructions: { [key: string]: string };
  en_instructions: { [key: string]: string };
  templates: MainCategory[];
  footerTemplates: MainCategory[];
  subCategories: SubCategory[] = []
  subCategories1: SubCategory[];
  templatesDic: { [key: number]: MainCategory };
  subCategoriesDic: { [key: number]: SubCategory };

}
