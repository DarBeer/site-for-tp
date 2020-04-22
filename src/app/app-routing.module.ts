import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WebComponent } from './web/web.component';
import { HomeComponent } from './web/home/home.component';
import { ArticlesComponent } from './web/articles/articles.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeDashboardComponent } from './dashboard/home-dashboard/home-dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ArticlesDashboardComponent } from './dashboard/articles-dashboard/articles-dashboard.component';
import { PageComponent } from './web/articles/page/page.component';
import { ResidentsComponent } from './web/residents/residents.component';
import { ServicesComponent } from './web/services/services.component';
import { ServicesDashboardComponent } from './dashboard/services-dashboard/services-dashboard.component';
import { ServicePageComponent } from './web/services/service-page/service-page.component';
import { AuthguardGuard } from './authguard.guard';
import { LoginComponent } from './login/login.component';
import { KlasterDashboardComponent } from './dashboard/klaster-dashboard/klaster-dashboard.component';
import { InvestorsDashboardComponent } from './dashboard/investors-dashboard/investors-dashboard.component';
import { KlasterComponent } from './web/klaster/klaster.component';


const routes: Routes = [
  { path: '',           component: WebComponent, children: [
    { path: '',                 component: HomeComponent                },
    { path: 'articles',         component: ArticlesComponent            },
    { path: 'articles/:id',     component: PageComponent                },
    { path: 'residents',        component: ResidentsComponent           },
    { path: 'services',         component: ServicesComponent            },
    { path: 'services/:id',     component: ServicePageComponent         },
    { path: 'klaster',          component: KlasterComponent             }
  ]},
  { path: 'dashboard',  component: DashboardComponent, canActivate: [AuthguardGuard], children: [
    { path: '', redirectTo: 'articles', pathMatch: 'full' },
    { path: 'articles',         component: ArticlesDashboardComponent   },
    { path: 'services',         component: ServicesDashboardComponent   },
    { path: 'klaster',          component: KlasterDashboardComponent    },
    { path: 'investors',        component: InvestorsDashboardComponent  }
  ]},
  { path: 'login',      component: LoginComponent             },
  { path: 'not-found',  component: NotFoundComponent          },
  { path: '**', redirectTo: 'not-found', pathMatch: 'full'    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
