import { Component, OnInit } from '@angular/core';
import { Article } from 'src/app/data/article';
import { ArticleService } from 'src/app/shared/service/atricle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  articles: Article[];

  constructor(private service: ArticleService) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.service.getArticlesLast().subscribe(articles => {
      this.articles = articles;
    });
  }

}
