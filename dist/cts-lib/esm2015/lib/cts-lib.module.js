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
        console.log(config);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3RzLWxpYi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiL2hvbWUvbm9sYW4vRGV2ZWxvcG1lbnQvbW9uYS1zZXJ2aWNlcy9hbmd1bGFyLWN0cy1zZXJ2aWNlL3Byb2plY3RzL2N0cy1saWIvc3JjLyIsInNvdXJjZXMiOlsibGliL2N0cy1saWIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBc0IsUUFBUSxFQUFxQixNQUFNLGVBQWUsQ0FBQztBQUNoRixPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUN0RCxPQUFPLEVBQUMsWUFBWSxFQUFFLGNBQWMsRUFBQyxNQUFNLFlBQVksQ0FBQztBQUV4RCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUVqRCxPQUFPLEVBQUMsdUJBQXVCLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQzs7O0FBV3JFLE1BQU0sT0FBTyxZQUFZO0lBQ3ZCLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBbUI7UUFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixPQUFPO1lBQ0wsUUFBUSxFQUFFLFlBQVk7WUFDdEIsU0FBUyxFQUFFO2dCQUNULFVBQVU7Z0JBQ1YsY0FBYztnQkFDZDtvQkFDRSxPQUFPLEVBQUUsdUJBQXVCO29CQUNoQyxRQUFRLEVBQUUsTUFBTTtpQkFDakI7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOztnREFkVSxZQUFZO3VHQUFaLFlBQVksa0JBUmQ7WUFDUCxZQUFZLENBQUMsT0FBTyxDQUFDO2dCQUNuQixLQUFLLEVBQUUsY0FBYyxDQUFDLEtBQUs7Z0JBQzNCLGNBQWMsRUFBRSxjQUFjLENBQUMsR0FBRzthQUNuQyxDQUFDO1lBQ0YsZ0JBQWdCO1NBQ2pCO3dGQUVVLFlBQVksK0JBSHJCLGdCQUFnQjtrREFHUCxZQUFZO2NBVHhCLFFBQVE7ZUFBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWSxDQUFDLE9BQU8sQ0FBQzt3QkFDbkIsS0FBSyxFQUFFLGNBQWMsQ0FBQyxLQUFLO3dCQUMzQixjQUFjLEVBQUUsY0FBYyxDQUFDLEdBQUc7cUJBQ25DLENBQUM7b0JBQ0YsZ0JBQWdCO2lCQUNqQjthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZSwgT3B0aW9uYWwsIFNraXBTZWxmfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7SHR0cENsaWVudE1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtMb2dnZXJNb2R1bGUsIE5neExvZ2dlckxldmVsfSBmcm9tICduZ3gtbG9nZ2VyJztcblxuaW1wb3J0IHtDdHNTZXJ2aWNlfSBmcm9tICcuL2N0cy5zZXJ2aWNlJztcbmltcG9ydCB7Q2hlbWlmeVNlcnZpY2V9IGZyb20gJy4vY2hlbWlmeS5zZXJ2aWNlJztcbmltcG9ydCB7Q3RzQ29uc3RhbnR9IGZyb20gJy4vY3RzLWNvbnN0YW50JztcbmltcG9ydCB7Q3RzQ29uc3RhbnRUb2tlblNlcnZpY2V9IGZyb20gJy4vY3RzLWNvbnN0YW50LXRva2VuLnNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgTG9nZ2VyTW9kdWxlLmZvclJvb3Qoe1xuICAgICAgbGV2ZWw6IE5neExvZ2dlckxldmVsLkRFQlVHLFxuICAgICAgc2VydmVyTG9nTGV2ZWw6IE5neExvZ2dlckxldmVsLk9GRlxuICAgIH0pLFxuICAgIEh0dHBDbGllbnRNb2R1bGVcbiAgXVxufSlcbmV4cG9ydCBjbGFzcyBDdHNMaWJNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IEN0c0NvbnN0YW50KTogTW9kdWxlV2l0aFByb3ZpZGVyczxDdHNMaWJNb2R1bGU+IHtcbiAgICBjb25zb2xlLmxvZyhjb25maWcpO1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQ3RzTGliTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIEN0c1NlcnZpY2UsXG4gICAgICAgIENoZW1pZnlTZXJ2aWNlLFxuICAgICAgICB7XG4gICAgICAgICAgcHJvdmlkZTogQ3RzQ29uc3RhbnRUb2tlblNlcnZpY2UsXG4gICAgICAgICAgdXNlVmFsdWU6IGNvbmZpZ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxufVxuIl19