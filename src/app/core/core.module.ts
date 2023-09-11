import { ErrorHandler, NgModule, isDevMode } from '@angular/core'
import { CommonModule } from '@angular/common'
import { HttpClientModule } from '@angular/common/http'
import { SVR_BACKEND_URL } from './injection-tokens/backend-url.token'
import { environment } from 'src/environments/environment'
import { MyHttpService } from './services/my-http.service'
import { StoreModule } from '@ngrx/store'
import { EffectsModule } from '@ngrx/effects'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { GlobalErrorHandler } from './error-handler/global-error-handler.handler'

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [
    MyHttpService,
    {
      provide: SVR_BACKEND_URL,
      useValue: environment.backendUrl,
    },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandler,
    },
  ],
})
export class CoreModule {}
