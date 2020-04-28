export class StepCategory{
  id: string;
  name: string;
  icon: any;
  steps: StepTemplate[]=[];
}
export class StepTemplate{
  type: string;
  name: string;
  icon: any;
}
export class Textbox {
  type: string;
  title: any;
  video: string;
  question: string;
  instructions: string;
  mark: number;
  expected_time: number;
  skip: number;
  constructor(){
    this.type = 'textbox',
		this.skip = 0,
		this.title = 'تدريب الإجابة على السؤال',
		this.question = 'نص السؤال',
		this.instructions = 'في هذا الإختبار، عليك على السؤال التالي، اضغط على زر “متابعة” عند الإنتهاء من الإجابة ولمتابعة التدريب',
    this.video = '', 
    this.mark = 0, 
    this.expected_time = 60
  }
}
export class Choice {
  type: string;
  title: any;
  video: string;
  question: string;
  instructions: string;
  options: any[];
  mark: number;
  expected_time: number;
  skip: number;
  constructor(){
    this.type= 'choice',
		this.skip= 0,
		this.title= 'تدريب اختيار الأجوبة',
		this.question= 'نص السؤال',
		this.instructions= 'في هذا الإختبار، عليك اختيار اجابة واحدة فقط للسؤال، اضغط على زر “متابعة” عند الإنتهاء من الإجابة ولمتابعة التدريب',
    this.video= '', 
    this.options= [{ t: 'الاختيار الأول' }, { t: 'الاختيار الثاني' }, { t: 'الاختيار الثالث' }, { t: 'الاختيار الرابع' }], 
    this.mark= 1, 
    this.expected_time= 60
  }
}
export class Correct {
  type: string;
  title: any;
  video: string;
  question: string;
  instructions: string;
  options: any[];
  mark: number;
  expected_time: number;
  skip: number;
  constructor(){
    this.type= 'correct',
		this.skip= 0,
		this.title= 'تدريب اختيار الصحيح',
		this.question= 'نص السؤال',
		this.instructions= 'في هذا الإختبار، عليك اختيار الاجابات الصحيحة فقط، يمكنك اختيار اجابة واحدة او اثنتان او اكثر ثم اضغط على زر “متابعة” عند الإنتهاء لمتابعة التدريب',
		this.video= '', 
    this.options= [{ t: 'الاختيار الأول' }, { t: 'الاختيار الثاني' }, { t: 'الاختيار الثالث' }, { t: 'الاختيار الرابع' }], 
    this.mark= 1, 
    this.expected_time= 60
  }
}
export class Arrange {
  type: string;
  title: any;
  video: string;
  question: string;
  instructions: string;
  options: any[];
  mark: number;
  expected_time: number;
  skip: number;
  constructor(){
    this.type= 'arrange',
		this.skip= 0,
		this.title= 'الترتيب حسب الاهمية',
		this.question= 'نص السؤال',
		this.instructions= 'في هذا الإختبار، عليك ترتيب الإجابات الصحيحة للسؤال حسب اهميته عن طريق السحب من الاسفل الى الأعلى حيث الاجابة في الأعلى هي الاهم او هي الخطوة الأولى والتي تليها هي الاقل اهمية او الخطوة الثانية وهكذا، . رتب الإجابات ثم اضغط على زر “متابعة” عند الإنتهاء لمتابعة التدريب',
		this.video= '', 
    this.options= [{ t: 'الاختيار الأول' }, { t: 'الاختيار الثاني' }, { t: 'الاختيار الثالث' }, { t: 'الاختيار الرابع' }], 
    this.mark= 1, 
    this.expected_time= 60
  }
}

export class Match {
  type: string;
  title: any;
  video: string;
  question: string;
  instructions: string;
  options: any[];
  mark: number;
  expected_time: number;
  skip: number;
  constructor(){
    this.type= 'match',
		this.skip= 0,
		this.title= 'ربط الإجابات',
		this.question= 'نص السؤال',
		this.instructions= 'في هذا الإختبار، عليك سحب الكلمات الموجودة في الصف الأسفل ووضع ما يناسبها داخل المربع في الصف الأعلى، اضغط على زر “متابعة” عند الإنتهاء من الإجابة ولمتابعة التدريب',
		this.video= '', 
    this.options= [{ t: 'الاختيار الأول', o: 'الاختيار الأول' }, { t: 'الاختيار الثاني', o: 'الاختيار الثاني' }, { t: 'الاختيار الثالث', o: 'الاختيار الثالث' }, { t: 'الاختيار الرابع', o: 'الاختيار الرابع' }],
    this.mark= 1, 
    this.expected_time= 60
  }
}



export class Play {
  type: string;
  title: any;
  video: string;
  instructions: string;
  mark: number;
  expected_time: number;
  skip: number;
  constructor(){
    this.type= 'play',
		this.skip= 0,
		this.title= 'عنوان الفيديو',
		this.video= '', 
    this.mark= 1, 
    this.expected_time= 60
  }
}

export class SoundRecording {
  type: string;
  title: any;
  video: string;
  question: string;
  instructions: string;
  mark: number;
  expected_time: number;
  skip: number;
  constructor(){
    this.type = 'sound',
		this.skip = 0,
		this.title = 'تسجيل الصوت',
		this.question = 'الاجابة الصوتية',
		this.instructions = 'الرجاء الضغط على زر الميكروفون لتقوم بتسجيل اسمك كصوت، في حال كان التسجيل غير واضح يمكنك الضغط على زر “إعادة التسجيل” لتقوم بالتسجيل من جديد، عند الإنتهاء يرجى الضغط على زر “متابعة” لمتابعة التدريب.',
		this.video = '', 
    this.mark = 0, 
    this.expected_time = 60
  }
}

export class VideoRecording {
  type: string;
  title: any;
  video: string;
  question: string;
  instructions: string;
  mark: number;
  expected_time: number;
  skip: number;
  constructor(){
    this.type = 'video',
		this.skip = 0,
		this.title = 'تدريب تسجيل الفيديو',
		this.question = 'بعد مشاهدتك الفيديو السابق ارجو ان تحدثنا عن مدى فهمك عن خطوات المقابلة الصحفية من خلال المحاور  التالية',
		this.instructions= 'في هذا التدريب عليك تسجيل الذي يطلب منك في السؤال الذي يظهر في الاسفل، اضغط على بدء التسجيل عندما تكون جاهزاً، اضغط على زر “انتهاء” لأيقاف التسجيل، يمكنك الضغط على زر “معاينة” لمشاهدة التسجيل قبل ارساله.',
		this.video = '', 
    this.mark = 0, 
    this.expected_time = 60
  }
}
export class Autocue {
  type: string;
  title: any;
  video: string;
  question: string;
  instructions: string;
  mark: number;
  expected_time: number;
  skip: number;
  constructor(){
    this.type = 'autocue',
		this.skip = 0,
		this.title = 'Autocue',
		this.question = '',
		this.instructions = 'في هذا التدريب عليك تسجيل الذي يطلب منك في السؤال الذي يظهر في الاسفل، اضغط على بدء التسجيل عندما تكون جاهزاً، اضغط على زر “انتهاء” لأيقاف التسجيل، يمكنك الضغط على زر “معاينة” لمشاهدة التسجيل قبل ارساله.',
		this.video = '', 
    this.mark = 0, 
    this.expected_time = 60
  }
}

export class AutocueVoice {
  type: string;
  title: any;
  video: string;
  question: string;
  instructions: string;
  mark: number;
  expected_time: number;
  skip: number;
  constructor(){
    this.type = 'autocue-voice',
		this.skip = 0,
		this.title = 'Voice Autocue',
		this.question = '',
		this.instructions = 'في هذا التدريب عليك تسجيل صوتك بالذي يطلب منك في السؤال الذي يظهر في الاسفل، اضغط على بدء التسجيل عندما تكون جاهزاً، اضغط على زر “انتهاء” لأيقاف التسجيل، يمكنك الضغط على زر “معاينة” لمشاهدة التسجيل قبل ارساله.',
		this.video = '', 
    this.mark = 0, 
    this.expected_time = 60
  }
}

export class UploadVideo {
  type: string;
  title: any;
  video: string;
  question: string;
  instructions: string;
  mark: number;
  expected_time: number;
  skip: number;
  settings: any;
  constructor(){
    this.type = 'upload-video',
		this.skip = 1,
    this.title = 'رفع الفيديو', 
    this.question = 'رفع الفيديو',
		this.instructions = 'يجب الا يتجاوز حجم الفيديو الواحد 50 ميجا بايت.اضغط على زر “تحميل” لرفع ملف الفيديو وعند الانتهاء اضغط على زر “متابعة” لاستكمال التدريب',
		this.video = '', 
    this.settings = { "file_types": ["video/mp4"], "file_message": "MP4 file required" }, 
    this.mark= 1, 
    this.expected_time= 120
	}
}

export class UploadSound {
  type: string;
  title: any;
  video: string;
  question: string;
  instructions: string;
  mark: number;
  expected_time: number;
  skip: number;
  settings: any;
  constructor(){
    this.type = 'upload-sound',
		this.skip = 1,
    this.title = 'اختبار الأداء الصوتي', 
    this.question = 'اختبار الأداء الصوتي',
		this.instructions = 'في هذا الإختبار، عليك تسجيل صوتك عند قراءة النص المرفق حسب ما طلب منك في الفيديو السابق ، يمكنك تنزيل نسخة من النصالمطلوب منك قراءتة عن طريق الضغط على زر المرفقات. يجب رفع الصوت بصيخة MP3 ان لا يتجاوز حجم التسجيل الواحد 50 ميجا بايت.اضغط على زر “تحميل” لرفع ملف الصوت وعند الانتهاء اضغط على زر “متابعة” لاستكمال التدريب',
		this.video = '', 
    this.settings = { "file_types": ["audio/mp3"], "file_message": "MP3 file required" }, 
    this.mark= 1, 
    this.expected_time= 60
	}
}

export class UploadDocument {
  type: string;
  title: any;
  video: string;
  question: string;
  instructions: string;
  mark: number;
  expected_time: number;
  skip: number;
  settings: any;
  constructor(){
    this.type = 'upload-document',
		this.skip = 1,
    this.title = 'اختبار تحميل الملف', 
    this.question = 'اختبار تحميل الملف',
		this.instructions = 'في هذا الإختبار، عليك كتابة المستند وارسالة حسب ما طلب منك في الفيديو السابق ، يمكنك تنزيل نسخة من العناصر المطلوب مراعاتها في المستند عن طريق الضغط على زر المرفقات. يجب رفع الملف بصيخة Microsoft word او PDF على ان لا يتجاوز حجم المرفق ١0 ميجا بايت. اضغط على زر “تحميل” لرفع الملفات وعند الانتهاء اضغط على زر “متابعة” لاستكمال التدريب ',
		this.video = '', 
    this.settings = { "file_types": ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'], "file_message": "PDF/WORD file required" }, 
    this.mark= 1, 
    this.expected_time= 60
	}
}

export class UploadImage {
  type: string;
  title: any;
  video: string;
  question: string;
  instructions: string;
  mark: number;
  expected_time: number;
  skip: number;
  settings: any;
  constructor(){
    this.type = 'upload-image',
		this.skip = 1,
    this.title = 'اختبار التصميم', 
    this.question = 'اختبار التصميم',
		this.instructions = 'في هذا الإختبار، عليك رفع الصور الخاصة بالتصاميم التي طلب منك العمل عليها، يجب علي رفعها حسب ما طلب منك في الفيديو السابق ، يمكن تحميل الصور بصيغة JPEG على ان لا يتجاوز حجم الصورة الواحدة 2 ميجا بايت. اضغط على زر “تحميل” لرفع الصور وعند الانتهاء اضغط على زر “متابعة” لاستكمال التدريب',
		this.video = '', 
    this.settings = { "file_types": ["image/jpeg"], "file_message": "JPEG file required" }, 
    this.mark= 1, 
    this.expected_time= 60
	}
}


export class SelectCourse {
  type: string;
  title: any;
  video: string;
  question: string;
  instructions: string;
  skip: number;
  options: any[];
  
  constructor(){
    this.type = 'select-course',
		this.skip = 0,
    this.title = 'اختر الدورة المناسبة', 
    this.question = 'اختر الدورة',
		this.instructions = 'في هذا الخيار، عليك اختيار دورة مناسبة لك، اضغط على زر “متابعة” عند الإنتهاء من الاختيار',
    this.video = '',
    this.options = []
    
    
	}
}
