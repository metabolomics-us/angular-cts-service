import {Inject, Injectable, Optional} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NGXLogger} from 'ngx-logger';
import {CtsConstantTokenService} from './cts-constant-token.service';
import {CtsConstant} from './cts-constant';

@Injectable({
  providedIn: 'root'
})
export class CtsService {
  apiUrl;

  constructor(@Inject(HttpClient) public http: HttpClient, @Inject(NGXLogger) public logger: NGXLogger,
              @Inject(CtsConstantTokenService) public config: CtsConstant) {
    this.apiUrl = config.apiUrl;
  }

  private serializeData = (data) => {
    if (typeof data !== 'object' && data !== null) {
      return ( ( data == null ) ? '' : data.toString() );
    }

    const buffer = [];

    for (const name in data) {
      if (!data.hasOwnProperty(name)) {
        continue;
      }

      const value = data[name];
      buffer.push(encodeURIComponent(name) + '=' + encodeURIComponent(( value == null ) ? '' : value));
    }

    const source = buffer.join('&').replace(/%20/g, '+');

    return (source);
  }

  /**
   * converts the given Molecule to an InChI Key
   */
  convertToInchiKey(molecule, callback, errorCallback): void {
    const serializedMolecule = this.serializeData(molecule);
    this.http.post(`${this.apiUrl}/service/moltoinchi`, {mol: serializedMolecule},
      {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}}).subscribe((res: any) => {
      this.logger.debug('received: ' + res);
      if (typeof res !== 'undefined') {
        if (typeof res.error !== 'undefined') {
          if (errorCallback) {
            errorCallback(res.error);
          }
          else {
            this.logger.warn('no error message provided!');
          }
        }

        else if (res.inchikey) {
           if (res.inchikey === '') {
             callback(null);
           }
           else {
             callback(res);
           }
      }
      else {
        this.logger.debug('no data object is defined!');
      }
    }}, (error) => {
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

  /**
   * converts an InChI Key to a molecule
   */
  convertInchiKeyToMol(inchiKey, callback, errorCallback): void {
    this.http.get(`${this.apiUrl}/service/inchikeytomol/${inchiKey}`).subscribe((res: any) => {
      if (typeof res !== 'undefined') {
        if (res.error !== '') {
          if (errorCallback) {
            errorCallback(res.error);
          }
          else {
            this.logger.warn('no error message provided!');
          }
        }
        else if (res.molecule) {
          if (res.molecule === '' || res.molecule === null) {
            callback(null);
          }
          else {
            callback(res.molecule);
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

  /**
   * utilizes chemspider to convert from a smiles to an inchi
   */
  convertSmileToInChICode(smiles, callback, errorCallback): void {
    const serializedSmiles = this.serializeData(smiles);
    this.http.post(`${this.apiUrl}/service/smiletoinchi`, {smiles: serializedSmiles.trim()},
      {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}}).subscribe((res: any) => {
        if (typeof res !== 'undefined') {
          if (typeof res.error !== 'undefined') {
            if (typeof errorCallback !== 'undefined') {
              errorCallback(res.error);
            }
            else {
              this.logger.warn('no error message provided');
            }
          }
          else if (typeof res.inchikey !== 'undefined') {
            if (res.inchikey === '') {
              callback(null);
            }
            else {
              callback(res);
            }
          }
        }
        else {
          this.logger.debug('no data object id defined!');
        }
    }, (error) => {
      if (typeof errorCallback !== 'undefined') {
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

  /**
   * converts an inchi code to an inchi keyß
   */
  convertInChICodeToKey(inchiCode, callback, errorCallback): void {
    const serializedInchiCode = this.serializeData(inchiCode);
    this.http.post(`${this.apiUrl}/service/inchicodetoinchikey`, {inchicode: serializedInchiCode},
      {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}})
    .subscribe((res: any) => {

      if (typeof res !== 'undefined') {
        if (typeof res.error !== 'undefined') {
          if (typeof errorCallback !== 'undefined') {
            errorCallback(res.error);
          }
          else {
            this.logger.warn('no error message provided!');
          }
        }
        else if (typeof res.inchikey !== 'undefined') {
          if (res.inchikey === '') {
            callback(null);
          }
          else {
            callback(res.inchikey);
          }
        }

      }
      else {
        this.logger.debug('no data object is defined!');
      }
    }, (error) => {
      if (typeof errorCallback !== 'undefined') {
        errorCallback(error);
      }
      else {
        if (error !== null) {
          this.logger.warn('error: ' + error);
        }
        else {
          this.logger.warn('no error message provided!');
        }
      }
    });
  }

  /**
   * provides us with the molfile for this key
   */
  convertInChICodeToMol(inchiCode, callback, errorCallback): void {
    const serializedInchiCode = this.serializeData(inchiCode);
    this.http.post(`${this.apiUrl}/service/inchitomol`, { inchicode: serializedInchiCode },
      {headers: {'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'}})
      .subscribe((res: any) => {
        if (typeof res !== 'undefined') {
          if (typeof res.error !== 'undefined') {
            if (typeof errorCallback !== 'undefined') {
              errorCallback(res.error);
            }
            else {
              this.logger.warn('no error message provided!');
            }
          }
          else if (typeof res.molecule !== 'undefined') {
            if (res.molecule === '') {
              callback(null);
            }
            else {
              callback(res.molecule);
            }
          }

        }
        else {
          this.logger.debug('no data object is defined!');
        }
      }, (error) => {
        if (typeof errorCallback !== 'undefined') {
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
