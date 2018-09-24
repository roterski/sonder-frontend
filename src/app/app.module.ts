import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AkitaNgDevtools } from '@datorama/akita-ngdevtools';
import { AkitaNgRouterStoreModule } from '@datorama/akita-ng-router-store';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { environment } from '../environments/environment';
import { AuthModule } from './modules/auth/auth.module';
import { PostsModule } from './modules/posts/posts.module';
import { MatToolbarModule, MatButtonModule } from '@angular/material';
import { TopNavBarComponent } from './components/top-nav-bar/top-nav-bar.component';
import { AuthenticatedAppComponent } from './components/authenticated-app/authenticated-app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    environment.production ? [] : [AkitaNgDevtools.forRoot(), AkitaNgRouterStoreModule.forRoot()],
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
