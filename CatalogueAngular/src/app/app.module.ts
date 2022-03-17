import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TopbarsComponent } from './layout/topbars/topbars.component';
import { Catalogue } from './pages/catalogueComponent/catalogue.component';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarsComponent } from './layout/sidebars/sidebars.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatNativeDateModule } from '@angular/material/core';
import { MaterialExampleModule } from 'src/materiel.module';
import { FirstCatalogueComponent } from './pages/Component/first-catalogue/first-catalogue.component';
import { SecondCatalogueComponent } from './pages/Component/second-catalogue/second-catalogue.component';

@NgModule({
  declarations: [
    AppComponent,
    TopbarsComponent,
    Catalogue,
    SidebarsComponent,
    FirstCatalogueComponent,
    SecondCatalogueComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    TranslateModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MaterialExampleModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
