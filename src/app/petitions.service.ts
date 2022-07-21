import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PetitionsService {

  constructor(private http: HttpClient) { }


  getUser(): Observable<any>{
    return this.http.get('');
  }

  validateUser(user: any): Observable<any>{
    return this.http.post('', user);
  }

  createUser(user: any){
    return this.http.post('http://localhost/Tests/PruebaRegister/validatePHP.php', user);
  }

  alterUser(user: any): Observable<any>{
    return this.http.put('', user);
  }
}
