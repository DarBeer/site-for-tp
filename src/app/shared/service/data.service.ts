import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Image } from '../../data/image';
import 'rxjs/add/operator/map';

@Injectable()
export class DataService {

    constructor(private http: HttpClient) { }

    // GET images
    getImages(): Observable<Image[]> {
        const uri = 'http://localhost:80/data/images';
        return this
            .http
            .get<Image[]>(uri)
            .pipe(res => {
                return res;
            });
    }

    // ADD image
    addImage(heading, description, imageName, img): Observable<Image> {
        const uri = 'http://localhost:80/data/images/add';
        const uri_img = 'http://localhost:80/data/images/upload';
        const headers = new HttpHeaders();
        const obj = {
            heading: heading,
            description: description,
            urlImage: imageName,
            date: Date.now()
        };
        this.http
            .post(uri_img, img)
            .subscribe(res =>
                console.log(res));
        return this.http
            .post<Image>(uri, obj,{headers:headers})
            .pipe(res => {
                return res;
            });
    }

    // EDIT image

    // UPDATE image

    // DELETE image
    delImage(id) {
        const uri = 'http://localhost:80/data/images/delete/' + id;
        return this
            .http
            .get(uri)
            .pipe(res => {
                return res;
            });
    }

}