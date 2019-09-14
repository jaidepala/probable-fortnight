import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/*
    !   NOTE:
    *   
    *   Note: Make sure you import
    *   the Angular Material modules 
    *   after Angular's BrowserModule, 
    *   as the import order matters for NgModules.

    !   REF:
    *         
    *   https://www.techiediaries.com/angular-material-navigation-toolbar-sidenav/
    *         
*/
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule,
        SharedModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
