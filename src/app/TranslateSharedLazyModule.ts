import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
  // return new TranslateHttpLoader(http);


  return new TranslateHttpLoader(
    http
    , 'local/i18n/', // or whatever path you're using
    '.json'
  );
}
// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }
// @NgModule({

//   imports: [

//     TranslateModule
//       .forChild({
//         loader: {
//           provide: TranslateLoader,
//           useFactory: (HttpLoaderFactory),
//           // useClass: CustomTranslateLoader,
//           deps: [HttpClient]
//         },
//         isolate: false,

//       })
//   ],
//   exports: [
//     TranslateModule]

// })
@NgModule({
  declarations: [],
  imports: [

    // TranslateModule.forChild({
    //   loader: {
    //     provide: TranslateLoader,
    //     useFactory: HttpLoaderFactory,
    //     deps: [HttpClient]
    //   },
    //   isolate: false
    // }),
  ],
  exports: [TranslateModule],
})

export class TranslateSharedLazyModule {


  static forRoot(): ModuleWithProviders {
    return {
      ngModule: TranslateSharedLazyModule,
      providers: []
    }
  }
}


