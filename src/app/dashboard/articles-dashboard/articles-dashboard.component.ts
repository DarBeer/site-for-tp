import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';

import { ToastrService } from 'ngx-toastr';

import { Article } from 'src/app/data/article';
import { ArticleService } from 'src/app/shared/service/atricle.service';

@Component({
  selector: 'app-articles-dashboard',
  templateUrl: './articles-dashboard.component.html',
  styleUrls: ['./articles-dashboard.component.scss']
})
export class ArticlesDashboardComponent implements OnInit, AfterViewInit {

  @ViewChild(MdbTablePaginationComponent, { static: true }) mdbTablePagination: MdbTablePaginationComponent;
  @ViewChild(MdbTableDirective, { static: true }) mdbTable: MdbTableDirective
  private errorMessage: string;
  articles: Article[];
  article: Article;
  previous: any = [];
  headElements = ['Изображение', 'ID', 'Название', 'Содержание', 'Дата', ' '];

  constructor(private cdRef: ChangeDetectorRef, private service: ArticleService, private toastr: ToastrService) { }

  ngOnInit() {

    this.getArticles();

    this.mdbTable.setDataSource(this.articles);
    this.articles = this.mdbTable.getDataSource();
    this.previous = this.mdbTable.getDataSource();
  }

  ngAfterViewInit() {
    this.mdbTablePagination.setMaxVisibleItemsNumberTo(5);

    this.mdbTablePagination.calculateFirstItemIndex();
    this.mdbTablePagination.calculateLastItemIndex();
    this.cdRef.detectChanges();
  }

  getArticles(): void {
    this.service.getArticles()
                .subscribe(
                  articles => this.articles = articles,
                  error => this.errorMessage = error
                );
  }

  // DELETE article
  delArticle(id:any) {
    this.service.delArticle(id)
        .subscribe(
            res => {
                this.toastr.error('Статья удалена');
                this.service.getArticles()
                    .subscribe(article => this.articles = article)
            },
            error => this.errorMessage = error,
        )
  }
}
