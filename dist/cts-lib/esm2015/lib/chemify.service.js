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
        logger.info(this.apiUrl);
        logger.info(this.config.apiUrl);
    }
    /**
     * converts the given name to an InChI Key
     */
    nameToInChIKey(chemicalName, callback, errorCallback) {
        this.logger.info(this.apiUrl);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlbWlmeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL25vbGFuL0RldmVsb3BtZW50L21vbmEtc2VydmljZXMvYW5ndWxhci1jdHMtc2VydmljZS9wcm9qZWN0cy9jdHMtbGliL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jaGVtaWZ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDckMsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sOEJBQThCLENBQUM7Ozs7QUFNckUsTUFBTSxPQUFPLGNBQWM7SUFFekIsWUFBdUMsSUFBZ0IsRUFBNEIsTUFBaUIsRUFDaEQsTUFBbUI7UUFEaEMsU0FBSSxHQUFKLElBQUksQ0FBWTtRQUE0QixXQUFNLEdBQU4sTUFBTSxDQUFXO1FBQ2hELFdBQU0sR0FBTixNQUFNLENBQWE7UUFDckUsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxjQUFjLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxhQUFhO1FBQ2xELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLDBCQUEwQixTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQzthQUM3RSxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNqQixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7WUFFbEIsSUFBSSxPQUFPLEdBQUcsS0FBSyxXQUFXLEVBQUU7Z0JBQzlCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQztnQkFDakIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO3dCQUNuQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3ZCLElBQUksT0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLFdBQVcsRUFBRTs0QkFDeEMsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLGVBQWUsRUFBRTtnQ0FDckMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzZCQUNoQjtpQ0FDSTtnQ0FDSCxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDOzZCQUN6Qjt5QkFDRjtxQkFDRjtpQkFDRjthQUNGO1FBQ0gsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7WUFDYixJQUFJLGFBQWEsRUFBRTtnQkFDakIsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3RCO2lCQUNJO2dCQUNILElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtvQkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDO2lCQUNyQztxQkFDSTtvQkFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO2lCQUNoRDthQUNGO1FBQ0QsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs0RUEvQ1UsY0FBYyxjQUVMLFVBQVUsZUFBbUMsU0FBUyxlQUN0RCx1QkFBdUI7c0RBSGhDLGNBQWMsV0FBZCxjQUFjLG1CQUZiLE1BQU07a0RBRVAsY0FBYztjQUgxQixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7O3NCQUdjLE1BQU07dUJBQUMsVUFBVTs7c0JBQTRCLE1BQU07dUJBQUMsU0FBUzs7c0JBQzdELE1BQU07dUJBQUMsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge05HWExvZ2dlcn0gZnJvbSAnbmd4LWxvZ2dlcic7XG5pbXBvcnQge0N0c0NvbnN0YW50VG9rZW5TZXJ2aWNlfSBmcm9tICcuL2N0cy1jb25zdGFudC10b2tlbi5zZXJ2aWNlJztcbmltcG9ydCB7Q3RzQ29uc3RhbnR9IGZyb20gJy4vY3RzLWNvbnN0YW50JztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQ2hlbWlmeVNlcnZpY2V7XG4gIGFwaVVybDtcbiAgY29uc3RydWN0b3IoQEluamVjdChIdHRwQ2xpZW50KSBwdWJsaWMgaHR0cDogSHR0cENsaWVudCwgQEluamVjdChOR1hMb2dnZXIpIHB1YmxpYyBsb2dnZXI6IE5HWExvZ2dlcixcbiAgICAgICAgICAgICAgQEluamVjdChDdHNDb25zdGFudFRva2VuU2VydmljZSkgcHVibGljIGNvbmZpZzogQ3RzQ29uc3RhbnQpIHtcbiAgICB0aGlzLmFwaVVybCA9IGNvbmZpZy5hcGlVcmw7XG4gICAgbG9nZ2VyLmluZm8odGhpcy5hcGlVcmwpO1xuICAgIGxvZ2dlci5pbmZvKHRoaXMuY29uZmlnLmFwaVVybCk7XG4gIH1cblxuICAvKipcbiAgICogY29udmVydHMgdGhlIGdpdmVuIG5hbWUgdG8gYW4gSW5DaEkgS2V5XG4gICAqL1xuICBuYW1lVG9JbkNoSUtleShjaGVtaWNhbE5hbWUsIGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTogdm9pZHtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKHRoaXMuYXBpVXJsKTtcbiAgICB0aGlzLmh0dHAuZ2V0KGAke3RoaXMuYXBpVXJsfS9jaGVtaWZ5L3Jlc3QvaWRlbnRpZnkvJHtlbmNvZGVVUkkoY2hlbWljYWxOYW1lKX1gKVxuICAgICAgLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICcnO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXM7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgY29uc3QgdG9wSGl0ID0gZGF0YVswXTtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0b3BIaXQucmVzdWx0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmICh0b3BIaXQucmVzdWx0ID09PSAnbm90aGluZyBmb3VuZCcpIHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRvcEhpdC5yZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICBpZiAoZXJyb3JDYWxsYmFjaykge1xuICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ2Vycm9yOiAnICsgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ25vIGVycm9yIG1lc3NhZ2UgcHJvdmlkZWQhJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIH0pO1xuICB9XG59XG4iXX0=