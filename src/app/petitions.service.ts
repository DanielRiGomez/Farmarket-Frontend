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

  validateUser(emailUser: string, passUser: string): Observable<any>{
    let user = {
      email: emailUser,
      pass: passUser
    }
    return this.http.post('https://jsonplaceholder.typicode.com/users', user);
  }

  createUser(emailUser: string, passUser: string, nameUser: string): Observable<any>{
    let register = {
      email: emailUser,
      pass: passUser,
      name: nameUser
    }
    return this.http.post('https://jsonplaceholder.typicode.com/users', register);
  }

  alterUser(emailUser: string, feature: string, valueNew: string): Observable<any>{
    let user = {
      email: emailUser,
      feature: feature,
      valueNew: valueNew
    }
    return this.http.put('https://jsonplaceholder.typicode.com/users', user);
  }

  alterPass(emailUser: string, passNew: string, passOld: string): Observable<any>{
    let user = {
      email: emailUser,
      passOld: passOld,
      passNew: passNew
    }

    return this.http.put('https://jsonplaceholder.typicode.com/users', user);
  }

  deleteUser(emailUser: string): Observable<any>{
    let userDelete = {
      email: emailUser
    }
    return  this.http.delete('');
  }
}
