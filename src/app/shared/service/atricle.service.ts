import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Article } from '../../data/article';
import { catchError, map } from 'rxjs/operators';
import { PathService } from './path.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  path = PathService.path;

    constructor(private http: HttpClient) { }

    // GET articles
    getArticles(): Observable<Article[]> {
        const uri = 'http://tp.polessu.by/data/articles';
        return this
            .http
            .get<Article[]>(uri)
            .pipe(map(res => {
              return res;
            }));
    }

    // GET article
    getArticle(id:any): Observable<Article> {
        const uri = 'http://tp.polessu.by/articles/get-one/' + id;
        return this
            .http
            .get<Article>(uri)
            .pipe(map(res => {
              return res;
            }));
    }

    getArticlesLast(): Observable<Article[]> {
        const uri = 'http://tp.polessu.by/data/articles/last';
        return this
            .http
            .get<Article[]>(uri)
            .pipe(map(res => {
              return res;
            }));
    }

    // ADD article
    addArticle(heading, description, shortDescription, imageName, img): Observable<Article> {
        const uri = 'http://tp.polessu.by/data/articles/add';
        const uri_img = 'http://tp.polessu.by/data/articles/upload';
        const headers = new HttpHeaders();
        const obj = {
            heading: heading,
            description: description,
            shortDescription: shortDescription,
            urlImage: imageName,
            date: Date.now()
        };
        this.http
            .post(uri_img, img)
            .subscribe(res =>
                console.log(res));
        return this.http
            .post<Article>(uri, obj,{headers:headers})
            .pipe(map(res => {
              return res;
            }))
    }

    // DELETE article
    delArticle(id:any) {
        const uri = 'http://tp.polessu.by/data/articles/delete/' + id;
        return this
            .http
            .get(uri)
            .pipe(map(res => {
                return res;
            }));
    }

}