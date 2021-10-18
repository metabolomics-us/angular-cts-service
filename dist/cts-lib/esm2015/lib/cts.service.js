import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { CtsConstants } from './cts-constants';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "ngx-logger";
export class CtsService {
    constructor(http, logger) {
        this.http = http;
        this.logger = logger;
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
            this.http.post(`${CtsConstants.apiUrl}/service/moltoinchi`, { mol: serializedMolecule }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } }).subscribe((res) => {
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
            this.http.get(`${CtsConstants.apiUrl}/service/inchikeytomol/${inchiKey}`).subscribe((res) => {
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
            this.http.post(`${CtsConstants.apiUrl}/service/smiletoinchi`, { smiles: serializedSmiles.trim() }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } }).subscribe((res) => {
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
            this.http.post(`${CtsConstants.apiUrl}/service/inchicodetoinchikey`, { inchicode: serializedInchiCode }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } })
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
            return this.http.post(`${CtsConstants.apiUrl}/service/inchitomol`, { inchicode: serializedInchiCode }, { headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8' } })
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3RzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvbm9sYW4vRGV2ZWxvcG1lbnQvbW9uYS1zZXJ2aWNlcy9hbmd1bGFyLWN0cy1zZXJ2aWNlL3Byb2plY3RzL2N0cy1saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL2N0cy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sWUFBWSxDQUFDO0FBQ3JDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQzs7OztBQUs3QyxNQUFNLE9BQU8sVUFBVTtJQUVyQixZQUF3QyxJQUFnQixFQUE2QixNQUFpQjtRQUE5RCxTQUFJLEdBQUosSUFBSSxDQUFZO1FBQTZCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFFOUYsa0JBQWEsR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQy9CLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksS0FBSyxJQUFJLEVBQUU7Z0JBQzdDLE9BQU8sQ0FBRSxDQUFFLElBQUksSUFBSSxJQUFJLENBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUUsQ0FBQzthQUNwRDtZQUVELE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUVsQixLQUFLLE1BQU0sSUFBSSxJQUFJLElBQUksRUFBRTtnQkFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQzlCLFNBQVM7aUJBQ1Y7Z0JBRUQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElB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LDRCQUE0QixDQUFDLENBQUM7aUJBQ2pEO1lBQ0gsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ1gsSUFBSSxPQUFPLGFBQWEsS0FBSyxXQUFXLEVBQUU7b0JBQ3hDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDdEI7cUJBQ0k7b0JBQ0gsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO3dCQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7cUJBQ3JDO3lCQUNJO3dCQUNILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7cUJBQ2hEO2lCQUNGO1lBQ0gsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUE7SUE5T3VHLENBQUM7O29FQUZoRyxVQUFVLGNBRUQsVUFBVSxlQUFvQyxTQUFTO2tEQUZoRSxVQUFVLFdBQVYsVUFBVSxtQkFGVCxNQUFNO2tEQUVQLFVBQVU7Y0FIdEIsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COztzQkFHYyxNQUFNO3VCQUFDLFVBQVU7O3NCQUE2QixNQUFNO3VCQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7TkdYTG9nZ2VyfSBmcm9tICduZ3gtbG9nZ2VyJztcbmltcG9ydCB7Q3RzQ29uc3RhbnRzfSBmcm9tICcuL2N0cy1jb25zdGFudHMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBDdHNTZXJ2aWNlIHtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0KEh0dHBDbGllbnQpIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgQEluamVjdChOR1hMb2dnZXIpIHByaXZhdGUgbG9nZ2VyOiBOR1hMb2dnZXIpIHsgfVxuXG4gIHByaXZhdGUgc2VyaWFsaXplRGF0YSA9IChkYXRhKSA9PiB7XG4gICAgaWYgKHR5cGVvZiBkYXRhICE9PSAnb2JqZWN0JyAmJiBkYXRhICE9PSBudWxsKSB7XG4gICAgICByZXR1cm4gKCAoIGRhdGEgPT0gbnVsbCApID8gJycgOiBkYXRhLnRvU3RyaW5nKCkgKTtcbiAgICB9XG5cbiAgICBjb25zdCBidWZmZXIgPSBbXTtcblxuICAgIGZvciAoY29uc3QgbmFtZSBpbiBkYXRhKSB7XG4gICAgICBpZiAoIWRhdGEuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHZhbHVlID0gZGF0YVtuYW1lXTtcbiAgICAgIGJ1ZmZlci5wdXNoKGVuY29kZVVSSUNvbXBvbmVudChuYW1lKSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCgoIHZhbHVlID09IG51bGwgKSA/ICcnIDogdmFsdWUpKTtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2UgPSBidWZmZXIuam9pbignJicpLnJlcGxhY2UoLyUyMC9nLCAnKycpO1xuXG4gICAgcmV0dXJuIChzb3VyY2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbnZlcnRzIHRoZSBnaXZlbiBNb2xlY3VsZSB0byBhbiBJbkNoSSBLZXlcbiAgICovXG4gIGNvbnZlcnRUb0luY2hpS2V5ID0gIChtb2xlY3VsZSwgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spID0+IHtcbiAgICBjb25zdCBzZXJpYWxpemVkTW9sZWN1bGUgPSB0aGlzLnNlcmlhbGl6ZURhdGEobW9sZWN1bGUpO1xuICAgIHRoaXMuaHR0cC5wb3N0KGAke0N0c0NvbnN0YW50cy5hcGlVcmx9L3NlcnZpY2UvbW9sdG9pbmNoaWAsIHttb2w6IHNlcmlhbGl6ZWRNb2xlY3VsZX0sXG4gICAgICB7aGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PXV0Zi04J319KS5zdWJzY3JpYmUoKHJlczogYW55KSA9PiB7XG4gICAgICB0aGlzLmxvZ2dlci5kZWJ1ZygncmVjZWl2ZWQ6ICcgKyByZXMpO1xuICAgICAgaWYgKHR5cGVvZiByZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmIChlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgICAgICBlcnJvckNhbGxiYWNrKHJlcy5lcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2Fybignbm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCEnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIGlmIChyZXMuaW5jaGlrZXkpIHtcbiAgICAgICAgICAgaWYgKHJlcy5pbmNoaWtleSA9PT0gJycpIHtcbiAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgfVxuICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICBjYWxsYmFjayhyZXMpO1xuICAgICAgICAgICB9XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ25vIGRhdGEgb2JqZWN0IGlzIGRlZmluZWQhJyk7XG4gICAgICB9XG4gICAgfX0sIChlcnJvcikgPT4ge1xuICAgICAgaWYgKGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdlcnJvcjogJyArIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogY29udmVydHMgYW4gSW5DaEkgS2V5IHRvIGEgbW9sZWN1bGVcbiAgICovXG4gIGNvbnZlcnRJbmNoaUtleVRvTW9sID0gKGluY2hpS2V5LCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykgPT4ge1xuICAgIHRoaXMuaHR0cC5nZXQoYCR7Q3RzQ29uc3RhbnRzLmFwaVVybH0vc2VydmljZS9pbmNoaWtleXRvbW9sLyR7aW5jaGlLZXl9YCkuc3Vic2NyaWJlKChyZXM6IGFueSkgPT4ge1xuICAgICAgaWYgKHR5cGVvZiByZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmIChyZXMuZXJyb3IgIT09ICcnKSB7XG4gICAgICAgICAgaWYgKGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2socmVzLmVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmIChyZXMubW9sZWN1bGUpIHtcbiAgICAgICAgICBpZiAocmVzLm1vbGVjdWxlID09PSAnJyB8fCByZXMubW9sZWN1bGUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIGNhbGxiYWNrKHJlcy5tb2xlY3VsZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgIH1cbiAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgIGlmIChlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2FybignZXJyb3I6ICcgKyBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2Fybignbm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCEnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHV0aWxpemVzIGNoZW1zcGlkZXIgdG8gY29udmVydCBmcm9tIGEgc21pbGVzIHRvIGFuIGluY2hpXG4gICAqL1xuICBjb252ZXJ0U21pbGVUb0luQ2hJQ29kZSA9ICAoc21pbGVzLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHNlcmlhbGl6ZWRTbWlsZXMgPSB0aGlzLnNlcmlhbGl6ZURhdGEoc21pbGVzKTtcbiAgICB0aGlzLmh0dHAucG9zdChgJHtDdHNDb25zdGFudHMuYXBpVXJsfS9zZXJ2aWNlL3NtaWxldG9pbmNoaWAsIHtzbWlsZXM6IHNlcmlhbGl6ZWRTbWlsZXMudHJpbSgpfSxcbiAgICAgIHtoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9dXRmLTgnfX0pLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiByZXMuZXJyb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGVycm9yQ2FsbGJhY2sgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2socmVzLmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKHR5cGVvZiByZXMuaW5jaGlrZXkgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAocmVzLmluY2hpa2V5ID09PSAnJykge1xuICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICBjYWxsYmFjayhyZXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1Zygnbm8gZGF0YSBvYmplY3QgaWQgZGVmaW5lZCEnKTtcbiAgICAgICAgfVxuICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBlcnJvckNhbGxiYWNrICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ2Vycm9yOiAnICsgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ25vIGVycm9yIG1lc3NhZ2UgcHJvdmlkZWQhJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjb252ZXJ0cyBhbiBpbmNoaSBjb2RlIHRvIGFuIGluY2hpIGtlecOfXG4gICAqL1xuICBjb252ZXJ0SW5DaElDb2RlVG9LZXkgPSAoaW5jaGlDb2RlLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykgPT4ge1xuICAgIGNvbnN0IHNlcmlhbGl6ZWRJbmNoaUNvZGUgPSB0aGlzLnNlcmlhbGl6ZURhdGEoaW5jaGlDb2RlKTtcbiAgICB0aGlzLmh0dHAucG9zdChgJHtDdHNDb25zdGFudHMuYXBpVXJsfS9zZXJ2aWNlL2luY2hpY29kZXRvaW5jaGlrZXlgLCB7aW5jaGljb2RlOiBzZXJpYWxpemVkSW5jaGlDb2RlfSxcbiAgICAgIHtoZWFkZXJzOiB7J0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7IGNoYXJzZXQ9dXRmLTgnfX0pXG4gICAgLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcblxuICAgICAgaWYgKHR5cGVvZiByZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGlmICh0eXBlb2YgcmVzLmVycm9yICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmICh0eXBlb2YgZXJyb3JDYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgIGVycm9yQ2FsbGJhY2socmVzLmVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIScpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIGlmICh0eXBlb2YgcmVzLmluY2hpa2V5ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGlmIChyZXMuaW5jaGlrZXkgPT09ICcnKSB7XG4gICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjYWxsYmFjayhyZXMuaW5jaGlrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgdGhpcy5sb2dnZXIuZGVidWcoJ25vIGRhdGEgb2JqZWN0IGlzIGRlZmluZWQhJyk7XG4gICAgICB9XG4gICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICBpZiAodHlwZW9mIGVycm9yQ2FsbGJhY2sgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChlcnJvciAhPT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ2Vycm9yOiAnICsgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ25vIGVycm9yIG1lc3NhZ2UgcHJvdmlkZWQhJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBwcm92aWRlcyB1cyB3aXRoIHRoZSBtb2xmaWxlIGZvciB0aGlzIGtleVxuICAgKi9cbiAgY29udmVydEluQ2hJQ29kZVRvTW9sID0gKGluY2hpQ29kZSwgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spID0+IHtcbiAgICBjb25zdCBzZXJpYWxpemVkSW5jaGlDb2RlID0gdGhpcy5zZXJpYWxpemVEYXRhKGluY2hpQ29kZSk7XG4gICAgcmV0dXJuIHRoaXMuaHR0cC5wb3N0KGAke0N0c0NvbnN0YW50cy5hcGlVcmx9L3NlcnZpY2UvaW5jaGl0b21vbGAsIHsgaW5jaGljb2RlOiBzZXJpYWxpemVkSW5jaGlDb2RlIH0sXG4gICAgICB7aGVhZGVyczogeydDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkOyBjaGFyc2V0PXV0Zi04J319KVxuICAgICAgLnN1YnNjcmliZSgocmVzOiBhbnkpID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiByZXMuZXJyb3IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGVycm9yQ2FsbGJhY2sgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgIGVycm9yQ2FsbGJhY2socmVzLmVycm9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIScpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmICh0eXBlb2YgcmVzLm1vbGVjdWxlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgaWYgKHJlcy5tb2xlY3VsZSA9PT0gJycpIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgY2FsbGJhY2socmVzLm1vbGVjdWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5kZWJ1Zygnbm8gZGF0YSBvYmplY3QgaXMgZGVmaW5lZCEnKTtcbiAgICAgICAgfVxuICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgZXJyb3JDYWxsYmFjayAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2FybignZXJyb3I6ICcgKyBlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5sb2dnZXIud2Fybignbm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCEnKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==