import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';
import {CtsConstants} from './cts-constants';
import {CtsService} from './cts.service';
import {ChemifyService} from './chemify.service';

@NgModule({
  imports: [
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.OFF
    }),
    HttpClientModule
  ],
  providers: [
    CtsConstants,
    CtsService,
    ChemifyService
  ]
})
export class CtsLibModule {
  constructor(@Optional() @SkipSelf() parentModule?: CtsLibModule) {
    if (parentModule) {
      throw new Error(
        'GreetingModule is already loaded. Import it in the AppModule only');
    }
  }

  static forRoot(config: CtsConstants): ModuleWithProviders<CtsLibModule> {
    return {
      ngModule: CtsLibModule,
      providers: [
        {provide: CtsConstants, useValue: config}
      ]
    };
  }
}
