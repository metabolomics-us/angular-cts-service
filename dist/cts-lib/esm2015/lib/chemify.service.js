import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import { CtsConstants } from './cts-constants';
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "ngx-logger";
import * as i3 from "./cts-constants";
export class ChemifyService {
    constructor(http, logger, ctsConstants) {
        this.http = http;
        this.logger = logger;
        this.ctsConstants = ctsConstants;
        this.apiUrl = '';
        /**
         * converts the given name to an InChI Key
         */
        this.nameToInChIKey = (chemicalName, callback, errorCallback) => {
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
        };
        this.apiUrl = ctsConstants.apiUrl;
    }
}
ChemifyService.ɵfac = function ChemifyService_Factory(t) { return new (t || ChemifyService)(i0.ɵɵinject(HttpClient), i0.ɵɵinject(NGXLogger), i0.ɵɵinject(CtsConstants)); };
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
            }] }, { type: i3.CtsConstants, decorators: [{
                type: Inject,
                args: [CtsConstants]
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlbWlmeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL25vbGFuL0RldmVsb3BtZW50L21vbmEtc2VydmljZXMvYW5ndWxhci1jdHMtc2VydmljZS9wcm9qZWN0cy9jdHMtbGliL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jaGVtaWZ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDckMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7OztBQUs3QyxNQUFNLE9BQU8sY0FBYztJQUV6QixZQUF1QyxJQUFnQixFQUE0QixNQUFpQixFQUMzRCxZQUEwQjtRQUQ1QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQTRCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDM0QsaUJBQVksR0FBWixZQUFZLENBQWM7UUFGM0QsV0FBTSxHQUFHLEVBQUUsQ0FBQztRQU1wQjs7V0FFRztRQUNILG1CQUFjLEdBQUcsQ0FBQyxZQUFZLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxFQUFFO1lBRXpELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sMEJBQTBCLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO2lCQUM3RSxTQUFTLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDakIsTUFBTSxNQUFNLEdBQUcsRUFBRSxDQUFDO2dCQUVsQixJQUFJLE9BQU8sR0FBRyxLQUFLLFdBQVcsRUFBRTtvQkFDOUIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDO29CQUNqQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQ3ZCLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7NEJBQ25CLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzs0QkFDdkIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxNQUFNLEtBQUssV0FBVyxFQUFFO2dDQUN4QyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssZUFBZSxFQUFFO29DQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7aUNBQ2hCO3FDQUNJO29DQUNILFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7aUNBQ3pCOzZCQUNGO3lCQUNGO3FCQUNGO2lCQUNGO1lBQ0gsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ2IsSUFBSSxhQUFhLEVBQUU7b0JBQ2pCLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDdEI7cUJBQ0k7b0JBQ0gsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO3dCQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7cUJBQ3JDO3lCQUNJO3dCQUNILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7cUJBQ2hEO2lCQUNGO1lBQ0QsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUE7UUF6Q0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDO0lBQ3BDLENBQUM7OzRFQUxVLGNBQWMsY0FFTCxVQUFVLGVBQW1DLFNBQVMsZUFDdEQsWUFBWTtzREFIckIsY0FBYyxXQUFkLGNBQWMsbUJBRmIsTUFBTTtrREFFUCxjQUFjO2NBSDFCLFVBQVU7ZUFBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7c0JBR2MsTUFBTTt1QkFBQyxVQUFVOztzQkFBNEIsTUFBTTt1QkFBQyxTQUFTOztzQkFDN0QsTUFBTTt1QkFBQyxZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtJbmplY3QsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge05HWExvZ2dlcn0gZnJvbSAnbmd4LWxvZ2dlcic7XG5pbXBvcnQge0N0c0NvbnN0YW50c30gZnJvbSAnLi9jdHMtY29uc3RhbnRzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQ2hlbWlmeVNlcnZpY2V7XG4gIHByaXZhdGUgYXBpVXJsID0gJyc7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoSHR0cENsaWVudCkgcHVibGljIGh0dHA6IEh0dHBDbGllbnQsIEBJbmplY3QoTkdYTG9nZ2VyKSBwdWJsaWMgbG9nZ2VyOiBOR1hMb2dnZXIsXG4gICAgICAgICAgICAgIEBJbmplY3QoQ3RzQ29uc3RhbnRzKSBwdWJsaWMgY3RzQ29uc3RhbnRzOiBDdHNDb25zdGFudHMpIHtcbiAgICB0aGlzLmFwaVVybCA9IGN0c0NvbnN0YW50cy5hcGlVcmw7XG4gIH1cblxuICAvKipcbiAgICogY29udmVydHMgdGhlIGdpdmVuIG5hbWUgdG8gYW4gSW5DaEkgS2V5XG4gICAqL1xuICBuYW1lVG9JbkNoSUtleSA9IChjaGVtaWNhbE5hbWUsIGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrKSA9PiB7XG5cbiAgICB0aGlzLmh0dHAuZ2V0KGAke3RoaXMuYXBpVXJsfS9jaGVtaWZ5L3Jlc3QvaWRlbnRpZnkvJHtlbmNvZGVVUkkoY2hlbWljYWxOYW1lKX1gKVxuICAgICAgLnN1YnNjcmliZSgocmVzKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9ICcnO1xuXG4gICAgICAgIGlmICh0eXBlb2YgcmVzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXM7XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgY29uc3QgdG9wSGl0ID0gZGF0YVswXTtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0b3BIaXQucmVzdWx0ICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIGlmICh0b3BIaXQucmVzdWx0ID09PSAnbm90aGluZyBmb3VuZCcpIHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKG51bGwpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIGNhbGxiYWNrKHRvcEhpdC5yZXN1bHQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSwgKGVycm9yKSA9PiB7XG4gICAgICBpZiAoZXJyb3JDYWxsYmFjaykge1xuICAgICAgICBlcnJvckNhbGxiYWNrKGVycm9yKTtcbiAgICAgIH1cbiAgICAgIGVsc2Uge1xuICAgICAgICBpZiAoZXJyb3IgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ2Vycm9yOiAnICsgZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHRoaXMubG9nZ2VyLndhcm4oJ25vIGVycm9yIG1lc3NhZ2UgcHJvdmlkZWQhJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIH0pO1xuICB9XG59XG4iXX0=