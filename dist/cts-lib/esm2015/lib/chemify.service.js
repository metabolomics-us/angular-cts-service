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
        this.apiUrl = ctsConstants.apiUrl;
        logger.info(this.apiUrl);
        logger.info(this.ctsConstants.apiUrl);
    }
    /**
     * converts the given name to an InChI Key
     */
    nameToInChIKey(chemicalName, callback, errorCallback) {
        this.logger.info(this.apiUrl);
        this.logger.info(this.ctsConstants.apiUrl);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlbWlmeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL25vbGFuL0RldmVsb3BtZW50L21vbmEtc2VydmljZXMvYW5ndWxhci1jdHMtc2VydmljZS9wcm9qZWN0cy9jdHMtbGliL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jaGVtaWZ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDckMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7OztBQUs3QyxNQUFNLE9BQU8sY0FBYztJQUV6QixZQUF1QyxJQUFnQixFQUE0QixNQUFpQixFQUMzRCxZQUEwQjtRQUQ1QixTQUFJLEdBQUosSUFBSSxDQUFZO1FBQTRCLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDM0QsaUJBQVksR0FBWixZQUFZLENBQWM7UUFDakUsSUFBSSxDQUFDLE1BQU0sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxjQUFjLENBQUMsWUFBWSxFQUFFLFFBQVEsRUFBRSxhQUFhO1FBQ2xELElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sMEJBQTBCLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDO2FBQzdFLFNBQVMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2pCLE1BQU0sTUFBTSxHQUFHLEVBQUUsQ0FBQztZQUVsQixJQUFJLE9BQU8sR0FBRyxLQUFLLFdBQVcsRUFBRTtnQkFDOUIsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDO2dCQUNqQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3ZCLElBQUksSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7d0JBQ25CLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDdkIsSUFBSSxPQUFPLE1BQU0sQ0FBQyxNQUFNLEtBQUssV0FBVyxFQUFFOzRCQUN4QyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssZUFBZSxFQUFFO2dDQUNyQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7NkJBQ2hCO2lDQUNJO2dDQUNILFFBQVEsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7NkJBQ3pCO3lCQUNGO3FCQUNGO2lCQUNGO2FBQ0Y7UUFDSCxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUNiLElBQUksYUFBYSxFQUFFO2dCQUNqQixhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDdEI7aUJBQ0k7Z0JBQ0gsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO29CQUNqQixJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLENBQUM7aUJBQ3JDO3FCQUNJO29CQUNILElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixDQUFDLENBQUM7aUJBQ2hEO2FBQ0Y7UUFDRCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7OzRFQWhEVSxjQUFjLGNBRUwsVUFBVSxlQUFtQyxTQUFTLGVBQ3RELFlBQVk7c0RBSHJCLGNBQWMsV0FBZCxjQUFjLG1CQUZiLE1BQU07a0RBRVAsY0FBYztjQUgxQixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7O3NCQUdjLE1BQU07dUJBQUMsVUFBVTs7c0JBQTRCLE1BQU07dUJBQUMsU0FBUzs7c0JBQzdELE1BQU07dUJBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtOR1hMb2dnZXJ9IGZyb20gJ25neC1sb2dnZXInO1xuaW1wb3J0IHtDdHNDb25zdGFudHN9IGZyb20gJy4vY3RzLWNvbnN0YW50cyc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENoZW1pZnlTZXJ2aWNle1xuICBhcGlVcmw7XG4gIGNvbnN0cnVjdG9yKEBJbmplY3QoSHR0cENsaWVudCkgcHVibGljIGh0dHA6IEh0dHBDbGllbnQsIEBJbmplY3QoTkdYTG9nZ2VyKSBwdWJsaWMgbG9nZ2VyOiBOR1hMb2dnZXIsXG4gICAgICAgICAgICAgIEBJbmplY3QoQ3RzQ29uc3RhbnRzKSBwdWJsaWMgY3RzQ29uc3RhbnRzOiBDdHNDb25zdGFudHMpIHtcbiAgICB0aGlzLmFwaVVybCA9IGN0c0NvbnN0YW50cy5hcGlVcmw7XG4gICAgbG9nZ2VyLmluZm8odGhpcy5hcGlVcmwpO1xuICAgIGxvZ2dlci5pbmZvKHRoaXMuY3RzQ29uc3RhbnRzLmFwaVVybCk7XG4gIH1cblxuICAvKipcbiAgICogY29udmVydHMgdGhlIGdpdmVuIG5hbWUgdG8gYW4gSW5DaEkgS2V5XG4gICAqL1xuICBuYW1lVG9JbkNoSUtleShjaGVtaWNhbE5hbWUsIGNhbGxiYWNrLCBlcnJvckNhbGxiYWNrKTogdm9pZHtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKHRoaXMuYXBpVXJsKTtcbiAgICB0aGlzLmxvZ2dlci5pbmZvKHRoaXMuY3RzQ29uc3RhbnRzLmFwaVVybCk7XG4gICAgdGhpcy5odHRwLmdldChgJHt0aGlzLmFwaVVybH0vY2hlbWlmeS9yZXN0L2lkZW50aWZ5LyR7ZW5jb2RlVVJJKGNoZW1pY2FsTmFtZSl9YClcbiAgICAgIC5zdWJzY3JpYmUoKHJlcykgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSAnJztcblxuICAgICAgICBpZiAodHlwZW9mIHJlcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gcmVzO1xuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGRhdGEpKSB7XG4gICAgICAgICAgICBpZiAoZGF0YS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHRvcEhpdCA9IGRhdGFbMF07XG4gICAgICAgICAgICAgIGlmICh0eXBlb2YgdG9wSGl0LnJlc3VsdCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBpZiAodG9wSGl0LnJlc3VsdCA9PT0gJ25vdGhpbmcgZm91bmQnKSB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjayhudWxsKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICBjYWxsYmFjayh0b3BIaXQucmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sIChlcnJvcikgPT4ge1xuICAgICAgaWYgKGVycm9yQ2FsbGJhY2spIHtcbiAgICAgICAgZXJyb3JDYWxsYmFjayhlcnJvcik7XG4gICAgICB9XG4gICAgICBlbHNlIHtcbiAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdlcnJvcjogJyArIGVycm9yKTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdubyBlcnJvciBtZXNzYWdlIHByb3ZpZGVkIScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB9KTtcbiAgfVxufVxuIl19