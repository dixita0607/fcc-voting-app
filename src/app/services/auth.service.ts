import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import "rxjs/add/observable/of";
import {User} from "../models/user";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AuthService {

  private apiUrl = '/api';

  user: User = null;

  constructor(private httpClient: HttpClient) {
    this.httpClient.get(this.apiUrl + '/user')
      .subscribe((user: User) => {
          this.user = user;
        }, (response: HttpErrorResponse) => {
          if (response.status !== 404) console.log(response.error);
        }
      );
  }

  logOut(): Observable<string> {
    return this.httpClient.post(this.apiUrl + '/logout', null, {
      withCredentials: true,
      responseType: 'text'
    }).map(response => this.user = null);
  }

}
