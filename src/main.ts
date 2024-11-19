import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/core/app.config';
import { SidenavComponent } from './app/shared/components/sidenav/sidenav.component';

bootstrapApplication(SidenavComponent, appConfig)
  .catch((err) => console.error(err));
