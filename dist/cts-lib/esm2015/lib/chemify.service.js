import { Inject, Injectable, Optional } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NGXLogger } from 'ngx-logger';
import * as i0 from "@angular/core";
import * as i1 from "./cts-constants";
import * as i2 from "@angular/common/http";
import * as i3 from "ngx-logger";
export class ChemifyService {
    constructor(http, logger, config) {
        this.http = http;
        this.logger = logger;
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
        if (config) {
            this.apiUrl = config.apiUrl;
        }
    }
}
ChemifyService.ɵfac = function ChemifyService_Factory(t) { return new (t || ChemifyService)(i0.ɵɵinject(HttpClient), i0.ɵɵinject(NGXLogger), i0.ɵɵinject(i1.CtsConstants, 8)); };
ChemifyService.ɵprov = i0.ɵɵdefineInjectable({ token: ChemifyService, factory: ChemifyService.ɵfac, providedIn: 'root' });
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(ChemifyService, [{
        type: Injectable,
        args: [{
                providedIn: 'root'
            }]
    }], function () { return [{ type: i2.HttpClient, decorators: [{
                type: Inject,
                args: [HttpClient]
            }] }, { type: i3.NGXLogger, decorators: [{
                type: Inject,
                args: [NGXLogger]
            }] }, { type: i1.CtsConstants, decorators: [{
                type: Optional
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlbWlmeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL25vbGFuL0RldmVsb3BtZW50L21vbmEtc2VydmljZXMvYW5ndWxhci1jdHMtc2VydmljZS9wcm9qZWN0cy9jdHMtbGliL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jaGVtaWZ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzNELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sWUFBWSxDQUFDOzs7OztBQU1yQyxNQUFNLE9BQU8sY0FBYztJQUV6QixZQUF3QyxJQUFnQixFQUE2QixNQUFpQixFQUM5RSxNQUFxQjtRQURMLFNBQUksR0FBSixJQUFJLENBQVk7UUFBNkIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUQ5RixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBTXBCOztXQUVHO1FBQ0gsbUJBQWMsR0FBRyxDQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsYUFBYSxFQUFFLEVBQUU7WUFFekQsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSwwQkFBMEIsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUM7aUJBQzdFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNqQixNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7Z0JBRWxCLElBQUksT0FBTyxHQUFHLEtBQUssV0FBVyxFQUFFO29CQUM5QixNQUFNLElBQUksR0FBRyxHQUFHLENBQUM7b0JBQ2pCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDdkIsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs0QkFDbkIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUN2QixJQUFJLE9BQU8sTUFBTSxDQUFDLE1BQU0sS0FBSyxXQUFXLEVBQUU7Z0NBQ3hDLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxlQUFlLEVBQUU7b0NBQ3JDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztpQ0FDaEI7cUNBQ0k7b0NBQ0gsUUFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztpQ0FDekI7NkJBQ0Y7eUJBQ0Y7cUJBQ0Y7aUJBQ0Y7WUFDSCxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtnQkFDYixJQUFJLGFBQWEsRUFBRTtvQkFDakIsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUN0QjtxQkFDSTtvQkFDSCxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7d0JBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsQ0FBQztxQkFDckM7eUJBQ0k7d0JBQ0gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsNEJBQTRCLENBQUMsQ0FBQztxQkFDaEQ7aUJBQ0Y7WUFDRCxDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQTtRQXpDQyxJQUFJLE1BQU0sRUFBRTtZQUFFLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztTQUFFO0lBQzlDLENBQUM7OzRFQUxVLGNBQWMsY0FFTCxVQUFVLGVBQW9DLFNBQVM7c0RBRmhFLGNBQWMsV0FBZCxjQUFjLG1CQUZiLE1BQU07a0RBRVAsY0FBYztjQUgxQixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7O3NCQUdjLE1BQU07dUJBQUMsVUFBVTs7c0JBQTZCLE1BQU07dUJBQUMsU0FBUzs7c0JBQzlELFFBQVEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWx9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge05HWExvZ2dlcn0gZnJvbSAnbmd4LWxvZ2dlcic7XG5pbXBvcnQge0N0c0NvbnN0YW50c30gZnJvbSAnLi9jdHMtY29uc3RhbnRzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgQ2hlbWlmeVNlcnZpY2V7XG4gIHByaXZhdGUgYXBpVXJsID0gJyc7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoSHR0cENsaWVudCkgcHJpdmF0ZSBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KE5HWExvZ2dlcikgcHJpdmF0ZSBsb2dnZXI6IE5HWExvZ2dlcixcbiAgICAgICAgICAgICAgQE9wdGlvbmFsKCkgY29uZmlnPzogQ3RzQ29uc3RhbnRzKSB7XG4gICAgaWYgKGNvbmZpZykgeyB0aGlzLmFwaVVybCA9IGNvbmZpZy5hcGlVcmw7IH1cbiAgfVxuXG4gIC8qKlxuICAgKiBjb252ZXJ0cyB0aGUgZ2l2ZW4gbmFtZSB0byBhbiBJbkNoSSBLZXlcbiAgICovXG4gIG5hbWVUb0luQ2hJS2V5ID0gKGNoZW1pY2FsTmFtZSwgY2FsbGJhY2ssIGVycm9yQ2FsbGJhY2spID0+IHtcblxuICAgIHRoaXMuaHR0cC5nZXQoYCR7dGhpcy5hcGlVcmx9L2NoZW1pZnkvcmVzdC9pZGVudGlmeS8ke2VuY29kZVVSSShjaGVtaWNhbE5hbWUpfWApXG4gICAgICAuc3Vic2NyaWJlKChyZXMpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gJyc7XG5cbiAgICAgICAgaWYgKHR5cGVvZiByZXMgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgY29uc3QgZGF0YSA9IHJlcztcbiAgICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShkYXRhKSkge1xuICAgICAgICAgICAgaWYgKGRhdGEubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICBjb25zdCB0b3BIaXQgPSBkYXRhWzBdO1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHRvcEhpdC5yZXN1bHQgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRvcEhpdC5yZXN1bHQgPT09ICdub3RoaW5nIGZvdW5kJykge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2sodG9wSGl0LnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LCAoZXJyb3IpID0+IHtcbiAgICAgIGlmIChlcnJvckNhbGxiYWNrKSB7XG4gICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgfVxuICAgICAgZWxzZSB7XG4gICAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2FybignZXJyb3I6ICcgKyBlcnJvcik7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIud2Fybignbm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCEnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==