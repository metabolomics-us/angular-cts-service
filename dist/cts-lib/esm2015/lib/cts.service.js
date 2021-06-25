import { Inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NGXLogger } from "ngx-logger";
import { CtsConstants } from "./cts-constants";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "ngx-logger";
export class CtsService {
    constructor(http, logger) {
        this.http = http;
        this.logger = logger;
        this.serializeData = (data) => {
            if (typeof data !== 'object' && data !== null) {
                return ((data == null) ? "" : data.toString());
            }
            let buffer = [];
            for (let name in data) {
                if (!data.hasOwnProperty(name)) {
                    continue;
                }
                let value = data[name];
                buffer.push(encodeURIComponent(name) + "=" + encodeURIComponent((value == null) ? "" : value));
            }
            let source = buffer.join("&").replace(/%20/g, "+");
            return (source);
        };
        /**
         * converts the given Molecule to an InChI Key
         * @param molecule
         * @param callback
         * @param errorCallback
         */
        this.convertToInchiKey = (molecule) => {
            let serializedMolecule = this.serializeData(molecule);
            return this.http.post(`${CtsConstants.apiUrl}/service/moltoinchi`, { mol: serializedMolecule }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } });
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
        this.convertInchiKeyToMol = (inchiKey) => {
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
        this.convertSmileToInChICode = (smiles) => {
            let serializedSmiles = this.serializeData(smiles);
            return this.http.post(`${CtsConstants.apiUrl}/service/smiletoinchi`, { smiles: serializedSmiles.trim() }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } });
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
        this.convertInChICodeToKey = (inchiCode) => {
            let serializedInchiCode = this.serializeData(inchiCode);
            return this.http.post(`${CtsConstants.apiUrl}/service/inchicodetoinchikey`, { inchicode: serializedInchiCode }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } });
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
        this.convertInChICodeToMol = (inchiCode) => {
            let serializedInchiCode = this.serializeData(inchiCode);
            return this.http.post(`${CtsConstants.apiUrl}/service/inchitomol`, { inchicode: serializedInchiCode }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } });
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
}
CtsService.ɵfac = function CtsService_Factory(t) { return new (t || CtsService)(i0.ɵɵinject(HttpClient), i0.ɵɵinject(NGXLogger)); };
CtsService.ɵprov = i0.ɵɵdefineInjectable({ token: CtsService, factory: CtsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CtsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i1.HttpClient, decorators: [{
                type: Inject,
                args: [HttpClient]
            }] }, { type: i2.NGXLogger, decorators: [{
                type: Inject,
                args: [NGXLogger]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3RzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvbm9sYW4vRGV2ZWxvcG1lbnQvYW5ndWxhci1jdHMtc2VydmljZS9hbmd1bGFyLWN0cy1zZXJ2aWNlL3Byb2plY3RzL2N0cy1saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL2N0cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUs3QyxNQUFNLE9BQU8sVUFBVTtJQUVyQixZQUF3QyxJQUFnQixFQUE2QixNQUFpQjtRQUE5RCxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQTZCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFFOUYsa0JBQWEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQy9CLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQzdDLE9BQU8sQ0FBRSxDQUFFLElBQUksSUFBSSxJQUFJLENBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUUsQ0FBQzthQUNwRDtZQUVELElBQUksTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUVoQixLQUFLLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtnQkFDckIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQzlCLFNBQVM7aUJBQ1Y7Z0JBRUQsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixD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Ozs7O29CQXFDUTtRQUNSLENBQUMsQ0FBQztJQTdRc0csQ0FBQzs7b0VBRmhHLFVBQVUsY0FFRCxVQUFVLGVBQW9DLFNBQVM7a0RBRmhFLFVBQVUsV0FBVixVQUFVLG1CQUZULE1BQU07a0RBRVAsVUFBVTtjQUh0QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7O3NCQUdjLE1BQU07dUJBQUMsVUFBVTs7c0JBQTZCLE1BQU07dUJBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQge05HWExvZ2dlcn0gZnJvbSBcIm5neC1sb2dnZXJcIjtcbmltcG9ydCB7Q3RzQ29uc3RhbnRzfSBmcm9tIFwiLi9jdHMtY29uc3RhbnRzXCI7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEN0c1NlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoSHR0cENsaWVudCkgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KE5HWExvZ2dlcikgcHJpdmF0ZSBsb2dnZXI6IE5HWExvZ2dlcikgeyB9XG5cbiAgcHJpdmF0ZSBzZXJpYWxpemVEYXRhID0gKGRhdGEpID0+IHtcbiAgICBpZiAodHlwZW9mIGRhdGEgIT09ICdvYmplY3QnICYmIGRhdGEgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiAoICggZGF0YSA9PSBudWxsICkgPyBcIlwiIDogZGF0YS50b1N0cmluZygpICk7XG4gICAgfVxuXG4gICAgbGV0IGJ1ZmZlciA9IFtdO1xuXG4gICAgZm9yIChsZXQgbmFtZSBpbiBkYXRhKSB7XG4gICAgICBpZiAoIWRhdGEuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGxldCB2YWx1ZSA9IGRhdGFbbmFtZV07XG4gICAgICBidWZmZXIucHVzaChlbmNvZGVVUklDb21wb25lbnQobmFtZSkgKyBcIj1cIiArIGVuY29kZVVSSUNvbXBvbmVudCgoIHZhbHVlID09IG51bGwgKSA/IFwiXCIgOiB2YWx1ZSkpO1xuICAgIH1cblxuICAgIGxldCBzb3VyY2UgPSBidWZmZXIuam9pbihcIiZcIikucmVwbGFjZSgvJTIwL2csIFwiK1wiKTtcblxuICAgIHJldHVybiAoc291cmNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjb252ZXJ0cyB0aGUgZ2l2ZW4gTW9sZWN1bGUgdG8gYW4gSW5DaEkgS2V5XG4gICAqIEBwYXJhbSBtb2xlY3VsZVxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICogQHBhcmFtIGVycm9yQ2FsbGJhY2tcbiAgICovXG4gIGNvbnZlcnRUb0luY2hpS2V5ID0gIChtb2xlY3VsZSkgPT4ge1xuICAgIGxldCBzZXJpYWxpemVkTW9sZWN1bGUgPSB0aGlzLnNlcmlhbGl6ZURhdGEobW9sZWN1bGUpO1xuICAgIHJldHVybiB0aGlzLmh0dHAucG9zdChgJHtDdHNDb25zdGFudHMuYXBpVXJsfS9zZXJ2aWNlL21vbHRvaW5jaGlgLCB7bW9sOiBzZXJpYWxpemVkTW9sZWN1bGV9LFxuICAgICAge2hlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD11dGYtOCd9fSk7XG4gICAgLypcbiAgICAudGhlbigocmVzKSA9PiB7XG5cbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdyZWNlaXZlZDogJyArIHJlcyk7XG5cbiAgICAgIGlmIChyZXMpIHtcbiAgICAgICAgaWYgKHJlc1tcImVycm9yXCJdKSB7XG4gICAgICAgICAgaWYgKGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2socmVzW1wiZXJyb3JcIl0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVzW1wiaW5jaGlrZXlcIl0pIHtcbiAgICAgICAgICBpZiAocmVzW1wiaW5jaGlrZXlcIl0gPT09IFwiXCIpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1Zygnbm8gZGF0YSBvYmplY3QgaXMgZGVmaW5lZCEnKTtcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGlmIChlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2FybignZXJyb3I6ICcgKyBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2FybihcIm5vIGVycm9yIG1lc3NhZ2UgcHJvdmlkZWQhXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7ICovXG4gIH07XG5cbiAgLyoqXG4gICAqIGNvbnZlcnRzIGFuIEluQ2hJIEtleSB0byBhIG1vbGVjdWxlXG4gICAqIEBwYXJhbSBpbmNoaUtleVxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICogQHBhcmFtIGVycm9yQ2FsbGJhY2tcbiAgICovXG4gIGNvbnZlcnRJbmNoaUtleVRvTW9sID0gKGluY2hpS2V5KSA9PiB7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Q3RzQ29uc3RhbnRzLmFwaVVybH0vc2VydmljZS9pbmNoaWtleXRvbW9sLyR7aW5jaGlLZXl9YCk7XG4gICAgICAvKi5zdWJzY3JpYmUoXG4gICAgICAocmVzKSA9PiB7XG4gICAgICAgICAgaWYgKHJlc1tcImRhdGFcIl0pIHtcblxuICAgICAgICAgICAgbGV0IGRhdGEgPSByZXNbXCJkYXRhXCJdO1xuICAgICAgICAgICAgaWYgKGRhdGEuZXJyb3IpIHtcbiAgICAgICAgICAgICAgaWYgKGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKGRhdGEuZXJyb3IpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIVwiKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoZGF0YS5tb2xlY3VsZSkge1xuICAgICAgICAgICAgICBpZiAoZGF0YS5tb2xlY3VsZSA9PT0gXCJcIiB8fCBkYXRhLm1vbGVjdWxlID09PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soZGF0YS5tb2xlY3VsZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgIH1cbiAgICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgICAgaWYgKGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ2Vycm9yOiAnICsgZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pOyovXG4gIH07XG5cbiAgLyoqXG4gICAqIHV0aWxpemVzIGNoZW1zcGlkZXIgdG8gY29udmVydCBmcm9tIGEgc21pbGVzIHRvIGFuIGluY2hpXG4gICAqIEBwYXJhbSBzbWlsZXNcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqIEBwYXJhbSBlcnJvckNhbGxiYWNrXG4gICAqL1xuICBjb252ZXJ0U21pbGVUb0luQ2hJQ29kZSA9ICAoc21pbGVzKSA9PiB7XG4gICAgbGV0IHNlcmlhbGl6ZWRTbWlsZXMgPSB0aGlzLnNlcmlhbGl6ZURhdGEoc21pbGVzKTtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYCR7Q3RzQ29uc3RhbnRzLmFwaVVybH0vc2VydmljZS9zbWlsZXRvaW5jaGlgLCB7c21pbGVzOiBzZXJpYWxpemVkU21pbGVzLnRyaW0oKX0sXG4gICAgICB7aGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PXV0Zi04J319KVxuICAgICAgLypcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgaWYgKHJlcykge1xuICAgICAgICAgIGlmIChyZXNbXCJlcnJvclwiXSkge1xuICAgICAgICAgICAgaWYgKGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhyZXNbXCJlcnJvcnJcIl0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAocmVzW1wiaW5jaGlrZXlcIl0pIHtcbiAgICAgICAgICAgIGlmIChyZXNbXCJpbmNoaWtleVwiXSA9PT0gXCJcIikge1xuICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBjYWxsYmFjayhyZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIC8vJGxvZy5kZWJ1Zygnbm8gZGF0YSBvYmplY3QgaXMgZGVmaW5lZCEnKTtcbiAgICAgICAgfVxuICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGlmIChlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ2Vycm9yOiAnICsgZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pOyAqL1xuICB9O1xuXG4gIC8qKlxuICAgKiBjb252ZXJ0cyBhbiBpbmNoaSBjb2RlIHRvIGFuIGluY2hpIGtlecOfXG4gICAqIEBwYXJhbSBpbmNoaUNvZGVcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqIEBwYXJhbSBlcnJvckNhbGxiYWNrXG4gICAqL1xuICBjb252ZXJ0SW5DaElDb2RlVG9LZXkgPSAoaW5jaGlDb2RlKSA9PiB7XG4gICAgbGV0IHNlcmlhbGl6ZWRJbmNoaUNvZGUgPSB0aGlzLnNlcmlhbGl6ZURhdGEoaW5jaGlDb2RlKTtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYCR7Q3RzQ29uc3RhbnRzLmFwaVVybH0vc2VydmljZS9pbmNoaWNvZGV0b2luY2hpa2V5YCwge2luY2hpY29kZTogc2VyaWFsaXplZEluY2hpQ29kZX0sXG4gICAgICB7aGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PXV0Zi04J319KTtcbiAgICAvKlxuICAgIC50aGVuKChyZXMpID0+IHtcblxuICAgICAgaWYgKHJlcykge1xuXG4gICAgICAgIGlmIChyZXNbXCJlcnJvclwiXSkge1xuICAgICAgICAgIGlmIChlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKHJlc1tcImVycm9yXCJdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKFwibm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCFcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJlc1tcImluY2hpa2V5XCJdKSB7XG4gICAgICAgICAgaWYgKHJlc1tcImluY2hpa2V5XCJdID09PSBcIlwiKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjayhyZXNbXCJpbmNoaWtleVwiXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1Zygnbm8gZGF0YSBvYmplY3QgaXMgZGVmaW5lZCEnKTtcbiAgICAgIH1cbiAgICB9KS5jYXRjaCgoZXJyb3IpID0+IHtcbiAgICAgIGlmIChlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2FybignZXJyb3I6ICcgKyBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2FybihcIm5vIGVycm9yIG1lc3NhZ2UgcHJvdmlkZWQhXCIpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7ICovXG4gIH07XG5cbiAgLyoqXG4gICAqIHByb3ZpZGVzIHVzIHdpdGggdGhlIG1vbGZpbGUgZm9yIHRoaXMga2V5XG4gICAqIEBwYXJhbSBpbmNoaUNvZGVcbiAgICogQHBhcmFtIGNhbGxiYWNrXG4gICAqIEBwYXJhbSBlcnJvckNhbGxiYWNrXG4gICAqL1xuICBjb252ZXJ0SW5DaElDb2RlVG9Nb2wgPSAoaW5jaGlDb2RlKSA9PiB7XG4gICAgbGV0IHNlcmlhbGl6ZWRJbmNoaUNvZGUgPSB0aGlzLnNlcmlhbGl6ZURhdGEoaW5jaGlDb2RlKTtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYCR7Q3RzQ29uc3RhbnRzLmFwaVVybH0vc2VydmljZS9pbmNoaXRvbW9sYCwgeyBpbmNoaWNvZGU6IHNlcmlhbGl6ZWRJbmNoaUNvZGUgfSxcbiAgICAgIHtoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9dXRmLTgnfX0pO1xuICAgIC8qXG4gICAgICAudGhlbigocmVzKSA9PiB7XG4gICAgICAgIGlmIChyZXMpIHtcblxuICAgICAgICAgIGlmIChyZXNbXCJlcnJvclwiXSkge1xuICAgICAgICAgICAgaWYgKGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhyZXNbXCJlcnJvclwiXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybihcIm5vIGVycm9yIG1lc3NhZ2UgcHJvdmlkZWQhXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChyZXNbXCJtb2xlY3VsZVwiXSkge1xuICAgICAgICAgICAgaWYgKHJlc1tcIm1vbGVjdWxlXCJdID09PSBcIlwiKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKHJlc1tcIm1vbGVjdWxlXCJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1Zygnbm8gZGF0YSBvYmplY3QgaXMgZGVmaW5lZCEnKTtcbiAgICAgICAgfVxuICAgICAgfSkuY2F0Y2goKGVycm9yKSA9PiB7XG4gICAgICAgIGlmIChlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ2Vycm9yOiAnICsgZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oXCJubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIVwiKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pOyAqL1xuICAgIH07XG59XG4iXX0=