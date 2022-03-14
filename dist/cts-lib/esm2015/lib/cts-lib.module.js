import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { LoggerModule, NgxLoggerLevel } from 'ngx-logger';
import { CtsConstants } from './cts-constants';
import { CtsService } from './cts.service';
import { ChemifyService } from './chemify.service';
import * as i0 from "@angular/core";
import * as i1 from "ngx-logger";
export class CtsLibModule {
    static forRoot(config) {
        console.log(config);
        return {
            ngModule: CtsLibModule,
            providers: [
                { provide: CtsConstants, useValue: config }
            ]
        };
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3RzLWxpYi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvbm9sYW4vRGV2ZWxvcG1lbnQvbW9uYS1zZXJ2aWNlcy9hbmd1bGFyLWN0cy1zZXJ2aWNlL3Byb2plY3RzL2N0cy1saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL2N0cy1saWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsWUFBWSxFQUFFLGNBQWMsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUN4RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sbUJBQW1CLENBQUM7OztBQWdCakQsTUFBTSxPQUFPLFlBQVk7SUFDdkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxNQUFvQjtRQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLE9BQU87WUFDTCxRQUFRLEVBQUUsWUFBWTtZQUN0QixTQUFTLEVBQUU7Z0JBQ1QsRUFBQyxPQUFPLEVBQUUsWUFBWSxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUM7YUFDMUM7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Z0RBVFUsWUFBWTt1R0FBWixZQUFZLG1CQU5aO1FBQ1QsWUFBWTtRQUNaLFVBQVU7UUFDVixjQUFjO0tBQ2YsWUFYUTtZQUNQLFlBQVksQ0FBQyxPQUFPLENBQUM7Z0JBQ25CLEtBQUssRUFBRSxjQUFjLENBQUMsS0FBSztnQkFDM0IsY0FBYyxFQUFFLGNBQWMsQ0FBQyxHQUFHO2FBQ25DLENBQUM7WUFDRixnQkFBZ0I7U0FDakI7d0ZBT1UsWUFBWSwrQkFSckIsZ0JBQWdCO2tEQVFQLFlBQVk7Y0FkeEIsUUFBUTtlQUFDO2dCQUNSLE9BQU8sRUFBRTtvQkFDUCxZQUFZLENBQUMsT0FBTyxDQUFDO3dCQUNuQixLQUFLLEVBQUUsY0FBYyxDQUFDLEtBQUs7d0JBQzNCLGNBQWMsRUFBRSxjQUFjLENBQUMsR0FBRztxQkFDbkMsQ0FBQztvQkFDRixnQkFBZ0I7aUJBQ2pCO2dCQUNELFNBQVMsRUFBRTtvQkFDVCxZQUFZO29CQUNaLFVBQVU7b0JBQ1YsY0FBYztpQkFDZjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtMb2dnZXJNb2R1bGUsIE5neExvZ2dlckxldmVsfSBmcm9tICduZ3gtbG9nZ2VyJztcbmltcG9ydCB7Q3RzQ29uc3RhbnRzfSBmcm9tICcuL2N0cy1jb25zdGFudHMnO1xuaW1wb3J0IHtDdHNTZXJ2aWNlfSBmcm9tICcuL2N0cy5zZXJ2aWNlJztcbmltcG9ydCB7Q2hlbWlmeVNlcnZpY2V9IGZyb20gJy4vY2hlbWlmeS5zZXJ2aWNlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIExvZ2dlck1vZHVsZS5mb3JSb290KHtcbiAgICAgIGxldmVsOiBOZ3hMb2dnZXJMZXZlbC5ERUJVRyxcbiAgICAgIHNlcnZlckxvZ0xldmVsOiBOZ3hMb2dnZXJMZXZlbC5PRkZcbiAgICB9KSxcbiAgICBIdHRwQ2xpZW50TW9kdWxlXG4gIF0sXG4gIHByb3ZpZGVyczogW1xuICAgIEN0c0NvbnN0YW50cyxcbiAgICBDdHNTZXJ2aWNlLFxuICAgIENoZW1pZnlTZXJ2aWNlXG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgQ3RzTGliTW9kdWxlIHtcbiAgc3RhdGljIGZvclJvb3QoY29uZmlnOiBDdHNDb25zdGFudHMpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEN0c0xpYk1vZHVsZT4ge1xuICAgIGNvbnNvbGUubG9nKGNvbmZpZyk7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBDdHNMaWJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge3Byb3ZpZGU6IEN0c0NvbnN0YW50cywgdXNlVmFsdWU6IGNvbmZpZ31cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=