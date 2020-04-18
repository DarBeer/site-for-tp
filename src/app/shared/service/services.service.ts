import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Services } from '../../data/service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

    constructor(private http: HttpClient) { }

    // GET Services
    getServices(): Observable<Services[]> {
        const uri = 'http://localhost:3000/data/services';
        return this
            .http
            .get<Services[]>(uri)
            .pipe(map(res => {
              return res;
            }));
    }

    // GET Services
    getService(id:any): Observable<Services> {
        const uri = 'http://localhost:3000/data/services/get-one/' + id;
        return this
            .http
            .get<Services>(uri)
            .pipe(map(res => {
              return res;
            }));
    }

    getServicesLast(): Observable<Services[]> {
        const uri = 'http://localhost:3000/data/services/last';
        return this
            .http
            .get<Services[]>(uri)
            .pipe(map(res => {
              return res;
            }));
    }

    // ADD Services
    addService(heading, description, shortDescription, imageName, img): Observable<Services> {
        const uri = 'http://localhost:3000/data/services/add';
        const uri_img = 'http://localhost:3000/data/services/upload';
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
            .post<Services>(uri, obj,{headers:headers})
            .pipe(map(res => {
              return res;
            }))
    }

    // DELETE Services
    delService(id:any) {
        const uri = 'http://localhost:3000/data/services/delete/' + id;
        return this
            .http
            .get(uri)
            .pipe(map(res => {
                return res;
            }));
    }

}