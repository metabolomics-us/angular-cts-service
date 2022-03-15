import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {LoggerModule, NgxLoggerLevel} from 'ngx-logger';

import {CtsService} from './cts.service';
import {ChemifyService} from './chemify.service';
import {CtsConstant} from './cts-constant';
import {CtsConstantTokenService} from './cts-constant-token.service';

@NgModule({
  imports: [
    LoggerModule.forRoot({
      level: NgxLoggerLevel.DEBUG,
      serverLogLevel: NgxLoggerLevel.OFF
    }),
    HttpClientModule
  ]
})
export class CtsLibModule {
  static forRoot(config: CtsConstant): ModuleWithProviders<CtsLibModule> {
    return {
      ngModule: CtsLibModule,
      providers: [
        CtsService,
        ChemifyService,
        {
          provide: CtsConstantTokenService,
          useValue: config
        }
      ]
    };
  }
}
