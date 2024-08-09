import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"simplecare-890b5","appId":"1:487457740971:web:b89895f7891981b30fbfee","storageBucket":"simplecare-890b5.appspot.com","apiKey":"AIzaSyCR-3G5OYskW9TdgeYb3gvSKpVIwuZie-U","authDomain":"simplecare-890b5.firebaseapp.com","messagingSenderId":"487457740971"})), provideFirestore(() => getFirestore()), provideDatabase(() => getDatabase())],
};
