import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Klaster } from '../../data/klaster';
import { catchError, map } from 'rxjs/operators';
import { Path } from './path';

@Injectable({
  providedIn: 'root'
})
export class KlasterService {

  path = Path.path;

  constructor(private http: HttpClient) { }

  // GET Klaster
  getKlaster(): Observable<Klaster> {
    const uri = this.path + '/data/klaster';
    return this
        .http
        .get<Klaster>(uri)
        .pipe(map(res => {
          return res;
        }));
}

// ADD Klaster
addKlaster(name, description): Observable<Klaster> {
    const uri = this.path + '/data/klaster/add';
    const headers = new HttpHeaders();
    const obj = {
        name: name,
        description: description,
        date: Date.now()
    };
    return this.http
        .post<Klaster>(uri, obj,{headers:headers})
        .pipe(map(res => {
          return res;
        }))
}

// DELETE Klaster
delKlaster(id:any) {
    const uri = this.path + '/data/klaster/delete/' + id;
    return this
        .http
        .get(uri)
        .pipe(map(res => {
            return res;
        }));
}
}
