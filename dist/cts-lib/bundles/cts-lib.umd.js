(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('ngx-logger')) :
    typeof define === 'function' && define.amd ? define('cts-lib', ['exports', '@angular/core', '@angular/common/http', 'ngx-logger'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['cts-lib'] = {}, global.ng.core, global.ng.common.http, global.i2));
}(this, (function (exports, i0, i1, i2) { 'use strict';

    var CtsConstantTokenService = new i0.InjectionToken('CtsConstant');

    var CtsService = /** @class */ (function () {
        function CtsService(http, logger, config) {
            this.http = http;
            this.logger = logger;
            this.config = config;
            this.serializeData = function (data) {
                if (typeof data !== 'object' && data !== null) {
                    return ((data == null) ? '' : data.toString());
                }
                var buffer = [];
                for (var name in data) {
                    if (!data.hasOwnProperty(name)) {
                        continue;
                    }
                    var value = data[name];
                    buffer.push(encodeURIComponent(name) + '=' + encodeURIComponent((value == null) ? '' : value));
                }
                var source = buffer.join('&').replace(/%20/g, '+');
                return (source);
            };
            this.apiUrl = config.apiUrl;
        }
        /**
         * converts the given Molecule to an InChI Key
         */
        CtsService.prototype.convertToInchiKey = function (molecule, callback, errorCallback) {
            var _this = this;
            var serializedMolecule = this.serializeData(molecule);
            this.http.post(this.apiUrl + "/service/moltoinchi", { mol: serializedMolecule }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } }).subscribe(function (res) {
                _this.logger.debug('received: ' + res);
                if (typeof res !== 'undefined') {
                    if (typeof res.error !== 'undefined') {
                        if (errorCallback) {
                            errorCallback(res.error);
                        }
                        else {
                            _this.logger.warn('no error message provided!');
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
                        _this.logger.debug('no data object is defined!');
                    }
                }
            }, function (error) {
                if (errorCallback) {
                    errorCallback(error);
                }
                else {
                    if (error != null) {
                        _this.logger.warn('error: ' + error);
                    }
                    else {
                        _this.logger.warn('no error message provided!');
                    }
                }
            });
        };
        /**
         * converts an InChI Key to a molecule
         */
        CtsService.prototype.convertInchiKeyToMol = function (inchiKey, callback, errorCallback) {
            var _this = this;
            this.http.get(this.apiUrl + "/service/inchikeytomol/" + inchiKey).subscribe(function (res) {
                if (typeof res !== 'undefined') {
                    if (res.error !== '') {
                        if (errorCallback) {
                            errorCallback(res.error);
                        }
                        else {
                            _this.logger.warn('no error message provided!');
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
            }, function (error) {
                if (errorCallback) {
                    errorCallback(error);
                }
                else {
                    if (error != null) {
                        _this.logger.warn('error: ' + error);
                    }
                    else {
                        _this.logger.warn('no error message provided!');
                    }
                }
            });
        };
        /**
         * utilizes chemspider to convert from a smiles to an inchi
         */
        CtsService.prototype.convertSmileToInChICode = function (smiles, callback, errorCallback) {
            var _this = this;
            var serializedSmiles = this.serializeData(smiles);
            this.http.post(this.apiUrl + "/service/smiletoinchi", { smiles: serializedSmiles.trim() }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } }).subscribe(function (res) {
                if (typeof res !== 'undefined') {
                    if (typeof res.error !== 'undefined') {
                        if (typeof errorCallback !== 'undefined') {
                            errorCallback(res.error);
                        }
                        else {
                            _this.logger.warn('no error message provided');
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
                    _this.logger.debug('no data object id defined!');
                }
            }, function (error) {
                if (typeof errorCallback !== 'undefined') {
                    errorCallback(error);
                }
                else {
                    if (error != null) {
                        _this.logger.warn('error: ' + error);
                    }
                    else {
                        _this.logger.warn('no error message provided!');
                    }
                }
            });
        };
        /**
         * converts an inchi code to an inchi keyß
         */
        CtsService.prototype.convertInChICodeToKey = function (inchiCode, callback, errorCallback) {
            var _this = this;
            var serializedInchiCode = this.serializeData(inchiCode);
            this.http.post(this.apiUrl + "/service/inchicodetoinchikey", { inchicode: serializedInchiCode }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } })
                .subscribe(function (res) {
                if (typeof res !== 'undefined') {
                    if (typeof res.error !== 'undefined') {
                        if (typeof errorCallback !== 'undefined') {
                            errorCallback(res.error);
                        }
                        else {
                            _this.logger.warn('no error message provided!');
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
                    _this.logger.debug('no data object is defined!');
                }
            }, function (error) {
                if (typeof errorCallback !== 'undefined') {
                    errorCallback(error);
                }
                else {
                    if (error !== null) {
                        _this.logger.warn('error: ' + error);
                    }
                    else {
                        _this.logger.warn('no error message provided!');
                    }
                }
            });
        };
        /**
         * provides us with the molfile for this key
         */
        CtsService.prototype.convertInChICodeToMol = function (inchiCode, callback, errorCallback) {
            var _this = this;
            var serializedInchiCode = this.serializeData(inchiCode);
            this.http.post(this.apiUrl + "/service/inchitomol", { inchicode: serializedInchiCode }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } })
                .subscribe(function (res) {
                if (typeof res !== 'undefined') {
                    if (typeof res.error !== 'undefined') {
                        if (typeof errorCallback !== 'undefined') {
                            errorCallback(res.error);
                        }
                        else {
                            _this.logger.warn('no error message provided!');
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
                    _this.logger.debug('no data object is defined!');
                }
            }, function (error) {
                if (typeof errorCallback !== 'undefined') {
                    errorCallback(error);
                }
                else {
                    if (error != null) {
                        _this.logger.warn('error: ' + error);
                    }
                    else {
                        _this.logger.warn('no error message provided!');
                    }
                }
            });
        };
        return CtsService;
    }());
    CtsService.ɵfac = function CtsService_Factory(t) { return new (t || CtsService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.NGXLogger), i0.ɵɵinject(CtsConstantTokenService)); };
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
                        }] }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [CtsConstantTokenService]
                        }] }];
        }, null);
    })();

    var ChemifyService = /** @class */ (function () {
        function ChemifyService(http, logger, config) {
            this.http = http;
            this.logger = logger;
            this.config = config;
            this.apiUrl = config.apiUrl;
        }
        /**
         * converts the given name to an InChI Key
         */
        ChemifyService.prototype.nameToInChIKey = function (chemicalName, callback, errorCallback) {
            var _this = this;
            this.http.get(this.apiUrl + "/chemify/rest/identify/" + encodeURI(chemicalName))
                .subscribe(function (res) {
                var result = '';
                if (typeof res !== 'undefined') {
                    var data = res;
                    if (Array.isArray(data)) {
                        if (data.length > 0) {
                            var topHit = data[0];
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
            }, function (error) {
                if (errorCallback) {
                    errorCallback(error);
                }
                else {
                    if (error != null) {
                        _this.logger.warn('error: ' + error);
                    }
                    else {
                        _this.logger.warn('no error message provided!');
                    }
                }
            });
        };
        return ChemifyService;
    }());
    ChemifyService.ɵfac = function ChemifyService_Factory(t) { return new (t || ChemifyService)(i0.ɵɵinject(i1.HttpClient), i0.ɵɵinject(i2.NGXLogger), i0.ɵɵinject(CtsConstantTokenService)); };
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
                        }] }, { type: undefined, decorators: [{
                            type: i0.Inject,
                            args: [CtsConstantTokenService]
                        }] }];
        }, null);
    })();

    var CtsLibModule = /** @class */ (function () {
        function CtsLibModule() {
        }
        CtsLibModule.forRoot = function (config) {
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
        };
        return CtsLibModule;
    }());
    CtsLibModule.ɵmod = i0.ɵɵdefineNgModule({ type: CtsLibModule });
    CtsLibModule.ɵinj = i0.ɵɵdefineInjector({ factory: function CtsLibModule_Factory(t) { return new (t || CtsLibModule)(); }, imports: [[
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
    exports.CtsLibModule = CtsLibModule;
    exports.CtsService = CtsService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=cts-lib.umd.js.map
