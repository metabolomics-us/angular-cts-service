import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {NGXLogger} from "ngx-logger";
import {CtsConstants} from "./cts-constants";

@Injectable({
  providedIn: 'root'
})
export class CtsService {

  constructor(@Inject(HttpClient) private http: HttpClient, @Inject(NGXLogger) private logger: NGXLogger) { }

  private serializeData = (data) => {
    if (typeof data !== 'object' && data !== null) {
      return ( ( data == null ) ? "" : data.toString() );
    }

    let buffer = [];

    for (let name in data) {
      if (!data.hasOwnProperty(name)) {
        continue;
      }

      let value = data[name];
      buffer.push(encodeURIComponent(name) + "=" + encodeURIComponent(( value == null ) ? "" : value));
    }

    let source = buffer.join("&").replace(/%20/g, "+");

    return (source);
  }

  /**
   * converts the given Molecule to an InChI Key
   * @param molecule
   * @param callback
   * @param errorCallback
   */
  convertToInchiKey =  (molecule) => {
    let serializedMolecule = this.serializeData(molecule);
    return this.http.post(`${CtsConstants.apiUrl}/service/moltoinchi`, {mol: serializedMolecule},
      {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}});
    /*
    .then((res) => {

      this.logger.debug('received: ' + res);

      if (res) {
        if (res["error"]) {
          if (errorCallback) {
            errorCallback(res["error"]);
          }
          else {
            this.logger.warn("no error message provided!");
          }
        }
        else if (res["inchikey"]) {
          if (res["inchikey"] === "") {
            callback(null);
          }
          else {
            callback(res);
          }
        }

      }
      else {
        this.logger.debug('no data object is defined!');
      }
    }).catch((error) => {
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
    }); */
  };

  /**
   * converts an InChI Key to a molecule
   * @param inchiKey
   * @param callback
   * @param errorCallback
   */
  convertInchiKeyToMol = (inchiKey) => {
    return this.http.get(`${CtsConstants.apiUrl}/service/inchikeytomol/${inchiKey}`);
      /*.subscribe(
      (res) => {
          if (res["data"]) {

            let data = res["data"];
            if (data.error) {
              if (errorCallback) {
                errorCallback(data.error);
              }
              else {
                this.logger.warn("no error message provided!");
              }
            }
            else if (data.molecule) {
              if (data.molecule === "" || data.molecule === null) {
                callback(null);
              }
              else {
                callback(data.molecule);
              }
            }

          }
        }).catch((error) => {
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
        });*/
  };

  /**
   * utilizes chemspider to convert from a smiles to an inchi
   * @param smiles
   * @param callback
   * @param errorCallback
   */
  convertSmileToInChICode =  (smiles) => {
    let serializedSmiles = this.serializeData(smiles);
    return this.http.post(`${CtsConstants.apiUrl}/service/smiletoinchi`, {smiles: serializedSmiles.trim()},
      {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}})
      /*
      .then((res) => {
        if (res) {
          if (res["error"]) {
            if (errorCallback) {
              errorCallback(res["errorr"]);
            }
            else {
              this.logger.warn("no error message provided!");
            }
          }
          else if (res["inchikey"]) {
            if (res["inchikey"] === "") {
              callback(null);
            }
            else {
              callback(res);
            }
          }

        }
        else {
          //$log.debug('no data object is defined!');
        }
      }).catch((error) => {
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
      }); */
  };

  /**
   * converts an inchi code to an inchi keyß
   * @param inchiCode
   * @param callback
   * @param errorCallback
   */
  convertInChICodeToKey = (inchiCode) => {
    let serializedInchiCode = this.serializeData(inchiCode);
    return this.http.post(`${CtsConstants.apiUrl}/service/inchicodetoinchikey`, {inchicode: serializedInchiCode},
      {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}});
    /*
    .then((res) => {

      if (res) {

        if (res["error"]) {
          if (errorCallback) {
            errorCallback(res["error"]);
          }
          else {
            this.logger.warn("no error message provided!");
          }
        }
        else if (res["inchikey"]) {
          if (res["inchikey"] === "") {
            callback(null);
          }
          else {
            callback(res["inchikey"]);
          }
        }

      }
      else {
        this.logger.debug('no data object is defined!');
      }
    }).catch((error) => {
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
    }); */
  };

  /**
   * provides us with the molfile for this key
   * @param inchiCode
   * @param callback
   * @param errorCallback
   */
  convertInChICodeToMol = (inchiCode) => {
    let serializedInchiCode = this.serializeData(inchiCode);
    return this.http.post(`${CtsConstants.apiUrl}/service/inchitomol`, { inchicode: serializedInchiCode },
      {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}});
    /*
      .then((res) => {
        if (res) {

          if (res["error"]) {
            if (errorCallback) {
              errorCallback(res["error"]);
            }
            else {
              this.logger.warn("no error message provided!");
            }
          }
          else if (res["molecule"]) {
            if (res["molecule"] === "") {
              callback(null);
            }
            else {
              callback(res["molecule"]);
            }
          }

        }
        else {
          this.logger.debug('no data object is defined!');
        }
      }).catch((error) => {
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
      }); */
    };
}
