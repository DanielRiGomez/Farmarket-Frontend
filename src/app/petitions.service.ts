import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PetitionsService {

  constructor(private http: HttpClient) { }


  getUser(): Observable<any>{
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }

  validateUser(user: any): Observable<any>{
    return this.http.post('https://jsonplaceholder.typicode.com/users', user);
  }

  createUser(register: any): Observable<any>{
    return this.http.post('https://jsonplaceholder.typicode.com/users', register);
  }

  alterUser(user: any): Observable<any>{
    return this.http.put('https://jsonplaceholder.typicode.com/users', user);
  }
}
