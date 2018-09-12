import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers/auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginPageComponent } from './containers/login-page/login-page.component';
import { NativeScriptHttpClientModule } from 'nativescript-angular/http-client';
// import { HttpClientModule } from '@angular/common/http';
import { AuthenticatedGuard, UnauthenticatedGuard } from './guards';

@NgModule({
    imports: [
        CommonModule,
        StoreModule.forFeature('auth', fromAuth.reducer),
        EffectsModule.forFeature([AuthEffects]),
        AuthRoutingModule,
        NativeScriptHttpClientModule
    ],
    declarations: [LoginPageComponent],
    providers: [AuthenticatedGuard]
})
export class AuthModule { }
