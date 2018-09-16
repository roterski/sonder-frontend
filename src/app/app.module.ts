import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './store/app.reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';
import { AppEffects } from './store/app.effects';
import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { AuthenticatedAppComponent } from './components/authenticated-app/authenticated-app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { BottomButtonsComponent } from './components/bottom-buttons/bottom-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TopNavBarComponent,
    AuthenticatedAppComponent,
    BottomButtonsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    StoreRouterConnectingModule.forRoot(),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AppEffects]),
    AuthModule,
    PostsModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
