(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('ngx-logger')) :
    typeof define === 'function' && define.amd ? define('cts-lib', ['exports', '@angular/core', '@angular/common/http', 'ngx-logger'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['cts-lib'] = {}, global.ng.core, global.ng.common.http, global.i2));
}(this, (function (exports, i0, i1, i2) { 'use strict';

    var CtsConstants = /** @class */ (function () {
        function CtsConstants() {
        }
        return CtsConstants;
    }());
    CtsConstants.apiUrl = "http://cts.fiehnlab.ucdavis.edu";

    var CtsService = /** @class */ (function () {
        function CtsService(http, logger) {
            var _this = this;
            this.http = http;
            this.logger = logger;
            this.serializeData = function (data) {
                if (typeof data !== 'object' && data !== null) {
                    return ((data == null) ? "" : data.toString());
                }
                var buffer = [];
                for (var name in data) {
                    if (!data.hasOwnProperty(name)) {
                        continue;
                    }
                    var value = data[name];
                    buffer.push(encodeURIComponent(name) + "=" + encodeURIComponent((value == null) ? "" : value));
                }
                var source = buffer.join("&").replace(/%20/g, "+");
                return (source);
            };
            /**
             * converts the given Molecule to an InChI Key
             * @param molecule
             * @param callback
             * @param errorCallback
             */
            this.convertToInchiKey = function (molecule) {
                var serializedMolecule = _this.serializeData(molecule);
                return _this.http.post(CtsConstants.apiUrl + "/service/moltoinchi", { mol: serializedMolecule }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } });
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
            this.convertInchiKeyToMol = function (inchiKey) {
                return _this.http.get(CtsConstants.apiUrl + "/service/inchikeytomol/" + inchiKey);
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
            this.convertSmileToInChICode = function (smiles) {
                var serializedSmiles = _this.serializeData(smiles);
                return _this.http.post(CtsConstants.apiUrl + "/service/smiletoinchi", { smiles: serializedSmiles.trim() }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } });
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
            this.convertInChICodeToKey = function (inchiCode) {
                var serializedInchiCode = _this.serializeData(inchiCode);
                return _this.http.post(CtsConstants.apiUrl + "/service/inchicodetoinchikey", { inchicode: serializedInchiCode }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } });
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
            this.convertInChICodeToMol = function (inchiCode) {
                var serializedInchiCode = _this.serializeData(inchiCode);
                return _this.http.post(CtsConstants.apiUrl + "/service/inchitomol", { inchicode: serializedInchiCode }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } });
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
        return CtsService;
    }());
    CtsService.ɵfac = function CtsService_Factory(t) { return new (t || CtsService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.NGXLogger)); };
    CtsService.ɵprov = i0.ɵɵdefineInjectable({ token: CtsService, factory: CtsService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(CtsService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () {
            return [{ type: i1.HttpClient, decorators: [{
                            type: i0.Inject,
                            args: [i1.HttpClient]
                        }] }, { type: i2.NGXLogger, decorators: [{
                            type: i0.Inject,
                            args: [i2.NGXLogger]
                        }] }];
        }, null);
    })();

    var ChemifyService = /** @class */ (function () {
        function ChemifyService(http, logger) {
            var _this = this;
            this.http = http;
            this.logger = logger;
            /**
             * converts the given name to an InChI Key
             * @param chemicalName
             * @param callback
             */
            this.nameToInChIKey = function (chemicalName) {
                return _this.http.get(CtsConstants.apiUrl + "/chemify/rest/identify/" + encodeURI(chemicalName));
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
        return ChemifyService;
    }());
    ChemifyService.ɵfac = function ChemifyService_Factory(t) { return new (t || ChemifyService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.NGXLogger)); };
    ChemifyService.ɵprov = i0.ɵɵdefineInjectable({ token: ChemifyService, factory: ChemifyService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ChemifyService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () {
            return [{ type: i1.HttpClient, decorators: [{
                            type: i0.Inject,
                            args: [i1.HttpClient]
                        }] }, { type: i2.NGXLogger, decorators: [{
                            type: i0.Inject,
                            args: [i2.NGXLogger]
                        }] }];
        }, null);
    })();

    var CtsLibModule = /** @class */ (function () {
        function CtsLibModule() {
        }
        return CtsLibModule;
    }());
    CtsLibModule.ɵmod = i0.ɵɵdefineNgModule({ type: CtsLibModule });
    CtsLibModule.ɵinj = i0.ɵɵdefineInjector({ factory: function CtsLibModule_Factory(t) { return new (t || CtsLibModule)(); }, providers: [
            CtsConstants,
            CtsService,
            ChemifyService
        ], imports: [[
                i2.LoggerModule.forRoot({
                    level: i2.NgxLoggerLevel.DEBUG,
                    serverLogLevel: i2.NgxLoggerLevel.OFF
                }),
                i1.HttpClientModule
            ]] });
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CtsLibModule, { imports: [i2.LoggerModule, i1.HttpClientModule] }); })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(CtsLibModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i2.LoggerModule.forRoot({
                                level: i2.NgxLoggerLevel.DEBUG,
                                serverLogLevel: i2.NgxLoggerLevel.OFF
                            }),
                            i1.HttpClientModule
                        ],
                        providers: [
                            CtsConstants,
                            CtsService,
                            ChemifyService
                        ]
                    }]
            }], null, null);
    })();

    /*
     * Public API Surface of cts-lib
     */

    /**
     * Generated bundle index. Do not edit.
     */

    exports.ChemifyService = ChemifyService;
    exports.CtsConstants = CtsConstants;
    exports.CtsLibModule = CtsLibModule;
    exports.CtsService = CtsService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cts-lib.umd.js.map
