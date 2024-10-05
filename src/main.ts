import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { CotizacionComponent } from './app/components/cotizacion/cotizacion.component';

bootstrapApplication(CotizacionComponent, appConfig)
  .catch((err) => console.error(err));
