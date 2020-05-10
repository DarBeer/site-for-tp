import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Investor } from '../../data/investor';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InvestorsService {

  constructor(private http: HttpClient) { }

  // GET Investors
  getInvestor(): Observable<Investor[]> {
    const uri = 'https://shielded-oasis-48709.herokuapp.com/data/investors';
    return this
        .http
        .get<Investor[]>(uri)
        .pipe(map(res => {
          return res;
        }));
}

// ADD Investors
addInvestor(name, urlToInv, imageName, img): Observable<Investor> {
    const uri = 'https://shielded-oasis-48709.herokuapp.com/data/investors/add';
    const uri_img = 'https://shielded-oasis-48709.herokuapp.com/data/investors/upload';
    const headers = new HttpHeaders();
    const obj = {
        name: name,
        urlImage: imageName,
        urlToInv: urlToInv
    };
    this.http
        .post(uri_img, img)
        .subscribe(res =>
            console.log(res));
    return this.http
        .post<Investor>(uri, obj,{headers:headers})
        .pipe(map(res => {
          return res;
        }))
}

// DELETE Investors
delInvestor(id:any) {
    const uri = 'https://shielded-oasis-48709.herokuapp.com/data/investors/delete/' + id;
    return this
        .http
        .get(uri)
        .pipe(map(res => {
            return res;
        }));
}
}
