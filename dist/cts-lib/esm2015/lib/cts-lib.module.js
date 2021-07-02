import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { LoggerModule, NgxLoggerLevel } from "ngx-logger";
import { CtsConstants } from "./cts-constants";
import { CtsService } from "./cts.service";
import { ChemifyService } from "./chemify.service";
import * as i0 from "@angular/core";
import * as i1 from "ngx-logger";
export class CtsLibModule {
}
CtsLibModule.ɵmod = i0.ɵɵdefineNgModule({ type: CtsLibModule });
CtsLibModule.ɵinj = i0.ɵɵdefineInjector({ factory: function CtsLibModule_Factory(t) { return new (t || CtsLibModule)(); }, providers: [
        CtsConstants,
        CtsService,
        ChemifyService
    ], imports: [[
            LoggerModule.forRoot({
                level: NgxLoggerLevel.DEBUG,
                serverLogLevel: NgxLoggerLevel.OFF
            }),
            HttpClientModule
        ]] });
(function () { (typeof ngJitMode === "undefined" || ngJitMode) && i0.ɵɵsetNgModuleScope(CtsLibModule, { imports: [i1.LoggerModule, HttpClientModule] }); })();
/*@__PURE__*/ (function () { i0.ɵsetClassMetadata(CtsLibModule, [{
        type: NgModule,
        args: [{
                imports: [
                    LoggerModule.forRoot({
                        level: NgxLoggerLevel.DEBUG,
                        serverLogLevel: NgxLoggerLevel.OFF
                    }),
                    HttpClientModule
                ],
                providers: [
                    CtsConstants,
                    CtsService,
                    ChemifyService
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3RzLWxpYi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvbm9sYW4vRGV2ZWxvcG1lbnQvbW9uYS1zZXJ2aWNlcy9hbmd1bGFyLWN0cy1zZXJ2aWNlL3Byb2plY3RzL2N0cy1saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL2N0cy1saWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTSxFQUFDLFlBQVksRUFBRSxjQUFjLEVBQUMsTUFBTSxZQUFZLENBQUM7QUFDdkQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLG1CQUFtQixDQUFDOzs7QUFnQmpELE1BQU0sT0FBTyxZQUFZOztnREFBWixZQUFZO3VHQUFaLFlBQVksbUJBTlo7UUFDVCxZQUFZO1FBQ1osVUFBVTtRQUNWLGNBQWM7S0FDZixZQVhRO1lBQ1AsWUFBWSxDQUFDLE9BQU8sQ0FBQztnQkFDbkIsS0FBSyxFQUFFLGNBQWMsQ0FBQyxLQUFLO2dCQUMzQixjQUFjLEVBQUUsY0FBYyxDQUFDLEdBQUc7YUFDbkMsQ0FBQztZQUNGLGdCQUFnQjtTQUNqQjt3RkFPVSxZQUFZLCtCQVJyQixnQkFBZ0I7a0RBUVAsWUFBWTtjQWR4QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVksQ0FBQyxPQUFPLENBQUM7d0JBQ25CLEtBQUssRUFBRSxjQUFjLENBQUMsS0FBSzt3QkFDM0IsY0FBYyxFQUFFLGNBQWMsQ0FBQyxHQUFHO3FCQUNuQyxDQUFDO29CQUNGLGdCQUFnQjtpQkFDakI7Z0JBQ0QsU0FBUyxFQUFFO29CQUNULFlBQVk7b0JBQ1osVUFBVTtvQkFDVixjQUFjO2lCQUNmO2FBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtIdHRwQ2xpZW50TW9kdWxlfSBmcm9tIFwiQGFuZ3VsYXIvY29tbW9uL2h0dHBcIjtcbmltcG9ydHtMb2dnZXJNb2R1bGUsIE5neExvZ2dlckxldmVsfSBmcm9tIFwibmd4LWxvZ2dlclwiO1xuaW1wb3J0IHtDdHNDb25zdGFudHN9IGZyb20gXCIuL2N0cy1jb25zdGFudHNcIjtcbmltcG9ydCB7Q3RzU2VydmljZX0gZnJvbSBcIi4vY3RzLnNlcnZpY2VcIjtcbmltcG9ydCB7Q2hlbWlmeVNlcnZpY2V9IGZyb20gXCIuL2NoZW1pZnkuc2VydmljZVwiO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTG9nZ2VyTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgbGV2ZWw6IE5neExvZ2dlckxldmVsLkRFQlVHLFxuICAgICAgc2VydmVyTG9nTGV2ZWw6IE5neExvZ2dlckxldmVsLk9GRlxuICAgIH0pLFxuICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ3RzQ29uc3RhbnRzLFxuICAgIEN0c1NlcnZpY2UsXG4gICAgQ2hlbWlmeVNlcnZpY2VcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDdHNMaWJNb2R1bGUgeyB9XG4iXX0=