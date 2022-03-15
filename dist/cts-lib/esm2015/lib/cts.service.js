import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { CtsConstantTokenService } from './cts-constant-token.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "ngx-logger";
export class CtsService {
    constructor(http, logger, config) {
        this.http = http;
        this.logger = logger;
        this.config = config;
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
        this.apiUrl = config.apiUrl;
    }
    /**
     * converts the given Molecule to an InChI Key
     */
    convertToInchiKey(molecule, callback, errorCallback) {
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
CtsService.ɵfac = function CtsService_Factory(t) { return new (t || CtsService)(i0.ɵɵinject(HttpClient), i0.ɵɵinject(NGXLogger), i0.ɵɵinject(CtsConstantTokenService)); };
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
            }] }, { type: undefined, decorators: [{
                type: Inject,
                args: [CtsConstantTokenService]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3RzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvbm9sYW4vRGV2ZWxvcG1lbnQvbW9uYS1zZXJ2aWNlcy9hbmd1bGFyLWN0cy1zZXJ2aWNlL3Byb2plY3RzL2N0cy1saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL2N0cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFXLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ3JDLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLDhCQUE4QixDQUFDOzs7O0FBTXJFLE1BQU0sT0FBTyxVQUFVO0lBR3JCLFlBQXVDLElBQWdCLEVBQTRCLE1BQWlCLEVBQ2hELE1BQW1CO1FBRGhDLFNBQUksR0FBSixJQUFJLENBQVk7UUFBNEIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNoRCxXQUFNLEdBQU4sTUFBTSxDQUFhO1FBSS9ELGtCQUFhLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMvQixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxJQUFJLEtBQUssSUFBSSxFQUFFO2dCQUM3QyxPQUFPLENBQUUsQ0FBRSxJQUFJLElBQUksSUFBSSxDQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFFLENBQUM7YUFDcEQ7WUFFRCxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFFbEIsS0FBSyxNQUFNLElBQUksSUFBSSxJQUFJLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUM5QixTQUFTO2lCQUNWO2dCQUVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztn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Q0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDWCxJQUFJLE9BQU8sYUFBYSxLQUFLLFdBQVcsRUFBRTtnQkFDeEMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RCO2lCQUNJO2dCQUNILElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtvQkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDO2lCQUNyQztxQkFDSTtvQkFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2lCQUNoRDthQUNGO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztvRUFwUFEsVUFBVSxjQUdELFVBQVUsZUFBbUMsU0FBUyxlQUN0RCx1QkFBdUI7a0RBSmhDLFVBQVUsV0FBVixVQUFVLG1CQUZULE1BQU07a0RBRVAsVUFBVTtjQUh0QixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7O3NCQUljLE1BQU07dUJBQUMsVUFBVTs7c0JBQTRCLE1BQU07dUJBQUMsU0FBUzs7c0JBQzdELE1BQU07dUJBQUMsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGUsIE9wdGlvbmFsfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtOR1hMb2dnZXJ9IGZyb20gJ25neC1sb2dnZXInO1xuaW1wb3J0IHtDdHNDb25zdGFudFRva2VuU2VydmljZX0gZnJvbSAnLi9jdHMtY29uc3RhbnQtdG9rZW4uc2VydmljZSc7XG5pbXBvcnQge0N0c0NvbnN0YW50fSBmcm9tICcuL2N0cy1jb25zdGFudCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEN0c1NlcnZpY2Uge1xuICBhcGlVcmw7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdChIdHRwQ2xpZW50KSBwdWJsaWMgaHR0cDogSHR0cENsaWVudCwgQEluamVjdChOR1hMb2dnZXIpIHB1YmxpYyBsb2dnZXI6IE5HWExvZ2dlcixcbiAgICAgICAgICAgICAgQEluamVjdChDdHNDb25zdGFudFRva2VuU2VydmljZSkgcHVibGljIGNvbmZpZzogQ3RzQ29uc3RhbnQpIHtcbiAgICB0aGlzLmFwaVVybCA9IGNvbmZpZy5hcGlVcmw7XG4gIH1cblxuICBwcml2YXRlIHNlcmlhbGl6ZURhdGEgPSAoZGF0YSkgPT4ge1xuICAgIGlmICh0eXBlb2YgZGF0YSAhPT0gJ29iamVjdCcgJiYgZGF0YSAhPT0gbnVsbCkge1xuICAgICAgcmV0dXJuICggKCBkYXRhID09IG51bGwgKSA/ICcnIDogZGF0YS50b1N0cmluZygpICk7XG4gICAgfVxuXG4gICAgY29uc3QgYnVmZmVyID0gW107XG5cbiAgICBmb3IgKGNvbnN0IG5hbWUgaW4gZGF0YSkge1xuICAgICAgaWYgKCFkYXRhLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB2YWx1ZSA9IGRhdGFbbmFtZV07XG4gICAgICBidWZmZXIucHVzaChlbmNvZGVVUklDb21wb25lbnQobmFtZSkgKyAnPScgKyBlbmNvZGVVUklDb21wb25lbnQoKCB2YWx1ZSA9PSBudWxsICkgPyAnJyA6IHZhbHVlKSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc291cmNlID0gYnVmZmVyLmpvaW4oJyYnKS5yZXBsYWNlKC8lMjAvZywgJysnKTtcblxuICAgIHJldHVybiAoc291cmNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjb252ZXJ0cyB0aGUgZ2l2ZW4gTW9sZWN1bGUgdG8gYW4gSW5DaEkgS2V5XG4gICAqL1xuICBjb252ZXJ0VG9JbmNoaUtleShtb2xlY3VsZSwgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spOiB2b2lkIHtcbiAgICBjb25zdCBzZXJpYWxpemVkTW9sZWN1bGUgPSB0aGlzLnNlcmlhbGl6ZURhdGEobW9sZWN1bGUpO1xuICAgIHRoaXMuaHR0cC5wb3N0KGAke3RoaXMuYXBpVXJsfS9zZXJ2aWNlL21vbHRvaW5jaGlgLCB7bW9sOiBzZXJpYWxpemVkTW9sZWN1bGV9LFxuICAgICAge2hlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD11dGYtOCd9fSkuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xuICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ3JlY2VpdmVkOiAnICsgcmVzKTtcbiAgICAgIGlmICh0eXBlb2YgcmVzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBpZiAodHlwZW9mIHJlcy5lcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAoZXJyb3JDYWxsYmFjaykge1xuICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhyZXMuZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ25vIGVycm9yIG1lc3NhZ2UgcHJvdmlkZWQhJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZWxzZSBpZiAocmVzLmluY2hpa2V5KSB7XG4gICAgICAgICAgIGlmIChyZXMuaW5jaGlrZXkgPT09ICcnKSB7XG4gICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgIH1cbiAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgY2FsbGJhY2socmVzKTtcbiAgICAgICAgICAgfVxuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdubyBkYXRhIG9iamVjdCBpcyBkZWZpbmVkIScpO1xuICAgICAgfVxuICAgIH19LCAoZXJyb3IpID0+IHtcbiAgICAgIGlmIChlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2FybignZXJyb3I6ICcgKyBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2Fybignbm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCEnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbnZlcnRzIGFuIEluQ2hJIEtleSB0byBhIG1vbGVjdWxlXG4gICAqL1xuICBjb252ZXJ0SW5jaGlLZXlUb01vbChpbmNoaUtleSwgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spOiB2b2lkIHtcbiAgICB0aGlzLmh0dHAuZ2V0KGAke3RoaXMuYXBpVXJsfS9zZXJ2aWNlL2luY2hpa2V5dG9tb2wvJHtpbmNoaUtleX1gKS5zdWJzY3JpYmUoKHJlczogYW55KSA9PiB7XG4gICAgICBpZiAodHlwZW9mIHJlcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgaWYgKHJlcy5lcnJvciAhPT0gJycpIHtcbiAgICAgICAgICBpZiAoZXJyb3JDYWxsYmFjaykge1xuICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhyZXMuZXJyb3IpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ25vIGVycm9yIG1lc3NhZ2UgcHJvdmlkZWQhJyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHJlcy5tb2xlY3VsZSkge1xuICAgICAgICAgIGlmIChyZXMubW9sZWN1bGUgPT09ICcnIHx8IHJlcy5tb2xlY3VsZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgY2FsbGJhY2socmVzLm1vbGVjdWxlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgfVxuICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgaWYgKGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdlcnJvcjogJyArIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdXRpbGl6ZXMgY2hlbXNwaWRlciB0byBjb252ZXJ0IGZyb20gYSBzbWlsZXMgdG8gYW4gaW5jaGlcbiAgICovXG4gIGNvbnZlcnRTbWlsZVRvSW5DaElDb2RlKHNtaWxlcywgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spOiB2b2lkIHtcbiAgICBjb25zdCBzZXJpYWxpemVkU21pbGVzID0gdGhpcy5zZXJpYWxpemVEYXRhKHNtaWxlcyk7XG4gICAgdGhpcy5odHRwLnBvc3QoYCR7dGhpcy5hcGlVcmx9L3NlcnZpY2Uvc21pbGV0b2luY2hpYCwge3NtaWxlczogc2VyaWFsaXplZFNtaWxlcy50cmltKCl9LFxuICAgICAge2hlYWRlcnM6IHsnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZDsgY2hhcnNldD11dGYtOCd9fSkuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xuICAgICAgICBpZiAodHlwZW9mIHJlcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBpZiAodHlwZW9mIHJlcy5lcnJvciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3JDYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgZXJyb3JDYWxsYmFjayhyZXMuZXJyb3IpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ25vIGVycm9yIG1lc3NhZ2UgcHJvdmlkZWQnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAodHlwZW9mIHJlcy5pbmNoaWtleSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGlmIChyZXMuaW5jaGlrZXkgPT09ICcnKSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgIGNhbGxiYWNrKHJlcyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLmRlYnVnKCdubyBkYXRhIG9iamVjdCBpZCBkZWZpbmVkIScpO1xuICAgICAgICB9XG4gICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGVycm9yQ2FsbGJhY2sgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2FybignZXJyb3I6ICcgKyBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2Fybignbm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCEnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbnZlcnRzIGFuIGluY2hpIGNvZGUgdG8gYW4gaW5jaGkga2V5w59cbiAgICovXG4gIGNvbnZlcnRJbkNoSUNvZGVUb0tleShpbmNoaUNvZGUsIGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTogdm9pZCB7XG4gICAgY29uc3Qgc2VyaWFsaXplZEluY2hpQ29kZSA9IHRoaXMuc2VyaWFsaXplRGF0YShpbmNoaUNvZGUpO1xuICAgIHRoaXMuaHR0cC5wb3N0KGAke3RoaXMuYXBpVXJsfS9zZXJ2aWNlL2luY2hpY29kZXRvaW5jaGlrZXlgLCB7aW5jaGljb2RlOiBzZXJpYWxpemVkSW5jaGlDb2RlfSxcbiAgICAgIHtoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9dXRmLTgnfX0pXG4gICAgLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcblxuICAgICAgaWYgKHR5cGVvZiByZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3JDYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2socmVzLmVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgcmVzLmluY2hpa2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmIChyZXMuaW5jaGlrZXkgPT09ICcnKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjayhyZXMuaW5jaGlrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ25vIGRhdGEgb2JqZWN0IGlzIGRlZmluZWQhJyk7XG4gICAgICB9XG4gICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGVycm9yQ2FsbGJhY2sgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChlcnJvciAhPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ2Vycm9yOiAnICsgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ25vIGVycm9yIG1lc3NhZ2UgcHJvdmlkZWQhJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwcm92aWRlcyB1cyB3aXRoIHRoZSBtb2xmaWxlIGZvciB0aGlzIGtleVxuICAgKi9cbiAgY29udmVydEluQ2hJQ29kZVRvTW9sKGluY2hpQ29kZSwgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spOiB2b2lkIHtcbiAgICBjb25zdCBzZXJpYWxpemVkSW5jaGlDb2RlID0gdGhpcy5zZXJpYWxpemVEYXRhKGluY2hpQ29kZSk7XG4gICAgdGhpcy5odHRwLnBvc3QoYCR7dGhpcy5hcGlVcmx9L3NlcnZpY2UvaW5jaGl0b21vbGAsIHsgaW5jaGljb2RlOiBzZXJpYWxpemVkSW5jaGlDb2RlIH0sXG4gICAgICB7aGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PXV0Zi04J319KVxuICAgICAgLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiByZXMuZXJyb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGVycm9yQ2FsbGJhY2sgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2socmVzLmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgcmVzLm1vbGVjdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHJlcy5tb2xlY3VsZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2socmVzLm1vbGVjdWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1Zygnbm8gZGF0YSBvYmplY3QgaXMgZGVmaW5lZCEnKTtcbiAgICAgICAgfVxuICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgZXJyb3JDYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybignZXJyb3I6ICcgKyBlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2Fybignbm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCEnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==