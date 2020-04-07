import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/data/article';
import { ArticleService } from 'src/app/shared/service/atricle.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})
export class ArticlesComponent implements OnInit {

articles: Article[];

  constructor(private service: ArticleService) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.service.getArticles().subscribe(articles => {
      this.articles = articles;
    });
  }

}
