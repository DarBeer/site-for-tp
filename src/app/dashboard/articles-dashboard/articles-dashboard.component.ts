import { MdbTablePaginationComponent, MdbTableDirective } from 'angular-bootstrap-md';

import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from "@angular/forms";
import { ToastrService } from 'ngx-toastr';

import { PathService } from '../../shared/service/path.service';

import { Article } from 'src/app/data/article';
import { ArticleService } from 'src/app/shared/service/atricle.service';

@Component({
  selector: 'app-articles-dashboard',
  templateUrl: './articles-dashboard.component.html',
  styleUrls: ['./articles-dashboard.component.scss']
})
export class ArticlesDashboardComponent implements OnInit, AfterViewInit {

  path = PathService.path;

  private errorMessage: string;
  articles: Article[];
  article: Article;

  articleForm: FormGroup;
  editorContent: string;
  imageFile: File = null;
  imageDef: string ='../../../assets/img/noimage.png';

  constructor(private cdRef: ChangeDetectorRef, 
              private service: ArticleService, 
              private toastr: ToastrService,
              private form: FormBuilder) 
    { this.createForm(); }

  ngOnInit() {
    this.getArticles();
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
  }

  createForm() {
    this.articleForm = this.form.group({
        heading: ['', Validators.required ],
        description: [''],
        shortDescription: ['', Validators.required ],
        urlImage: [''],
    });
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

  // GET uploaded file info
  onSelectedFile(event) {
    if (<File>event.target.files[0] != null) {
        this.imageFile = <File>event.target.files[0];
    } else {
        this.imageFile = null;
    }

    // Image preview
    const reader = new FileReader();
    reader.onload = (event:any) => {
        this.imageDef = event.target.result
    };
    reader.readAsDataURL(this.imageFile)
  }

  // ADD article
  addArticle(heading, description, shortDescription) {
    let img = new FormData();
    let imageName;
    if (this.imageFile !== null) {
        img.append('articleImage', this.imageFile, this.imageFile.name);
        imageName = 'http://tp.polessu.by/uploads/article/' + this.imageFile.name;
        this.service.addArticle(heading, description, shortDescription, imageName, img)
            .subscribe(
                article => {
                    this.articles.push(article);
                    this.toastr.success('Статья добавлена');
                    this.articleForm.reset();
                    this.service.getArticles()
                        .subscribe(articles => this.articles = articles);
                },
                error => this.errorMessage = error
            );
    } else {
        this.service.addArticle(heading, description, shortDescription, imageName, img)
            .subscribe(
                article => {
                    this.articles.push(article);
                    this.toastr.success('Статья добавлена');
                    this.articleForm.reset();
                    this.service.getArticles()
                        .subscribe(articles => this.articles = articles);
                },
                error => this.errorMessage = error
            );
    }
}

}
