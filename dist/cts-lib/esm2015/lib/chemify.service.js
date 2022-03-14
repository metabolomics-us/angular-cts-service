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
        console.log(this.ctsConstants.apiUrl);
        console.log(this.apiUrl);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlbWlmeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL25vbGFuL0RldmVsb3BtZW50L21vbmEtc2VydmljZXMvYW5ndWxhci1jdHMtc2VydmljZS9wcm9qZWN0cy9jdHMtbGliL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jaGVtaWZ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDckMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7OztBQUs3QyxNQUFNLE9BQU8sY0FBYztJQUV6QixZQUF1QyxJQUFnQixFQUE0QixNQUFpQixFQUMzRCxZQUEwQjtRQUQ1QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQTRCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDM0QsaUJBQVksR0FBWixZQUFZLENBQWM7UUFNbkU7O1dBRUc7UUFDSCxtQkFBYyxHQUFHLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsRUFBRTtZQUV6RCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLDBCQUEwQixTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQztpQkFDN0UsU0FBUyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2pCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztnQkFFbEIsSUFBSSxPQUFPLEdBQUcsS0FBSyxXQUFXLEVBQUU7b0JBQzlCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQztvQkFDakIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUN2QixJQUFJLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOzRCQUNuQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3ZCLElBQUksT0FBTyxNQUFNLENBQUMsTUFBTSxLQUFLLFdBQVcsRUFBRTtnQ0FDeEMsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLGVBQWUsRUFBRTtvQ0FDckMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO2lDQUNoQjtxQ0FDSTtvQ0FDSCxRQUFRLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2lDQUN6Qjs2QkFDRjt5QkFDRjtxQkFDRjtpQkFDRjtZQUNILENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUNiLElBQUksYUFBYSxFQUFFO29CQUNqQixhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQ3RCO3FCQUNJO29CQUNILElBQUksS0FBSyxJQUFJLElBQUksRUFBRTt3QkFDakIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDO3FCQUNyQzt5QkFDSTt3QkFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDO3FCQUNoRDtpQkFDRjtZQUNELENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBO1FBM0NDLElBQUksQ0FBQyxNQUFNLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQztRQUNsQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0IsQ0FBQzs7NEVBUFUsY0FBYyxjQUVMLFVBQVUsZUFBbUMsU0FBUyxlQUN0RCxZQUFZO3NEQUhyQixjQUFjLFdBQWQsY0FBYyxtQkFGYixNQUFNO2tEQUVQLGNBQWM7Y0FIMUIsVUFBVTtlQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COztzQkFHYyxNQUFNO3VCQUFDLFVBQVU7O3NCQUE0QixNQUFNO3VCQUFDLFNBQVM7O3NCQUM3RCxNQUFNO3VCQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7TkdYTG9nZ2VyfSBmcm9tICduZ3gtbG9nZ2VyJztcbmltcG9ydCB7Q3RzQ29uc3RhbnRzfSBmcm9tICcuL2N0cy1jb25zdGFudHMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBDaGVtaWZ5U2VydmljZXtcbiAgYXBpVXJsO1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KEh0dHBDbGllbnQpIHB1YmxpYyBodHRwOiBIdHRwQ2xpZW50LCBASW5qZWN0KE5HWExvZ2dlcikgcHVibGljIGxvZ2dlcjogTkdYTG9nZ2VyLFxuICAgICAgICAgICAgICBASW5qZWN0KEN0c0NvbnN0YW50cykgcHVibGljIGN0c0NvbnN0YW50czogQ3RzQ29uc3RhbnRzKSB7XG4gICAgdGhpcy5hcGlVcmwgPSBjdHNDb25zdGFudHMuYXBpVXJsO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuY3RzQ29uc3RhbnRzLmFwaVVybCk7XG4gICAgY29uc29sZS5sb2codGhpcy5hcGlVcmwpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNvbnZlcnRzIHRoZSBnaXZlbiBuYW1lIHRvIGFuIEluQ2hJIEtleVxuICAgKi9cbiAgbmFtZVRvSW5DaElLZXkgPSAoY2hlbWljYWxOYW1lLCBjYWxsYmFjaywgZXJyb3JDYWxsYmFjaykgPT4ge1xuXG4gICAgdGhpcy5odHRwLmdldChgJHt0aGlzLmFwaVVybH0vY2hlbWlmeS9yZXN0L2lkZW50aWZ5LyR7ZW5jb2RlVVJJKGNoZW1pY2FsTmFtZSl9YClcbiAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAnJztcblxuICAgICAgICBpZiAodHlwZW9mIHJlcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gcmVzO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHRvcEhpdCA9IGRhdGFbMF07XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgdG9wSGl0LnJlc3VsdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAodG9wSGl0LnJlc3VsdCA9PT0gJ25vdGhpbmcgZm91bmQnKSB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjayh0b3BIaXQucmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgaWYgKGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdlcnJvcjogJyArIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB9KTtcbiAgfVxufVxuIl19