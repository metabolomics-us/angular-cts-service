import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { CtsConstantTokenService } from './cts-constant-token.service';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "ngx-logger";
export class ChemifyService {
    constructor(http, logger, config) {
        this.http = http;
        this.logger = logger;
        this.config = config;
        this.apiUrl = config.apiUrl;
    }
    /**
     * converts the given name to an InChI Key
     */
    nameToInChIKey(chemicalName, callback, errorCallback) {
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
ChemifyService.ɵfac = function ChemifyService_Factory(t) { return new (t || ChemifyService)(i0.ɵɵinject(HttpClient), i0.ɵɵinject(NGXLogger), i0.ɵɵinject(CtsConstantTokenService)); };
ChemifyService.ɵprov = i0.ɵɵdefineInjectable({ token: ChemifyService, factory: ChemifyService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ChemifyService, [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlbWlmeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL25vbGFuL0RldmVsb3BtZW50L21vbmEtc2VydmljZXMvYW5ndWxhci1jdHMtc2VydmljZS9wcm9qZWN0cy9jdHMtbGliL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jaGVtaWZ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDckMsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sOEJBQThCLENBQUM7Ozs7QUFNckUsTUFBTSxPQUFPLGNBQWM7SUFFekIsWUFBdUMsSUFBZ0IsRUFBNEIsTUFBaUIsRUFDaEQsTUFBbUI7UUFEaEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUE0QixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2hELFdBQU0sR0FBTixNQUFNLENBQWE7UUFDckUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBQzlCLENBQUM7SUFFRDs7T0FFRztJQUNILGNBQWMsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLGFBQWE7UUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSwwQkFBMEIsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUM7YUFDN0UsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDakIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO1lBRWxCLElBQUksT0FBTyxHQUFHLEtBQUssV0FBVyxFQUFFO2dCQUM5QixNQUFNLElBQUksR0FBRyxHQUFHLENBQUM7Z0JBQ2pCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTt3QkFDbkIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN2QixJQUFJLE9BQU8sTUFBTSxDQUFDLE1BQU0sS0FBSyxXQUFXLEVBQUU7NEJBQ3hDLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxlQUFlLEVBQUU7Z0NBQ3JDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs2QkFDaEI7aUNBQ0k7Z0NBQ0gsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQzs2QkFDekI7eUJBQ0Y7cUJBQ0Y7aUJBQ0Y7YUFDRjtRQUNILENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ2IsSUFBSSxhQUFhLEVBQUU7Z0JBQ2pCLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUN0QjtpQkFDSTtnQkFDSCxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQztpQkFDckM7cUJBQ0k7b0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztpQkFDaEQ7YUFDRjtRQUNELENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7NEVBNUNVLGNBQWMsY0FFTCxVQUFVLGVBQW1DLFNBQVMsZUFDdEQsdUJBQXVCO3NEQUhoQyxjQUFjLFdBQWQsY0FBYyxtQkFGYixNQUFNO2tEQUVQLGNBQWM7Y0FIMUIsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COztzQkFHYyxNQUFNO3VCQUFDLFVBQVU7O3NCQUE0QixNQUFNO3VCQUFDLFNBQVM7O3NCQUM3RCxNQUFNO3VCQUFDLHVCQUF1QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtOR1hMb2dnZXJ9IGZyb20gJ25neC1sb2dnZXInO1xuaW1wb3J0IHtDdHNDb25zdGFudFRva2VuU2VydmljZX0gZnJvbSAnLi9jdHMtY29uc3RhbnQtdG9rZW4uc2VydmljZSc7XG5pbXBvcnQge0N0c0NvbnN0YW50fSBmcm9tICcuL2N0cy1jb25zdGFudCc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENoZW1pZnlTZXJ2aWNle1xuICBhcGlVcmw7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoSHR0cENsaWVudCkgcHVibGljIGh0dHA6IEh0dHBDbGllbnQsIEBJbmplY3QoTkdYTG9nZ2VyKSBwdWJsaWMgbG9nZ2VyOiBOR1hMb2dnZXIsXG4gICAgICAgICAgICAgIEBJbmplY3QoQ3RzQ29uc3RhbnRUb2tlblNlcnZpY2UpIHB1YmxpYyBjb25maWc6IEN0c0NvbnN0YW50KSB7XG4gICAgdGhpcy5hcGlVcmwgPSBjb25maWcuYXBpVXJsO1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbnZlcnRzIHRoZSBnaXZlbiBuYW1lIHRvIGFuIEluQ2hJIEtleVxuICAgKi9cbiAgbmFtZVRvSW5DaElLZXkoY2hlbWljYWxOYW1lLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjayk6IHZvaWR7XG4gICAgdGhpcy5odHRwLmdldChgJHt0aGlzLmFwaVVybH0vY2hlbWlmeS9yZXN0L2lkZW50aWZ5LyR7ZW5jb2RlVVJJKGNoZW1pY2FsTmFtZSl9YClcbiAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAnJztcblxuICAgICAgICBpZiAodHlwZW9mIHJlcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gcmVzO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHRvcEhpdCA9IGRhdGFbMF07XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgdG9wSGl0LnJlc3VsdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAodG9wSGl0LnJlc3VsdCA9PT0gJ25vdGhpbmcgZm91bmQnKSB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjayh0b3BIaXQucmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgaWYgKGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdlcnJvcjogJyArIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB9KTtcbiAgfVxufVxuIl19