import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebComponent } from './web/web.component';
import { HomeComponent } from './web/home/home.component';
import { ArticlesComponent } from './web/articles/articles.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeDashboardComponent } from './dashboard/home-dashboard/home-dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { UsersDashboardComponent } from './dashboard/users-dashboard/users-dashboard.component';
import { ArticlesDashboardComponent } from './dashboard/articles-dashboard/articles-dashboard.component';
import { PageComponent } from './web/articles/page/page.component';


const routes: Routes = [
  { path: '', component: WebComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'articles', component: ArticlesComponent },
    { path: 'articles/:id', component: PageComponent }
  ]},
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: '', component: HomeDashboardComponent },
    { path: 'articles', component: ArticlesDashboardComponent },
    { path: 'users', component: UsersDashboardComponent }
  ]},
  { path: 'not-found', component: NotFoundComponent },
  //{ path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
