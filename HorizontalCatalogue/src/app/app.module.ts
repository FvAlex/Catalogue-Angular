import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MainComponents } from './layout/main/main.component';
import { HorizontalComponent } from './layout/components/horizontal/horizontal.component';
import { HorizontaltopbarComponent } from './layout/components/horizontaltopbar/horizontaltopbar.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
    HorizontalComponent,
    HorizontaltopbarComponent,
    MainComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
