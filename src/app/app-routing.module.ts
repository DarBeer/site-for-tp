import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebComponent } from './web/web.component';
import { HomeComponent } from './web/home/home.component';
import { ArticlesComponent } from './web/articles/articles.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeDashboardComponent } from './dashboard/home-dashboard/home-dashboard.component';


const routes: Routes = [
  { path: '', component: WebComponent, children: [
    { path: '', component: HomeComponent },
    { path: 'articles', component: ArticlesComponent }
  ]},
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: '', component: HomeDashboardComponent },
    { path: 'articles', component: ArticlesComponent },
    { path: 'users', component: ArticlesComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
