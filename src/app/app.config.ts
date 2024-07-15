import { authInterceptorProviders } from './controllers/auth.interceptor';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
export const appConfig: ApplicationConfig = {
  providers: [
    
    provideRouter(routes),
    // authInterceptorProviders,
    provideAnimationsAsync(),
    importProvidersFrom([
      HttpClientModule])
  ]
};