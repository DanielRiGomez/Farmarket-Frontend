import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PetitionsService {

  constructor(private http: HttpClient) { }

  hostAdress = 'http://localhost:3000'

  getAllUsers(): Observable<any>{
    return this.http.get(`${this.hostAdress}/all-users`);
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
  alterEmail(emailUser:string, valueNew:string): Observable<any> {
    let user = {
      oldEmail: emailUser,
      newEmail: valueNew
    }
    return this.http.post(`${this.hostAdress}/updateemail`, user);
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
    let user = {
      email: emailUser
    }
    return  this.http.post(`${this.hostAdress}/delete`, user);
  }

  getAllProductos(): Observable<any>{
    return this.http.get(`${this.hostAdress}/all-publications`);
  }

  myPublications() : Observable<any>{
    return this.http.get(`${this.hostAdress}/user-publication`)
  }

  myInterests(email: String): Observable<any>{
    return  this.http.get(`${this.hostAdress}/user-interests`);
  }

  newPublication(titulo : String, emailOwner : String, isAvailabe : Boolean,
                 productType : String, description : String, imageAddress: String): Observable<any> {
    let user = {
      titulo : titulo,
      emailOwner : emailOwner,
      isAvailabe : isAvailabe,
      productType : productType,
      description : description,
      imageAddress: imageAddress
    }
    return  this.http.post(`${this.hostAdress}/add-publication`, user);
  }

  newInterest(email : String, idProduct : String): Observable<any>{
    let user = {
      emailOwner : email,
      idProduct : idProduct
    }
    return  this.http.post(`${this.hostAdress}/add-interest`, user);
  }

  deletePublication(emailOwner : String, idProduct : String): Observable<any> {
    let user = {
      emailOwner : emailOwner,
      idProduct : idProduct
    }
    return  this.http.post(`${this.hostAdress}/delete-publication`, user);
  }

  deleteIntesrest(emailOwner : String, idProduct : String): Observable<any> {
    let user = {
      emailOwner : emailOwner,
      idProduct : idProduct
    }
    return  this.http.post(`${this.hostAdress}/delete-interest`, user);
  }

  publicationInterests(idPublication: string): Observable<any> {
    let user = {
      id_publication : idPublication
    }
    return  this.http.post(`${this.hostAdress}/publication-interests`, user);
  }
}
