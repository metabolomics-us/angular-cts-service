import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NGXLogger} from "ngx-logger";
import {CtsConstants} from "./cts-constants";

@Injectable({
  providedIn: 'root'
})
export class ChemifyService{
  constructor(@Inject(HttpClient) private http: HttpClient, @Inject(NGXLogger) private logger: NGXLogger) {
  }

  /**
   * converts the given name to an InChI Key
   * @param chemicalName
   * @param callback
   */
  nameToInChIKey = (chemicalName) => {

    return this.http.get(`${CtsConstants.apiUrl}/chemify/rest/identify/${encodeURI(chemicalName)}`);
    /*
      .then((res) => {
        let result = "";

        if (res["data"]) {
          let data = res["data"];
          if (Array.isArray(data)) {
            if (data.length > 0) {
              let topHit = data[0];
              if (topHit.result) {
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
      }).catch((error) =>{
        if (errorCallback) {
          errorCallback(error);
        }
        else {
          if (error != null) {
            this.logger.warn('error: ' + error);
          }
          else {
            this.logger.warn("no error message provided!");
          }
        }
      });
     */
  }
}
