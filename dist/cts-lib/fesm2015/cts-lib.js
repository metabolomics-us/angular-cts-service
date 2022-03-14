import { ɵɵinject, ɵɵdefineInjectable, ɵsetClassMetadata, Injectable, Inject, ɵɵdefineNgModule, ɵɵdefineInjector, ɵɵsetNgModuleScope, NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NGXLogger, LoggerModule, NgxLoggerLevel } from 'ngx-logger';

class CtsConstants {
    constructor() {
        this.apiUrl = '';
    }
}

class CtsService {
    constructor(http, logger, ctsConstant) {
        this.http = http;
        this.logger = logger;
        this.ctsConstant = ctsConstant;
        this.serializeData = (data) => {
            if (typeof data !== 'object' && data !== null) {
                return ((data == null) ? '' : data.toString());
            }
            const buffer = [];
            for (const name in data) {
                if (!data.hasOwnProperty(name)) {
                    continue;
                }
                const value = data[name];
                buffer.push(encodeURIComponent(name) + '=' + encodeURIComponent((value == null) ? '' : value));
            }
            const source = buffer.join('&').replace(/%20/g, '+');
            return (source);
        };
        this.apiUrl = ctsConstant.apiUrl;
        console.log(this.ctsConstant.apiUrl);
        console.log(this.apiUrl);
    }
    /**
     * converts the given Molecule to an InChI Key
     */
    convertToInchiKey(molecule, callback, errorCallback) {
        this.logger.info(this.apiUrl);
        this.logger.info(this.ctsConstant.apiUrl);
        const serializedMolecule = this.serializeData(molecule);
        this.http.post(`${this.apiUrl}/service/moltoinchi`, { mol: serializedMolecule }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } }).subscribe((res) => {
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
     * converts an InChI Key to a molecule
     */
    convertInchiKeyToMol(inchiKey, callback, errorCallback) {
        this.logger.info(this.apiUrl);
        this.logger.info(this.ctsConstant.apiUrl);
        this.http.get(`${this.apiUrl}/service/inchikeytomol/${inchiKey}`).subscribe((res) => {
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
    convertSmileToInChICode(smiles, callback, errorCallback) {
        this.logger.info(this.apiUrl);
        this.logger.info(this.ctsConstant.apiUrl);
        const serializedSmiles = this.serializeData(smiles);
        this.http.post(`${this.apiUrl}/service/smiletoinchi`, { smiles: serializedSmiles.trim() }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } }).subscribe((res) => {
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
    convertInChICodeToKey(inchiCode, callback, errorCallback) {
        this.logger.info(this.apiUrl);
        this.logger.info(this.ctsConstant.apiUrl);
        const serializedInchiCode = this.serializeData(inchiCode);
        this.http.post(`${this.apiUrl}/service/inchicodetoinchikey`, { inchicode: serializedInchiCode }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } })
            .subscribe((res) => {
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
    convertInChICodeToMol(inchiCode, callback, errorCallback) {
        this.logger.info(this.apiUrl);
        this.logger.info(this.ctsConstant.apiUrl);
        const serializedInchiCode = this.serializeData(inchiCode);
        this.http.post(`${this.apiUrl}/service/inchitomol`, { inchicode: serializedInchiCode }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } })
            .subscribe((res) => {
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
CtsService.ɵfac = function CtsService_Factory(t) { return new (t || CtsService)(ɵɵinject(HttpClient), ɵɵinject(NGXLogger), ɵɵinject(CtsConstants)); };
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
            }] }, { type: CtsConstants, decorators: [{
                type: Inject,
                args: [CtsConstants]
            }] }]; }, null); })();

class ChemifyService {
    constructor(http, logger, ctsConstants) {
        this.http = http;
        this.logger = logger;
        this.ctsConstants = ctsConstants;
        this.apiUrl = ctsConstants.apiUrl;
        logger.info(this.apiUrl);
        logger.info(this.ctsConstants.apiUrl);
    }
    /**
     * converts the given name to an InChI Key
     */
    nameToInChIKey(chemicalName, callback, errorCallback) {
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
ChemifyService.ɵfac = function ChemifyService_Factory(t) { return new (t || ChemifyService)(ɵɵinject(HttpClient), ɵɵinject(NGXLogger), ɵɵinject(CtsConstants)); };
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
            }] }, { type: CtsConstants, decorators: [{
                type: Inject,
                args: [CtsConstants]
            }] }]; }, null); })();

class CtsLibModule {
    static forRoot(config) {
        console.log(config);
        return {
            ngModule: CtsLibModule,
            providers: [
                { provide: CtsConstants, useValue: config }
            ]
        };
    }
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
