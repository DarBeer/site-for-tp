import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ArticleService } from '../../../shared/service/atricle.service';
import { Article } from 'src/app/data/article';

import { Metrika } from 'ng-yandex-metrika';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.scss']
})
export class PageComponent implements OnInit {

  article = new Article();

  constructor(
    private route: ActivatedRoute,
    private service: ArticleService,
    private location: Location,
    private metrika: Metrika,
    private router: Router,
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
    this.getArticle();
  }

  getArticle(): void {
    this.service.getArticle(this.route.snapshot.paramMap.get('id')).subscribe(article => {
      this.article = article;
      console.dir(article)
    })
  }

  goBack(): void {
    this.location.back();
  }

}
