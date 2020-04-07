import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ArticleService } from '../../../shared/service/atricle.service';
import { Article } from 'src/app/data/article';

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
    private location: Location
  ) { }

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
