import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { CtsService } from './cts.service';
import { ChemifyService } from './chemify.service';
import { CtsConstantTokenService } from './cts-constant-token.service';
import * as i0 from "@angular/core";
import * as i1 from "ngx-logger";
export class CtsLibModule {
    static forRoot(config) {
        return {
            ngModule: CtsLibModule,
            providers: [
                CtsService,
                ChemifyService,
                {
                    provide: CtsConstantTokenService,
                    useValue: config
                }
            ]
        };
    }
}
CtsLibModule.ɵmod = i0.ɵɵdefineNgModule({ type: CtsLibModule });
CtsLibModule.ɵinj = i0.ɵɵdefineInjector({ factory: function CtsLibModule_Factory(t) { return new (t || CtsLibModule)(); }, imports: [[
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
                ]
            }]
    }], null, null); })();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3RzLWxpYi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvbm9sYW4vRGV2ZWxvcG1lbnQvbW9uYS1zZXJ2aWNlcy9hbmd1bGFyLWN0cy1zZXJ2aWNlL3Byb2plY3RzL2N0cy1saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL2N0cy1saWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsWUFBWSxFQUFFLGNBQWMsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUV4RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUVqRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQzs7O0FBV3JFLE1BQU0sT0FBTyxZQUFZO0lBQ3ZCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBbUI7UUFDaEMsT0FBTztZQUNMLFFBQVEsRUFBRSxZQUFZO1lBQ3RCLFNBQVMsRUFBRTtnQkFDVCxVQUFVO2dCQUNWLGNBQWM7Z0JBQ2Q7b0JBQ0UsT0FBTyxFQUFFLHVCQUF1QjtvQkFDaEMsUUFBUSxFQUFFLE1BQU07aUJBQ2pCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Z0RBYlUsWUFBWTt1R0FBWixZQUFZLGtCQVJkO1lBQ1AsWUFBWSxDQUFDLE9BQU8sQ0FBQztnQkFDbkIsS0FBSyxFQUFFLGNBQWMsQ0FBQyxLQUFLO2dCQUMzQixjQUFjLEVBQUUsY0FBYyxDQUFDLEdBQUc7YUFDbkMsQ0FBQztZQUNGLGdCQUFnQjtTQUNqQjt3RkFFVSxZQUFZLCtCQUhyQixnQkFBZ0I7a0RBR1AsWUFBWTtjQVR4QixRQUFRO2VBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVksQ0FBQyxPQUFPLENBQUM7d0JBQ25CLEtBQUssRUFBRSxjQUFjLENBQUMsS0FBSzt3QkFDM0IsY0FBYyxFQUFFLGNBQWMsQ0FBQyxHQUFHO3FCQUNuQyxDQUFDO29CQUNGLGdCQUFnQjtpQkFDakI7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGUsIE9wdGlvbmFsLCBTa2lwU2VsZn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0h0dHBDbGllbnRNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7TG9nZ2VyTW9kdWxlLCBOZ3hMb2dnZXJMZXZlbH0gZnJvbSAnbmd4LWxvZ2dlcic7XG5cbmltcG9ydCB7Q3RzU2VydmljZX0gZnJvbSAnLi9jdHMuc2VydmljZSc7XG5pbXBvcnQge0NoZW1pZnlTZXJ2aWNlfSBmcm9tICcuL2NoZW1pZnkuc2VydmljZSc7XG5pbXBvcnQge0N0c0NvbnN0YW50fSBmcm9tICcuL2N0cy1jb25zdGFudCc7XG5pbXBvcnQge0N0c0NvbnN0YW50VG9rZW5TZXJ2aWNlfSBmcm9tICcuL2N0cy1jb25zdGFudC10b2tlbi5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIExvZ2dlck1vZHVsZS5mb3JSb290KHtcbiAgICAgIGxldmVsOiBOZ3hMb2dnZXJMZXZlbC5ERUJVRyxcbiAgICAgIHNlcnZlckxvZ0xldmVsOiBOZ3hMb2dnZXJMZXZlbC5PRkZcbiAgICB9KSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQ3RzTGliTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBDdHNDb25zdGFudCk6IE1vZHVsZVdpdGhQcm92aWRlcnM8Q3RzTGliTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDdHNMaWJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgQ3RzU2VydmljZSxcbiAgICAgICAgQ2hlbWlmeVNlcnZpY2UsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBDdHNDb25zdGFudFRva2VuU2VydmljZSxcbiAgICAgICAgICB1c2VWYWx1ZTogY29uZmlnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=