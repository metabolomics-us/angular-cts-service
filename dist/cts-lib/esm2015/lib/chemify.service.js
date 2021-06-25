import { Inject, Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NGXLogger } from "ngx-logger";
import { CtsConstants } from "./cts-constants";
import * as i0 from "@angular/core";
import * as i1 from "@angular/common/http";
import * as i2 from "ngx-logger";
export class ChemifyService {
    constructor(http, logger) {
        this.http = http;
        this.logger = logger;
        /**
         * converts the given name to an InChI Key
         * @param chemicalName
         * @param callback
         */
        this.nameToInChIKey = (chemicalName) => {
            return this.http.get(`${CtsConstants.apiUrl}/chemify/rest/identify/${encodeURI(chemicalName)}`);
            /*
              .then((res) => {
                let result = "";
        
                if (res["data"]) {
                  let data = res["data"];
                  if (Array.isArray(data)) {
                    if (data.length > 0) {
                      let topHit = data[0];
                      if (topHit.result) {
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
              }).catch((error) =>{
                if (errorCallback) {
                  errorCallback(error);
                }
                else {
                  if (error != null) {
                    this.logger.warn('error: ' + error);
                  }
                  else {
                    this.logger.warn("no error message provided!");
                  }
                }
              });
             */
        };
    }
}
ChemifyService.ɵfac = function ChemifyService_Factory(t) { return new (t || ChemifyService)(i0.ɵɵinject(HttpClient), i0.ɵɵinject(NGXLogger)); };
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
            }] }]; }, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlbWlmeS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Ii9ob21lL25vbGFuL0RldmVsb3BtZW50L2FuZ3VsYXItY3RzLXNlcnZpY2UvYW5ndWxhci1jdHMtc2VydmljZS9wcm9qZWN0cy9jdHMtbGliL3NyYy8iLCJzb3VyY2VzIjpbImxpYi9jaGVtaWZ5LnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDakQsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDckMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDOzs7O0FBSzdDLE1BQU0sT0FBTyxjQUFjO0lBQ3pCLFlBQXdDLElBQWdCLEVBQTZCLE1BQWlCO1FBQTlELFNBQUksR0FBSixJQUFJLENBQVk7UUFBNkIsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUd0Rzs7OztXQUlHO1FBQ0gsbUJBQWMsR0FBRyxDQUFDLFlBQVksRUFBRSxFQUFFO1lBRWhDLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxZQUFZLENBQUMsTUFBTSwwQkFBMEIsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNoRzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBaUNHO1FBQ0wsQ0FBQyxDQUFBO0lBNUNELENBQUM7OzRFQUZVLGNBQWMsY0FDTCxVQUFVLGVBQW9DLFNBQVM7c0RBRGhFLGNBQWMsV0FBZCxjQUFjLG1CQUZiLE1BQU07a0RBRVAsY0FBYztjQUgxQixVQUFVO2VBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7O3NCQUVjLE1BQU07dUJBQUMsVUFBVTs7c0JBQTZCLE1BQU07dUJBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSBcIkBhbmd1bGFyL2NvbW1vbi9odHRwXCI7XG5pbXBvcnQge05HWExvZ2dlcn0gZnJvbSBcIm5neC1sb2dnZXJcIjtcbmltcG9ydCB7Q3RzQ29uc3RhbnRzfSBmcm9tIFwiLi9jdHMtY29uc3RhbnRzXCI7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIENoZW1pZnlTZXJ2aWNle1xuICBjb25zdHJ1Y3RvcihASW5qZWN0KEh0dHBDbGllbnQpIHByaXZhdGUgaHR0cDogSHR0cENsaWVudCwgQEluamVjdChOR1hMb2dnZXIpIHByaXZhdGUgbG9nZ2VyOiBOR1hMb2dnZXIpIHtcbiAgfVxuXG4gIC8qKlxuICAgKiBjb252ZXJ0cyB0aGUgZ2l2ZW4gbmFtZSB0byBhbiBJbkNoSSBLZXlcbiAgICogQHBhcmFtIGNoZW1pY2FsTmFtZVxuICAgKiBAcGFyYW0gY2FsbGJhY2tcbiAgICovXG4gIG5hbWVUb0luQ2hJS2V5ID0gKGNoZW1pY2FsTmFtZSkgPT4ge1xuXG4gICAgcmV0dXJuIHRoaXMuaHR0cC5nZXQoYCR7Q3RzQ29uc3RhbnRzLmFwaVVybH0vY2hlbWlmeS9yZXN0L2lkZW50aWZ5LyR7ZW5jb2RlVVJJKGNoZW1pY2FsTmFtZSl9YCk7XG4gICAgLypcbiAgICAgIC50aGVuKChyZXMpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IFwiXCI7XG5cbiAgICAgICAgaWYgKHJlc1tcImRhdGFcIl0pIHtcbiAgICAgICAgICBsZXQgZGF0YSA9IHJlc1tcImRhdGFcIl07XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgICAgICAgIGlmIChkYXRhLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgbGV0IHRvcEhpdCA9IGRhdGFbMF07XG4gICAgICAgICAgICAgIGlmICh0b3BIaXQucmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHRvcEhpdC5yZXN1bHQgPT09ICdub3RoaW5nIGZvdW5kJykge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2sobnVsbCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgY2FsbGJhY2sodG9wSGl0LnJlc3VsdCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KS5jYXRjaCgoZXJyb3IpID0+e1xuICAgICAgICBpZiAoZXJyb3JDYWxsYmFjaykge1xuICAgICAgICAgIGVycm9yQ2FsbGJhY2soZXJyb3IpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIGlmIChlcnJvciAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKCdlcnJvcjogJyArIGVycm9yKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvZ2dlci53YXJuKFwibm8gZXJyb3IgbWVzc2FnZSBwcm92aWRlZCFcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgKi9cbiAgfVxufVxuIl19