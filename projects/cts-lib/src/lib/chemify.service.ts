import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NGXLogger} from 'ngx-logger';
import {CtsConstants} from './cts-constants';

@Injectable({
  providedIn: 'root'
})
export class ChemifyService{
  apiUrl;
  constructor(@Inject(HttpClient) public http: HttpClient, @Inject(NGXLogger) public logger: NGXLogger,
              @Inject(CtsConstants) public ctsConstants: CtsConstants) {
    this.apiUrl = ctsConstants.apiUrl;
    logger.info(this.apiUrl);
    logger.info(this.ctsConstants.apiUrl);
  }

  /**
   * converts the given name to an InChI Key
   */
  nameToInChIKey(chemicalName, callback, errorCallback): void{
    this.logger.info(this.apiUrl);
    this.logger.info(this.ctsConstants.apiUrl);
    this.http.get(`${this.apiUrl}/chemify/rest/identify/${encodeURI(chemicalName)}`)
      .subscribe((res) => {
        const result = '';

        if (typeof res !== 'undefined') {
          const data = res;
          if (Array.isArray(data)) {
            if (data.length > 0) {
              const topHit = data[0];
              if (typeof topHit.result !== 'undefined') {
                if (topHit.result === 'nothing found') {
                  callback(null);
                }
                else {
                  callback(topHit.result);
                }
              }
            }
          }
        }
      }, (error) => {
      if (errorCallback) {
        errorCallback(error);
      }
      else {
        if (error != null) {
          this.logger.warn('error: ' + error);
        }
        else {
          this.logger.warn('no error message provided!');
        }
      }
      });
  }
}
