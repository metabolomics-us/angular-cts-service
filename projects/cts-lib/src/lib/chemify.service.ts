import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NGXLogger} from 'ngx-logger';
import {CtsConstants} from './cts-constants';

@Injectable({
  providedIn: 'root'
})
export class ChemifyService{
  constructor(@Inject(HttpClient) private http: HttpClient, @Inject(NGXLogger) private logger: NGXLogger) {
  }

  /**
   * converts the given name to an InChI Key
   */
  nameToInChIKey = (chemicalName, callback, errorCallback) => {

    this.http.get(`${CtsConstants.apiUrl}/chemify/rest/identify/${encodeURI(chemicalName)}`)
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
