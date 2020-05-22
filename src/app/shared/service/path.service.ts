import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PathService {

    static path: string = '127.0.0.1:80/data/';
}
