import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Service } from '../../data/service';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

    constructor(private http: HttpClient) { }

    // GET Services
    getServices(): Observable<Service[]> {
        const uri = 'http://localhost:3000/data/services';
        return this
            .http
            .get<Service[]>(uri)
            .pipe(map(res => {
              return res;
            }));
    }

    // GET Services
    getService(id:any): Observable<Service> {
        const uri = 'http://localhost:3000/data/services/get-one/' + id;
        return this
            .http
            .get<Service>(uri)
            .pipe(map(res => {
              return res;
            }));
    }

    getServicesLast(): Observable<Service[]> {
        const uri = 'http://localhost:3000/data/services/last';
        return this
            .http
            .get<Service[]>(uri)
            .pipe(map(res => {
              return res;
            }));
    }

    // ADD Services
    addService(heading, description, shortDescription, imageName, img): Observable<Service> {
        const uri = 'http://localhost:3000/data/services/add';
        const uri_img = 'http://localhost:3000/data/services/upload';
        const headers = new HttpHeaders();
        const obj = {
            heading: heading,
            description: description,
            shortDescription: shortDescription,
            imgUrl: imageName
        };
        this.http
            .post(uri_img, img)
            .subscribe(res =>
                console.log(res));
        return this.http
            .post<Service>(uri, obj,{headers:headers})
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