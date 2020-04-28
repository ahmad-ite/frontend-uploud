
    export class SubCategory {
        id: number;
        name: string;
        name_en: string;
        arrange: number;
        status: number;
        added_by?: any;
        image: string;
        fa_icon: string;
    }

    export class VideoDerivation {
        duration: number;
        q_240: string;
        q_360: string;
        q_480: string;
        gif: string;
        thump: string;
        q_720: string;
        q_1080: string;
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
        slide_courses:Course[];
        fa_icon: string;
    }

    
    export class Data {
        main_categories: MainCategory[];
        sub_categories: SubCategory[];
        slides_categories: MainCategory[];
        trainers: Trainer[];
        app_video: string;
        video_derivation: VideoDerivation;
    }

    export class RootObject {
        data: Data;
        error: number;
        msg: string;
    }



// Trainer Data


export class TrainerData {
    trainer:       Trainer;
    otherTrainers: OtherTrainer[];
}

export class OtherTrainer {
    id:             number;
    name:           string;
    lang:           string;
    email:          string;
    gender:         number;
    nationality:    number;
    qualifications: null;
    residence:      number;
    foundation:     null;
    description:    null;
    image:          null | string;
    family:         number;
    phone:          null;
    experience:     null;
}

export class Trainer {
    id:                 number;
    status:             number;
    isTrainer:          number;
    isPanelAdmin:       number;
    updated:            string;
    regDate:            string;
    lastLogin:          null;
    name:               string;
    lang:               string;
    email:              string;
    gender:             number;
    nationality:        number;
    qualifications:     number;
    residence:          number;
    position:           null;
    foundation:         null;
    description:        null;
    family:             number;
    image:              string;
    dob:                null;
    phone:              null;
    address:            string;
    pobox:              null;
    facebook:           string;
    institute:          number;
    certificates:       TrainerDoc[];
    experience:         number;
    twitter:            string;
    instagram:          string;
    linkedin:           string;
    allowAutocue:       number;
    trainerApproved:    number;
    demonstrationVideo: TrainerDoc;
    trainingVideo:      TrainerDoc;
    signature:          TrainerDoc;
    cv:                 TrainerDoc;
    details:            Details;
    categories:         any[];
    courses:            Course[];
}

export class Course {
    id:              number;
    name:            string;
    code:            number;
    template:        string;
    createDate:      string;
    updated:         string;
    status:          number;
    listed:          number;
    lastApproved:    string;
    courseCategory:  number;
    price:           null;
    coverImage:      string;
    hours:           number;
    trainer:         number;
    repeatCount:     number;
    level:           number;
    passMark:        number;
    isOrdering:      number;
    youtube:         string;
    description:     string;
    lang:            string;
    video:           string;
    isStar:          number;
    templateID:      number;
    itemsCount:      number;
    isBasket:        number;
    isInterested:    number;
    isRegister:      number;
    lessonCount:     number;
    examCount:       number;
    trainerName:     string;
    studentsCount:   number;
    levelName:       string;
    levelNameEn:     string;
    stdRatingCount:  number;
    videoDerivation: VideoDerivation;
    averageRate:     number;
}


export class TrainerDoc {
    id:      number;
    trainer: number;
    doc:     string;
    docType: string;
    name:    string;
}

export class Details {
    importantInfo: string;
    study:         string;
    experince:     number;
    hours:         string;
    institutes:    string;
}