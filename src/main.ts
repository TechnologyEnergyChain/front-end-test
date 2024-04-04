import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '@infrastructure/ui/app.config';
import { AppComponent } from '@infrastructure/ui/app.component';

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
