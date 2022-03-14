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
        /**
         * converts the given Molecule to an InChI Key
         */
        this.convertToInchiKey = (molecule, callback, errorCallback) => {
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
        };
        /**
         * converts an InChI Key to a molecule
         */
        this.convertInchiKeyToMol = (inchiKey, callback, errorCallback) => {
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
        };
        /**
         * utilizes chemspider to convert from a smiles to an inchi
         */
        this.convertSmileToInChICode = (smiles, callback, errorCallback) => {
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
        };
        /**
         * converts an inchi code to an inchi keyß
         */
        this.convertInChICodeToKey = (inchiCode, callback, errorCallback) => {
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
        };
        /**
         * provides us with the molfile for this key
         */
        this.convertInChICodeToMol = (inchiCode, callback, errorCallback) => {
            const serializedInchiCode = this.serializeData(inchiCode);
            return this.http.post(`${this.apiUrl}/service/inchitomol`, { inchicode: serializedInchiCode }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } })
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
        };
        this.apiUrl = ctsConstant.apiUrl;
        console.log(this.ctsConstant.apiUrl);
        console.log(this.apiUrl);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3RzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvbm9sYW4vRGV2ZWxvcG1lbnQvbW9uYS1zZXJ2aWNlcy9hbmd1bGFyLWN0cy1zZXJ2aWNlL3Byb2plY3RzL2N0cy1saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL2N0cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFXLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7QUFLN0MsTUFBTSxPQUFPLFVBQVU7SUFHckIsWUFBdUMsSUFBZ0IsRUFBNEIsTUFBaUIsRUFDM0QsV0FBeUI7UUFEM0IsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUE0QixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQzNELGdCQUFXLEdBQVgsV0FBVyxDQUFjO1FBTTFELGtCQUFhLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMvQixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUM3QyxPQUFPLENBQUUsQ0FBRSxJQUFJLElBQUksSUFBSSxDQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFFLENBQUM7YUFDcEQ7WUFFRCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFFbEIsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUM5QixTQUFTO2lCQUNWO2dCQUVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztn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QkFDSTtvQkFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2lCQUNqRDtZQUNILENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNYLElBQUksT0FBTyxhQUFhLEtBQUssV0FBVyxFQUFFO29CQUN4QyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3RCO3FCQUNJO29CQUNILElBQUksS0FBSyxJQUFJLElBQUksRUFBRTt3QkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDO3FCQUNyQzt5QkFDSTt3QkFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO3FCQUNoRDtpQkFDRjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFBO1FBalBELElBQUksQ0FBQyxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztRQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7b0VBUlUsVUFBVSxjQUdELFVBQVUsZUFBbUMsU0FBUyxlQUN0RCxZQUFZO2tEQUpyQixVQUFVLFdBQVYsVUFBVSxtQkFGVCxNQUFNO2tEQUVQLFVBQVU7Y0FIdEIsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COztzQkFJYyxNQUFNO3VCQUFDLFVBQVU7O3NCQUE0QixNQUFNO3VCQUFDLFNBQVM7O3NCQUM3RCxNQUFNO3VCQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge05HWExvZ2dlcn0gZnJvbSAnbmd4LWxvZ2dlcic7XG5pbXBvcnQge0N0c0NvbnN0YW50c30gZnJvbSAnLi9jdHMtY29uc3RhbnRzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQ3RzU2VydmljZSB7XG4gIGFwaVVybDtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEh0dHBDbGllbnQpIHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KE5HWExvZ2dlcikgcHVibGljIGxvZ2dlcjogTkdYTG9nZ2VyLFxuICAgICAgICAgICAgICBASW5qZWN0KEN0c0NvbnN0YW50cykgcHVibGljIGN0c0NvbnN0YW50OiBDdHNDb25zdGFudHMpIHtcbiAgICB0aGlzLmFwaVVybCA9IGN0c0NvbnN0YW50LmFwaVVybDtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmN0c0NvbnN0YW50LmFwaVVybCk7XG4gICAgY29uc29sZS5sb2codGhpcy5hcGlVcmwpO1xuICB9XG5cbiAgcHJpdmF0ZSBzZXJpYWxpemVEYXRhID0gKGRhdGEpID0+IHtcbiAgICBpZiAodHlwZW9mIGRhdGEgIT09ICdvYmplY3QnICYmIGRhdGEgIT09IG51bGwpIHtcbiAgICAgIHJldHVybiAoICggZGF0YSA9PSBudWxsICkgPyAnJyA6IGRhdGEudG9TdHJpbmcoKSApO1xuICAgIH1cblxuICAgIGNvbnN0IGJ1ZmZlciA9IFtdO1xuXG4gICAgZm9yIChjb25zdCBuYW1lIGluIGRhdGEpIHtcbiAgICAgIGlmICghZGF0YS5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdmFsdWUgPSBkYXRhW25hbWVdO1xuICAgICAgYnVmZmVyLnB1c2goZW5jb2RlVVJJQ29tcG9uZW50KG5hbWUpICsgJz0nICsgZW5jb2RlVVJJQ29tcG9uZW50KCggdmFsdWUgPT0gbnVsbCApID8gJycgOiB2YWx1ZSkpO1xuICAgIH1cblxuICAgIGNvbnN0IHNvdXJjZSA9IGJ1ZmZlci5qb2luKCcmJykucmVwbGFjZSgvJTIwL2csICcrJyk7XG5cbiAgICByZXR1cm4gKHNvdXJjZSk7XG4gIH1cblxuICAvKipcbiAgICogY29udmVydHMgdGhlIGdpdmVuIE1vbGVjdWxlIHRvIGFuIEluQ2hJIEtleVxuICAgKi9cbiAgY29udmVydFRvSW5jaGlLZXkgPSAgKG1vbGVjdWxlLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHNlcmlhbGl6ZWRNb2xlY3VsZSA9IHRoaXMuc2VyaWFsaXplRGF0YShtb2xlY3VsZSk7XG4gICAgdGhpcy5odHRwLnBvc3QoYCR7dGhpcy5hcGlVcmx9L3NlcnZpY2UvbW9sdG9pbmNoaWAsIHttb2w6IHNlcmlhbGl6ZWRNb2xlY3VsZX0sXG4gICAgICB7aGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PXV0Zi04J319KS5zdWJzY3JpYmUoKHJlczogYW55KSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygncmVjZWl2ZWQ6ICcgKyByZXMpO1xuICAgICAgaWYgKHR5cGVvZiByZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmIChlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKHJlcy5lcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2Fybignbm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCEnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmIChyZXMuaW5jaGlrZXkpIHtcbiAgICAgICAgICAgaWYgKHJlcy5pbmNoaWtleSA9PT0gJycpIHtcbiAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgfVxuICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICBjYWxsYmFjayhyZXMpO1xuICAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ25vIGRhdGEgb2JqZWN0IGlzIGRlZmluZWQhJyk7XG4gICAgICB9XG4gICAgfX0sIChlcnJvcikgPT4ge1xuICAgICAgaWYgKGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdlcnJvcjogJyArIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogY29udmVydHMgYW4gSW5DaEkgS2V5IHRvIGEgbW9sZWN1bGVcbiAgICovXG4gIGNvbnZlcnRJbmNoaUtleVRvTW9sID0gKGluY2hpS2V5LCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykgPT4ge1xuICAgIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5hcGlVcmx9L3NlcnZpY2UvaW5jaGlrZXl0b21vbC8ke2luY2hpS2V5fWApLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgcmVzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAocmVzLmVycm9yICE9PSAnJykge1xuICAgICAgICAgIGlmIChlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKHJlcy5lcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2Fybignbm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCEnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAocmVzLm1vbGVjdWxlKSB7XG4gICAgICAgICAgaWYgKHJlcy5tb2xlY3VsZSA9PT0gJycgfHwgcmVzLm1vbGVjdWxlID09PSBudWxsKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjayhyZXMubW9sZWN1bGUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICBpZiAoZXJyb3JDYWxsYmFjaykge1xuICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ2Vycm9yOiAnICsgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ25vIGVycm9yIG1lc3NhZ2UgcHJvdmlkZWQhJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB1dGlsaXplcyBjaGVtc3BpZGVyIHRvIGNvbnZlcnQgZnJvbSBhIHNtaWxlcyB0byBhbiBpbmNoaVxuICAgKi9cbiAgY29udmVydFNtaWxlVG9JbkNoSUNvZGUgPSAgKHNtaWxlcywgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spID0+IHtcbiAgICBjb25zdCBzZXJpYWxpemVkU21pbGVzID0gdGhpcy5zZXJpYWxpemVEYXRhKHNtaWxlcyk7XG4gICAgdGhpcy5odHRwLnBvc3QoYCR7dGhpcy5hcGlVcmx9L3NlcnZpY2Uvc21pbGV0b2luY2hpYCwge3NtaWxlczogc2VyaWFsaXplZFNtaWxlcy50cmltKCl9LFxuICAgICAge2hlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD11dGYtOCd9fSkuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHJlcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHJlcy5lcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3JDYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhyZXMuZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ25vIGVycm9yIG1lc3NhZ2UgcHJvdmlkZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHJlcy5pbmNoaWtleSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmIChyZXMuaW5jaGlrZXkgPT09ICcnKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKHJlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdubyBkYXRhIG9iamVjdCBpZCBkZWZpbmVkIScpO1xuICAgICAgICB9XG4gICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGVycm9yQ2FsbGJhY2sgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2FybignZXJyb3I6ICcgKyBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2Fybignbm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCEnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbnZlcnRzIGFuIGluY2hpIGNvZGUgdG8gYW4gaW5jaGkga2V5w59cbiAgICovXG4gIGNvbnZlcnRJbkNoSUNvZGVUb0tleSA9IChpbmNoaUNvZGUsIGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSA9PiB7XG4gICAgY29uc3Qgc2VyaWFsaXplZEluY2hpQ29kZSA9IHRoaXMuc2VyaWFsaXplRGF0YShpbmNoaUNvZGUpO1xuICAgIHRoaXMuaHR0cC5wb3N0KGAke3RoaXMuYXBpVXJsfS9zZXJ2aWNlL2luY2hpY29kZXRvaW5jaGlrZXlgLCB7aW5jaGljb2RlOiBzZXJpYWxpemVkSW5jaGlDb2RlfSxcbiAgICAgIHtoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9dXRmLTgnfX0pXG4gICAgLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcblxuICAgICAgaWYgKHR5cGVvZiByZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3JDYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2socmVzLmVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgcmVzLmluY2hpa2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmIChyZXMuaW5jaGlrZXkgPT09ICcnKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjayhyZXMuaW5jaGlrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ25vIGRhdGEgb2JqZWN0IGlzIGRlZmluZWQhJyk7XG4gICAgICB9XG4gICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGVycm9yQ2FsbGJhY2sgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChlcnJvciAhPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ2Vycm9yOiAnICsgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ25vIGVycm9yIG1lc3NhZ2UgcHJvdmlkZWQhJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwcm92aWRlcyB1cyB3aXRoIHRoZSBtb2xmaWxlIGZvciB0aGlzIGtleVxuICAgKi9cbiAgY29udmVydEluQ2hJQ29kZVRvTW9sID0gKGluY2hpQ29kZSwgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spID0+IHtcbiAgICBjb25zdCBzZXJpYWxpemVkSW5jaGlDb2RlID0gdGhpcy5zZXJpYWxpemVEYXRhKGluY2hpQ29kZSk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGAke3RoaXMuYXBpVXJsfS9zZXJ2aWNlL2luY2hpdG9tb2xgLCB7IGluY2hpY29kZTogc2VyaWFsaXplZEluY2hpQ29kZSB9LFxuICAgICAge2hlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD11dGYtOCd9fSlcbiAgICAgIC5zdWJzY3JpYmUoKHJlczogYW55KSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVzLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvckNhbGxiYWNrICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKHJlcy5lcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5sb2dnZXIud2Fybignbm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCEnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHJlcy5tb2xlY3VsZSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmIChyZXMubW9sZWN1bGUgPT09ICcnKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKHJlcy5tb2xlY3VsZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ25vIGRhdGEgb2JqZWN0IGlzIGRlZmluZWQhJyk7XG4gICAgICAgIH1cbiAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIGVycm9yQ2FsbGJhY2sgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ2Vycm9yOiAnICsgZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ25vIGVycm9yIG1lc3NhZ2UgcHJvdmlkZWQhJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG59XG4iXX0=