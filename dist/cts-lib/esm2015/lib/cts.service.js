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
        this.apiUrl = '';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3RzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvbm9sYW4vRGV2ZWxvcG1lbnQvbW9uYS1zZXJ2aWNlcy9hbmd1bGFyLWN0cy1zZXJ2aWNlL3Byb2plY3RzL2N0cy1saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL2N0cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFXLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7QUFLN0MsTUFBTSxPQUFPLFVBQVU7SUFHckIsWUFBdUMsSUFBZ0IsRUFBNEIsTUFBaUIsRUFDM0QsV0FBeUI7UUFEM0IsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUE0QixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQzNELGdCQUFXLEdBQVgsV0FBVyxDQUFjO1FBSDFELFdBQU0sR0FBRyxFQUFFLENBQUM7UUFPWixrQkFBYSxHQUFHLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDL0IsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxLQUFLLElBQUksRUFBRTtnQkFDN0MsT0FBTyxDQUFFLENBQUUsSUFBSSxJQUFJLElBQUksQ0FBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBRSxDQUFDO2FBQ3BEO1lBRUQsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBRWxCLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDOUIsU0FBUztpQkFDVjtnQkFFRCxNQUFNLEtBQUssR0FBRyxJ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Q0FBQzt5QkFDeEI7cUJBQ0Y7aUJBRUY7cUJBQ0k7b0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztpQkFDakQ7WUFDSCxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDWCxJQUFJLE9BQU8sYUFBYSxLQUFLLFdBQVcsRUFBRTtvQkFDeEMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN0QjtxQkFDSTtvQkFDSCxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7d0JBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQztxQkFDckM7eUJBQ0k7d0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztxQkFDaEQ7aUJBQ0Y7WUFDSCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQTtRQS9PRCxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDbkMsQ0FBQzs7b0VBTlUsVUFBVSxjQUdELFVBQVUsZUFBbUMsU0FBUyxlQUN0RCxZQUFZO2tEQUpyQixVQUFVLFdBQVYsVUFBVSxtQkFGVCxNQUFNO2tEQUVQLFVBQVU7Y0FIdEIsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COztzQkFJYyxNQUFNO3VCQUFDLFVBQVU7O3NCQUE0QixNQUFNO3VCQUFDLFNBQVM7O3NCQUM3RCxNQUFNO3VCQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge05HWExvZ2dlcn0gZnJvbSAnbmd4LWxvZ2dlcic7XG5pbXBvcnQge0N0c0NvbnN0YW50c30gZnJvbSAnLi9jdHMtY29uc3RhbnRzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQ3RzU2VydmljZSB7XG4gIHByaXZhdGUgYXBpVXJsID0gJyc7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChIdHRwQ2xpZW50KSBwdWJsaWMgaHR0cDogSHR0cENsaWVudCwgQEluamVjdChOR1hMb2dnZXIpIHB1YmxpYyBsb2dnZXI6IE5HWExvZ2dlcixcbiAgICAgICAgICAgICAgQEluamVjdChDdHNDb25zdGFudHMpIHB1YmxpYyBjdHNDb25zdGFudDogQ3RzQ29uc3RhbnRzKSB7XG4gICAgdGhpcy5hcGlVcmwgPSBjdHNDb25zdGFudC5hcGlVcmw7XG4gIH1cblxuICBwcml2YXRlIHNlcmlhbGl6ZURhdGEgPSAoZGF0YSkgPT4ge1xuICAgIGlmICh0eXBlb2YgZGF0YSAhPT0gJ29iamVjdCcgJiYgZGF0YSAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuICggKCBkYXRhID09IG51bGwgKSA/ICcnIDogZGF0YS50b1N0cmluZygpICk7XG4gICAgfVxuXG4gICAgY29uc3QgYnVmZmVyID0gW107XG5cbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gZGF0YSkge1xuICAgICAgaWYgKCFkYXRhLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB2YWx1ZSA9IGRhdGFbbmFtZV07XG4gICAgICBidWZmZXIucHVzaChlbmNvZGVVUklDb21wb25lbnQobmFtZSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQoKCB2YWx1ZSA9PSBudWxsICkgPyAnJyA6IHZhbHVlKSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc291cmNlID0gYnVmZmVyLmpvaW4oJyYnKS5yZXBsYWNlKC8lMjAvZywgJysnKTtcblxuICAgIHJldHVybiAoc291cmNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjb252ZXJ0cyB0aGUgZ2l2ZW4gTW9sZWN1bGUgdG8gYW4gSW5DaEkgS2V5XG4gICAqL1xuICBjb252ZXJ0VG9JbmNoaUtleSA9ICAobW9sZWN1bGUsIGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSA9PiB7XG4gICAgY29uc3Qgc2VyaWFsaXplZE1vbGVjdWxlID0gdGhpcy5zZXJpYWxpemVEYXRhKG1vbGVjdWxlKTtcbiAgICB0aGlzLmh0dHAucG9zdChgJHt0aGlzLmFwaVVybH0vc2VydmljZS9tb2x0b2luY2hpYCwge21vbDogc2VyaWFsaXplZE1vbGVjdWxlfSxcbiAgICAgIHtoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9dXRmLTgnfX0pLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcbiAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdyZWNlaXZlZDogJyArIHJlcyk7XG4gICAgICBpZiAodHlwZW9mIHJlcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXMuZXJyb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2socmVzLmVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGVsc2UgaWYgKHJlcy5pbmNoaWtleSkge1xuICAgICAgICAgICBpZiAocmVzLmluY2hpa2V5ID09PSAnJykge1xuICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICB9XG4gICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgIGNhbGxiYWNrKHJlcyk7XG4gICAgICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1Zygnbm8gZGF0YSBvYmplY3QgaXMgZGVmaW5lZCEnKTtcbiAgICAgIH1cbiAgICB9fSwgKGVycm9yKSA9PiB7XG4gICAgICBpZiAoZXJyb3JDYWxsYmFjaykge1xuICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ2Vycm9yOiAnICsgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ25vIGVycm9yIG1lc3NhZ2UgcHJvdmlkZWQhJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjb252ZXJ0cyBhbiBJbkNoSSBLZXkgdG8gYSBtb2xlY3VsZVxuICAgKi9cbiAgY29udmVydEluY2hpS2V5VG9Nb2wgPSAoaW5jaGlLZXksIGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSA9PiB7XG4gICAgdGhpcy5odHRwLmdldChgJHt0aGlzLmFwaVVybH0vc2VydmljZS9pbmNoaWtleXRvbW9sLyR7aW5jaGlLZXl9YCkuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiByZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmIChyZXMuZXJyb3IgIT09ICcnKSB7XG4gICAgICAgICAgaWYgKGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2socmVzLmVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZXMubW9sZWN1bGUpIHtcbiAgICAgICAgICBpZiAocmVzLm1vbGVjdWxlID09PSAnJyB8fCByZXMubW9sZWN1bGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlcy5tb2xlY3VsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgIGlmIChlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2FybignZXJyb3I6ICcgKyBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2Fybignbm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCEnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHV0aWxpemVzIGNoZW1zcGlkZXIgdG8gY29udmVydCBmcm9tIGEgc21pbGVzIHRvIGFuIGluY2hpXG4gICAqL1xuICBjb252ZXJ0U21pbGVUb0luQ2hJQ29kZSA9ICAoc21pbGVzLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHNlcmlhbGl6ZWRTbWlsZXMgPSB0aGlzLnNlcmlhbGl6ZURhdGEoc21pbGVzKTtcbiAgICB0aGlzLmh0dHAucG9zdChgJHt0aGlzLmFwaVVybH0vc2VydmljZS9zbWlsZXRvaW5jaGlgLCB7c21pbGVzOiBzZXJpYWxpemVkU21pbGVzLnRyaW0oKX0sXG4gICAgICB7aGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PXV0Zi04J319KS5zdWJzY3JpYmUoKHJlczogYW55KSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmICh0eXBlb2YgcmVzLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBlcnJvckNhbGxiYWNrICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICBlcnJvckNhbGxiYWNrKHJlcy5lcnJvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy5sb2dnZXIud2Fybignbm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgcmVzLmluY2hpa2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHJlcy5pbmNoaWtleSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2socmVzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ25vIGRhdGEgb2JqZWN0IGlkIGRlZmluZWQhJyk7XG4gICAgICAgIH1cbiAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgZXJyb3JDYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdlcnJvcjogJyArIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogY29udmVydHMgYW4gaW5jaGkgY29kZSB0byBhbiBpbmNoaSBrZXnDn1xuICAgKi9cbiAgY29udmVydEluQ2hJQ29kZVRvS2V5ID0gKGluY2hpQ29kZSwgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spID0+IHtcbiAgICBjb25zdCBzZXJpYWxpemVkSW5jaGlDb2RlID0gdGhpcy5zZXJpYWxpemVEYXRhKGluY2hpQ29kZSk7XG4gICAgdGhpcy5odHRwLnBvc3QoYCR7dGhpcy5hcGlVcmx9L3NlcnZpY2UvaW5jaGljb2RldG9pbmNoaWtleWAsIHtpbmNoaWNvZGU6IHNlcmlhbGl6ZWRJbmNoaUNvZGV9LFxuICAgICAge2hlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD11dGYtOCd9fSlcbiAgICAuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xuXG4gICAgICBpZiAodHlwZW9mIHJlcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXMuZXJyb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBlcnJvckNhbGxiYWNrICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhyZXMuZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ25vIGVycm9yIG1lc3NhZ2UgcHJvdmlkZWQhJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHR5cGVvZiByZXMuaW5jaGlrZXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKHJlcy5pbmNoaWtleSA9PT0gJycpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlcy5pbmNoaWtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1Zygnbm8gZGF0YSBvYmplY3QgaXMgZGVmaW5lZCEnKTtcbiAgICAgIH1cbiAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgIGlmICh0eXBlb2YgZXJyb3JDYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGVycm9yICE9PSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2FybignZXJyb3I6ICcgKyBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2Fybignbm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCEnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHByb3ZpZGVzIHVzIHdpdGggdGhlIG1vbGZpbGUgZm9yIHRoaXMga2V5XG4gICAqL1xuICBjb252ZXJ0SW5DaElDb2RlVG9Nb2wgPSAoaW5jaGlDb2RlLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHNlcmlhbGl6ZWRJbmNoaUNvZGUgPSB0aGlzLnNlcmlhbGl6ZURhdGEoaW5jaGlDb2RlKTtcbiAgICByZXR1cm4gdGhpcy5odHRwLnBvc3QoYCR7dGhpcy5hcGlVcmx9L3NlcnZpY2UvaW5jaGl0b21vbGAsIHsgaW5jaGljb2RlOiBzZXJpYWxpemVkSW5jaGlDb2RlIH0sXG4gICAgICB7aGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PXV0Zi04J319KVxuICAgICAgLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiByZXMuZXJyb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGVycm9yQ2FsbGJhY2sgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2socmVzLmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgcmVzLm1vbGVjdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHJlcy5tb2xlY3VsZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2socmVzLm1vbGVjdWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1Zygnbm8gZGF0YSBvYmplY3QgaXMgZGVmaW5lZCEnKTtcbiAgICAgICAgfVxuICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgZXJyb3JDYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybignZXJyb3I6ICcgKyBlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2Fybignbm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCEnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==