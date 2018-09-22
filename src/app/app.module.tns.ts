import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule } from 'nativescript-angular/nativescript.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthModule } from './modules/auth/auth.module';
import { environment } from '../environments/environment';
import 'nativescript-localstorage';
import { NativeScriptFacebookModule } from 'nativescript-facebook/angular';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { AuthenticatedAppComponent } from './components/authenticated-app/authenticated-app.component';

// Uncomment and add to NgModule imports if you need to use two-way binding
// import { NativeScriptFormsModule } from "nativescript-angular/forms";

// Uncomment and add to NgModule imports  if you need to use the HTTP wrapper
// import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopNavBarComponent,
    AuthenticatedAppComponent
  ],
  imports: [
    NativeScriptModule,
    AppRoutingModule,
    NativeScriptFacebookModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule { }
