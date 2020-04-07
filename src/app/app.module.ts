import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WebComponent } from './web/web.component';
import { HomeComponent } from './web/home/home.component';
import { ArticlesComponent } from './web/articles/articles.component';
import { HeaderComponent } from './web/header/header.component';
import { FooterComponent } from './web/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeDashboardComponent } from './dashboard/home-dashboard/home-dashboard.component';
import { UsersDashboardComponent } from './dashboard/users-dashboard/users-dashboard.component';
import { ArticlesDashboardComponent } from './dashboard/articles-dashboard/articles-dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PageComponent } from './web/articles/page/page.component';

@NgModule({
  declarations: [
    AppComponent,
    WebComponent,
    HomeComponent,
    ArticlesComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    HomeDashboardComponent,
    UsersDashboardComponent,
    ArticlesDashboardComponent,
    NotFoundComponent,
    PageComponent,
  ],
  imports: [
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    MDBBootstrapModule.forRoot(),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
