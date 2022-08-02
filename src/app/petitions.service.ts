import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PetitionsService {

  constructor(private http: HttpClient) { }

  hostAdress = 'http://localhost:3000'

  getUser(): Observable<any>{
    return this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  }

  validateUser(emailUser: string, passUser: string): Observable<any>{
    let user = {
      email: emailUser,
      password: passUser
    }
    return this.http.post(`${this.hostAdress}/login`, user);
  }

  createUser(emailUser: string, passUser: string, nameUser: string): Observable<any>{
    let register = {
      email: emailUser,
      password: passUser,
      name: nameUser
    }
    return this.http.post(`${this.hostAdress}/register`, register);
  }

  alterUser(emailUser: string, valueNew: string): Observable<any>{
    let user = {
      email: emailUser,
      valueNew: valueNew
    }
    return this.http.post(`${this.hostAdress}/updateuser`, user);
  }
  alterEmail(emailUser:string, valueNew:string){

  }

  alterPass(emailUser: string, passNew: string, passOld: string): Observable<any>{
    let user = {
      email: emailUser,
      passOld: passOld,
      passNew: passNew
    }

    return this.http.put(`${this.hostAdress}/updatepass`, user);
  }

  deleteUser(emailUser: string): Observable<any>{
    let userDelete = {
      email: emailUser
    }
    return  this.http.delete('');
  }

  testMethod() : Observable<any>  {
    return this.http.get(`${this.hostAdress}/test`);
  }
}
