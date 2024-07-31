import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './services/auth/auth.interceptor';



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideAnimationsAsync(),
    provideHttpClient(
      withInterceptors([
        authInterceptor // Adicione o interceptor aqui
      ]),
      withFetch()
    )
  ],
};
