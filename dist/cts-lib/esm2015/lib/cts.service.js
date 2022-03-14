import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { CtsConstants } from './cts-constants';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "ngx-logger";
import * as i3 from "./cts-constants";
export class CtsService {
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
CtsService.ɵfac = function CtsService_Factory(t) { return new (t || CtsService)(i0.ɵɵinject(HttpClient), i0.ɵɵinject(NGXLogger), i0.ɵɵinject(CtsConstants)); };
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
            }] }, { type: i3.CtsConstants, decorators: [{
                type: Inject,
                args: [CtsConstants]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3RzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvbm9sYW4vRGV2ZWxvcG1lbnQvbW9uYS1zZXJ2aWNlcy9hbmd1bGFyLWN0cy1zZXJ2aWNlL3Byb2plY3RzL2N0cy1saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL2N0cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFXLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7QUFLN0MsTUFBTSxPQUFPLFVBQVU7SUFHckIsWUFBdUMsSUFBZ0IsRUFBNEIsTUFBaUIsRUFDM0QsV0FBeUI7UUFEM0IsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUE0QixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQzNELGdCQUFXLEdBQVgsV0FBVyxDQUFjO1FBTTFELGtCQUFhLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMvQixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUM3QyxPQUFPLENBQUUsQ0FBRSxJQUFJLElBQUksSUFBSSxDQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFFLENBQUM7YUFDcEQ7WUFFRCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFFbEIsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUM5QixTQUFTO2lCQUNWO2dCQUVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztn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SSxJQUFJLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQztpQkFDckM7cUJBQ0k7b0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztpQkFDaEQ7YUFDRjtRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7b0VBaFFRLFVBQVUsY0FHRCxVQUFVLGVBQW1DLFNBQVMsZUFDdEQsWUFBWTtrREFKckIsVUFBVSxXQUFWLFVBQVUsbUJBRlQsTUFBTTtrREFFUCxVQUFVO2NBSHRCLFVBQVU7ZUFBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7c0JBSWMsTUFBTTt1QkFBQyxVQUFVOztzQkFBNEIsTUFBTTt1QkFBQyxTQUFTOztzQkFDN0QsTUFBTTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtOR1hMb2dnZXJ9IGZyb20gJ25neC1sb2dnZXInO1xuaW1wb3J0IHtDdHNDb25zdGFudHN9IGZyb20gJy4vY3RzLWNvbnN0YW50cyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEN0c1NlcnZpY2Uge1xuICBhcGlVcmw7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChIdHRwQ2xpZW50KSBwdWJsaWMgaHR0cDogSHR0cENsaWVudCwgQEluamVjdChOR1hMb2dnZXIpIHB1YmxpYyBsb2dnZXI6IE5HWExvZ2dlcixcbiAgICAgICAgICAgICAgQEluamVjdChDdHNDb25zdGFudHMpIHB1YmxpYyBjdHNDb25zdGFudDogQ3RzQ29uc3RhbnRzKSB7XG4gICAgdGhpcy5hcGlVcmwgPSBjdHNDb25zdGFudC5hcGlVcmw7XG4gICAgY29uc29sZS5sb2codGhpcy5jdHNDb25zdGFudC5hcGlVcmwpO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuYXBpVXJsKTtcbiAgfVxuXG4gIHByaXZhdGUgc2VyaWFsaXplRGF0YSA9IChkYXRhKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBkYXRhICE9PSAnb2JqZWN0JyAmJiBkYXRhICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gKCAoIGRhdGEgPT0gbnVsbCApID8gJycgOiBkYXRhLnRvU3RyaW5nKCkgKTtcbiAgICB9XG5cbiAgICBjb25zdCBidWZmZXIgPSBbXTtcblxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBkYXRhKSB7XG4gICAgICBpZiAoIWRhdGEuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZhbHVlID0gZGF0YVtuYW1lXTtcbiAgICAgIGJ1ZmZlci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCgoIHZhbHVlID09IG51bGwgKSA/ICcnIDogdmFsdWUpKTtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2UgPSBidWZmZXIuam9pbignJicpLnJlcGxhY2UoLyUyMC9nLCAnKycpO1xuXG4gICAgcmV0dXJuIChzb3VyY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbnZlcnRzIHRoZSBnaXZlbiBNb2xlY3VsZSB0byBhbiBJbkNoSSBLZXlcbiAgICovXG4gIGNvbnZlcnRUb0luY2hpS2V5KG1vbGVjdWxlLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjayk6IHZvaWQge1xuICAgIHRoaXMubG9nZ2VyLmluZm8odGhpcy5hcGlVcmwpO1xuICAgIHRoaXMubG9nZ2VyLmluZm8odGhpcy5jdHNDb25zdGFudC5hcGlVcmwpO1xuICAgIGNvbnN0IHNlcmlhbGl6ZWRNb2xlY3VsZSA9IHRoaXMuc2VyaWFsaXplRGF0YShtb2xlY3VsZSk7XG4gICAgdGhpcy5odHRwLnBvc3QoYCR7dGhpcy5hcGlVcmx9L3NlcnZpY2UvbW9sdG9pbmNoaWAsIHttb2w6IHNlcmlhbGl6ZWRNb2xlY3VsZX0sXG4gICAgICB7aGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PXV0Zi04J319KS5zdWJzY3JpYmUoKHJlczogYW55KSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygncmVjZWl2ZWQ6ICcgKyByZXMpO1xuICAgICAgaWYgKHR5cGVvZiByZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmIChlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKHJlcy5lcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2Fybignbm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCEnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmIChyZXMuaW5jaGlrZXkpIHtcbiAgICAgICAgICAgaWYgKHJlcy5pbmNoaWtleSA9PT0gJycpIHtcbiAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgfVxuICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICBjYWxsYmFjayhyZXMpO1xuICAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ25vIGRhdGEgb2JqZWN0IGlzIGRlZmluZWQhJyk7XG4gICAgICB9XG4gICAgfX0sIChlcnJvcikgPT4ge1xuICAgICAgaWYgKGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdlcnJvcjogJyArIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogY29udmVydHMgYW4gSW5DaEkgS2V5IHRvIGEgbW9sZWN1bGVcbiAgICovXG4gIGNvbnZlcnRJbmNoaUtleVRvTW9sKGluY2hpS2V5LCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjayk6IHZvaWQge1xuICAgIHRoaXMubG9nZ2VyLmluZm8odGhpcy5hcGlVcmwpO1xuICAgIHRoaXMubG9nZ2VyLmluZm8odGhpcy5jdHNDb25zdGFudC5hcGlVcmwpO1xuICAgIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5hcGlVcmx9L3NlcnZpY2UvaW5jaGlrZXl0b21vbC8ke2luY2hpS2V5fWApLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgcmVzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAocmVzLmVycm9yICE9PSAnJykge1xuICAgICAgICAgIGlmIChlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKHJlcy5lcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2Fybignbm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCEnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVzLm1vbGVjdWxlKSB7XG4gICAgICAgICAgaWYgKHJlcy5tb2xlY3VsZSA9PT0gJycgfHwgcmVzLm1vbGVjdWxlID09PSBudWxsKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjayhyZXMubW9sZWN1bGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICBpZiAoZXJyb3JDYWxsYmFjaykge1xuICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ2Vycm9yOiAnICsgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ25vIGVycm9yIG1lc3NhZ2UgcHJvdmlkZWQhJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1dGlsaXplcyBjaGVtc3BpZGVyIHRvIGNvbnZlcnQgZnJvbSBhIHNtaWxlcyB0byBhbiBpbmNoaVxuICAgKi9cbiAgY29udmVydFNtaWxlVG9JbkNoSUNvZGUoc21pbGVzLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjayk6IHZvaWQge1xuICAgIHRoaXMubG9nZ2VyLmluZm8odGhpcy5hcGlVcmwpO1xuICAgIHRoaXMubG9nZ2VyLmluZm8odGhpcy5jdHNDb25zdGFudC5hcGlVcmwpO1xuICAgIGNvbnN0IHNlcmlhbGl6ZWRTbWlsZXMgPSB0aGlzLnNlcmlhbGl6ZURhdGEoc21pbGVzKTtcbiAgICB0aGlzLmh0dHAucG9zdChgJHt0aGlzLmFwaVVybH0vc2VydmljZS9zbWlsZXRvaW5jaGlgLCB7c21pbGVzOiBzZXJpYWxpemVkU21pbGVzLnRyaW0oKX0sXG4gICAgICB7aGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PXV0Zi04J319KS5zdWJzY3JpYmUoKHJlczogYW55KSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVzLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvckNhbGxiYWNrICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKHJlcy5lcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5sb2dnZXIud2Fybignbm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgcmVzLmluY2hpa2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHJlcy5pbmNoaWtleSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2socmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ25vIGRhdGEgb2JqZWN0IGlkIGRlZmluZWQhJyk7XG4gICAgICAgIH1cbiAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgZXJyb3JDYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdlcnJvcjogJyArIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogY29udmVydHMgYW4gaW5jaGkgY29kZSB0byBhbiBpbmNoaSBrZXnDn1xuICAgKi9cbiAgY29udmVydEluQ2hJQ29kZVRvS2V5KGluY2hpQ29kZSwgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spOiB2b2lkIHtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKHRoaXMuYXBpVXJsKTtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKHRoaXMuY3RzQ29uc3RhbnQuYXBpVXJsKTtcbiAgICBjb25zdCBzZXJpYWxpemVkSW5jaGlDb2RlID0gdGhpcy5zZXJpYWxpemVEYXRhKGluY2hpQ29kZSk7XG4gICAgdGhpcy5odHRwLnBvc3QoYCR7dGhpcy5hcGlVcmx9L3NlcnZpY2UvaW5jaGljb2RldG9pbmNoaWtleWAsIHtpbmNoaWNvZGU6IHNlcmlhbGl6ZWRJbmNoaUNvZGV9LFxuICAgICAge2hlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD11dGYtOCd9fSlcbiAgICAuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xuXG4gICAgICBpZiAodHlwZW9mIHJlcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXMuZXJyb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBlcnJvckNhbGxiYWNrICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhyZXMuZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ25vIGVycm9yIG1lc3NhZ2UgcHJvdmlkZWQhJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiByZXMuaW5jaGlrZXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKHJlcy5pbmNoaWtleSA9PT0gJycpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlcy5pbmNoaWtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1Zygnbm8gZGF0YSBvYmplY3QgaXMgZGVmaW5lZCEnKTtcbiAgICAgIH1cbiAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgZXJyb3JDYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGVycm9yICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2FybignZXJyb3I6ICcgKyBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2Fybignbm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCEnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHByb3ZpZGVzIHVzIHdpdGggdGhlIG1vbGZpbGUgZm9yIHRoaXMga2V5XG4gICAqL1xuICBjb252ZXJ0SW5DaElDb2RlVG9Nb2woaW5jaGlDb2RlLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjayk6IHZvaWQge1xuICAgIHRoaXMubG9nZ2VyLmluZm8odGhpcy5hcGlVcmwpO1xuICAgIHRoaXMubG9nZ2VyLmluZm8odGhpcy5jdHNDb25zdGFudC5hcGlVcmwpO1xuICAgIGNvbnN0IHNlcmlhbGl6ZWRJbmNoaUNvZGUgPSB0aGlzLnNlcmlhbGl6ZURhdGEoaW5jaGlDb2RlKTtcbiAgICB0aGlzLmh0dHAucG9zdChgJHt0aGlzLmFwaVVybH0vc2VydmljZS9pbmNoaXRvbW9sYCwgeyBpbmNoaWNvZGU6IHNlcmlhbGl6ZWRJbmNoaUNvZGUgfSxcbiAgICAgIHtoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9dXRmLTgnfX0pXG4gICAgICAuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHJlcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHJlcy5lcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3JDYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhyZXMuZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ25vIGVycm9yIG1lc3NhZ2UgcHJvdmlkZWQhJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiByZXMubW9sZWN1bGUgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAocmVzLm1vbGVjdWxlID09PSAnJykge1xuICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBjYWxsYmFjayhyZXMubW9sZWN1bGUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdubyBkYXRhIG9iamVjdCBpcyBkZWZpbmVkIScpO1xuICAgICAgICB9XG4gICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBlcnJvckNhbGxiYWNrICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdlcnJvcjogJyArIGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxufVxuIl19