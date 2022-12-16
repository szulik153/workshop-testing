import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { BaselineEffects } from './app/+state/baseline.effects';
import { baselinesFeature } from './app/+state/baseline.reducer';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideAnimations(),
    provideStore(),
    provideStoreDevtools(),
    provideState(baselinesFeature),
    provideEffects(BaselineEffects),
  ],
}).catch((err) => console.error(err));
