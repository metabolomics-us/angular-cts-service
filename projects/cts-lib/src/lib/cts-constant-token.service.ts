import {InjectionToken} from '@angular/core';
import {CtsConstant} from './cts-constant';

export const CtsConstantTokenService = new InjectionToken<CtsConstant>(
  'CtsConstant'
);
