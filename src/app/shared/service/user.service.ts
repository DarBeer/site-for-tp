import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from '../../data/user';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private  isUserLoggedIn;
  private username = 'root@polessu.by';
  private password = 'tehnoparkouR';

  constructor() {
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn(login, pass) {
      if (login === this.username && pass === this.password) {
          this.isUserLoggedIn = true;
          return this.getUserLoggedIn();
      } else {
          return this.getUserLoggedIn();
      }
  }

  getUserLoggedIn() {
      return this.isUserLoggedIn;
  }

    
}
