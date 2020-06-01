import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/data/article';
import { ArticleService } from 'src/app/shared/service/atricle.service';
import { Metrika } from 'ng-yandex-metrika';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

articles: Article[];

  constructor(
    private service: ArticleService, 
    private metrika: Metrika,
    private router: Router,
    private location: Location,
  ) {
    let prevPath = location.path();
    this.router
    .events.pipe(
      filter(event => (event instanceof NavigationEnd))
    )
    .subscribe(() => {
      const newPath = location.path();
      this.metrika.hit(newPath, {
        referer: prevPath,
      });
      prevPath = newPath;
    });
  }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.service.getArticles().subscribe(articles => {
      this.articles = articles;
    });
  }

}
