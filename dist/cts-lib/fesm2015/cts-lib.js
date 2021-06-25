import { ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, Inject, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NGXLogger, LoggerModule, NgxLoggerLevel } from 'ngx-logger';

class CtsConstants {
}
CtsConstants.apiUrl = "http://cts.fiehnlab.ucdavis.edu";

class CtsService {
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
CtsService.ɵfac = function CtsService_Factory(t) { return new (t || CtsService)(ɵɵinject(HttpClient), ɵɵinject(NGXLogger)); };
CtsService.ɵprov = ɵɵdefineInjectable({ token: CtsService, factory: CtsService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(CtsService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: HttpClient, decorators: [{
                type: Inject,
                args: [HttpClient]
            }] }, { type: NGXLogger, decorators: [{
                type: Inject,
                args: [NGXLogger]
            }] }]; }, null); })();

class ChemifyService {
    constructor(http, logger) {
        this.http = http;
        this.logger = logger;
        /**
         * converts the given name to an InChI Key
         * @param chemicalName
         * @param callback
         */
        this.nameToInChIKey = (chemicalName) => {
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
        };
    }
}
ChemifyService.ɵfac = function ChemifyService_Factory(t) { return new (t || ChemifyService)(ɵɵinject(HttpClient), ɵɵinject(NGXLogger)); };
ChemifyService.ɵprov = ɵɵdefineInjectable({ token: ChemifyService, factory: ChemifyService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { ɵsetClassMetadata(ChemifyService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: HttpClient, decorators: [{
                type: Inject,
                args: [HttpClient]
            }] }, { type: NGXLogger, decorators: [{
                type: Inject,
                args: [NGXLogger]
            }] }]; }, null); })();

class CtsLibModule {
}
CtsLibModule.ɵmod = ɵɵdefineNgModule({ type: CtsLibModule });
CtsLibModule.ɵinj = ɵɵdefineInjector({ factory: function CtsLibModule_Factory(t) { return new (t || CtsLibModule)(); }, providers: [
        CtsConstants,
        CtsService,
        ChemifyService
    ], imports: [[
            LoggerModule.forRoot({
                level: NgxLoggerLevel.DEBUG,
                serverLogLevel: NgxLoggerLevel.OFF
            }),
            HttpClientModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && ɵɵsetNgModuleScope(CtsLibModule, { imports: [LoggerModule, HttpClientModule] }); })();
/*@__PURE__*/ (function () { ɵsetClassMetadata(CtsLibModule, [{
        type: NgModule,
        args: [{
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
            }]
    }], null, null); })();

/*
 * Public API Surface of cts-lib
 */

/**
 * Generated bundle index. Do not edit.
 */

export { ChemifyService, CtsConstants, CtsLibModule, CtsService };
//# sourceMappingURL=cts-lib.js.map
