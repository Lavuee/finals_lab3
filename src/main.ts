import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

import { App} from './app/app';
import { routes } from './app/app.routes';
import { Environment } from './environments/environment';;

bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(Environment.firebase)),
    provideFirestore(() => getFirestore())
  ]
});