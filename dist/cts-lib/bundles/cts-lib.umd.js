(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common/http'), require('ngx-logger')) :
    typeof define === 'function' && define.amd ? define('cts-lib', ['exports', '@angular/core', '@angular/common/http', 'ngx-logger'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['cts-lib'] = {}, global.ng.core, global.ng.common.http, global.i3));
}(this, (function (exports, i0, i2, i3) { 'use strict';

    var CtsConstants = /** @class */ (function () {
        function CtsConstants() {
            this.apiUrl = 'https://cts.fiehnlab.ucdavis.edu';
        }
        return CtsConstants;
    }());

    var CtsService = /** @class */ (function () {
        function CtsService(http, logger, config) {
            var _this = this;
            this.http = http;
            this.logger = logger;
            this.apiUrl = '';
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
            /**
             * converts the given Molecule to an InChI Key
             */
            this.convertToInchiKey = function (molecule, callback, errorCallback) {
                var serializedMolecule = _this.serializeData(molecule);
                _this.http.post(_this.apiUrl + "/service/moltoinchi", { mol: serializedMolecule }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } }).subscribe(function (res) {
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
            this.convertInchiKeyToMol = function (inchiKey, callback, errorCallback) {
                _this.http.get(_this.apiUrl + "/service/inchikeytomol/" + inchiKey).subscribe(function (res) {
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
            this.convertSmileToInChICode = function (smiles, callback, errorCallback) {
                var serializedSmiles = _this.serializeData(smiles);
                _this.http.post(_this.apiUrl + "/service/smiletoinchi", { smiles: serializedSmiles.trim() }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } }).subscribe(function (res) {
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
            this.convertInChICodeToKey = function (inchiCode, callback, errorCallback) {
                var serializedInchiCode = _this.serializeData(inchiCode);
                _this.http.post(_this.apiUrl + "/service/inchicodetoinchikey", { inchicode: serializedInchiCode }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } })
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
            this.convertInChICodeToMol = function (inchiCode, callback, errorCallback) {
                var serializedInchiCode = _this.serializeData(inchiCode);
                return _this.http.post(_this.apiUrl + "/service/inchitomol", { inchicode: serializedInchiCode }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } })
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
            if (config) {
                this.apiUrl = config.apiUrl;
            }
        }
        return CtsService;
    }());
    CtsService.ɵfac = function CtsService_Factory(t) { return new (t || CtsService)(i0.ɵɵinject(i2.HttpClient), i0.ɵɵinject(i3.NGXLogger), i0.ɵɵinject(CtsConstants, 8)); };
    CtsService.ɵprov = i0.ɵɵdefineInjectable({ token: CtsService, factory: CtsService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(CtsService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () {
            return [{ type: i2.HttpClient, decorators: [{
                            type: i0.Inject,
                            args: [i2.HttpClient]
                        }] }, { type: i3.NGXLogger, decorators: [{
                            type: i0.Inject,
                            args: [i3.NGXLogger]
                        }] }, { type: CtsConstants, decorators: [{
                            type: i0.Optional
                        }] }];
        }, null);
    })();

    var ChemifyService = /** @class */ (function () {
        function ChemifyService(http, logger, config) {
            var _this = this;
            this.http = http;
            this.logger = logger;
            this.apiUrl = '';
            /**
             * converts the given name to an InChI Key
             */
            this.nameToInChIKey = function (chemicalName, callback, errorCallback) {
                _this.http.get(_this.apiUrl + "/chemify/rest/identify/" + encodeURI(chemicalName))
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
            if (config) {
                this.apiUrl = config.apiUrl;
            }
        }
        return ChemifyService;
    }());
    ChemifyService.ɵfac = function ChemifyService_Factory(t) { return new (t || ChemifyService)(i0.ɵɵinject(i2.HttpClient), i0.ɵɵinject(i3.NGXLogger), i0.ɵɵinject(CtsConstants, 8)); };
    ChemifyService.ɵprov = i0.ɵɵdefineInjectable({ token: ChemifyService, factory: ChemifyService.ɵfac, providedIn: 'root' });
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(ChemifyService, [{
                type: i0.Injectable,
                args: [{
                        providedIn: 'root'
                    }]
            }], function () {
            return [{ type: i2.HttpClient, decorators: [{
                            type: i0.Inject,
                            args: [i2.HttpClient]
                        }] }, { type: i3.NGXLogger, decorators: [{
                            type: i0.Inject,
                            args: [i3.NGXLogger]
                        }] }, { type: CtsConstants, decorators: [{
                            type: i0.Optional
                        }] }];
        }, null);
    })();

    var CtsLibModule = /** @class */ (function () {
        function CtsLibModule(parentModule) {
            if (parentModule) {
                throw new Error('GreetingModule is already loaded. Import it in the AppModule only');
            }
        }
        CtsLibModule.forRoot = function (config) {
            return {
                ngModule: CtsLibModule,
                providers: [
                    { provide: CtsConstants, useValue: config }
                ]
            };
        };
        return CtsLibModule;
    }());
    CtsLibModule.ɵmod = i0.ɵɵdefineNgModule({ type: CtsLibModule });
    CtsLibModule.ɵinj = i0.ɵɵdefineInjector({ factory: function CtsLibModule_Factory(t) { return new (t || CtsLibModule)(i0.ɵɵinject(CtsLibModule, 12)); }, providers: [
            CtsConstants,
            CtsService,
            ChemifyService
        ], imports: [[
                i3.LoggerModule.forRoot({
                    level: i3.NgxLoggerLevel.DEBUG,
                    serverLogLevel: i3.NgxLoggerLevel.OFF
                }),
                i2.HttpClientModule
            ]] });
    (function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CtsLibModule, { imports: [i3.LoggerModule, i2.HttpClientModule] }); })();
    /*@__PURE__*/ (function () {
        i0.ɵsetClassMetadata(CtsLibModule, [{
                type: i0.NgModule,
                args: [{
                        imports: [
                            i3.LoggerModule.forRoot({
                                level: i3.NgxLoggerLevel.DEBUG,
                                serverLogLevel: i3.NgxLoggerLevel.OFF
                            }),
                            i2.HttpClientModule
                        ],
                        providers: [
                            CtsConstants,
                            CtsService,
                            ChemifyService
                        ]
                    }]
            }], function () {
            return [{ type: CtsLibModule, decorators: [{
                            type: i0.Optional
                        }, {
                            type: i0.SkipSelf
                        }] }];
        }, null);
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
