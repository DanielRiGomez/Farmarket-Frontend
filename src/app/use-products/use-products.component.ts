import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {PetitionsService} from "../petitions.service";
import {DomSanitizer} from "@angular/platform-browser";
import {$e} from "@angular/compiler/src/chars";

@Component({
  selector: 'app-use-products',
  templateUrl: './use-products.component.html',
  styleUrls: ['./use-products.component.css']
})
export class UseProductsComponent implements OnInit {

  emailUser = localStorage.getItem("UserEmail");
  baseImage = "";

  newPublication = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    image: new FormControl(''),
    describe: new FormControl('', Validators.required)
  })

  btnLogOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("UserEmail");
    localStorage.removeItem("typeUser");
    localStorage.removeItem("idUser");
    this.router.navigateByUrl('/');
  }

  btnMenu(){
    this.router.navigateByUrl('/inicio');
  }

  btnPerfil() {
    this.router.navigateByUrl('/perfil')
  }

  saveImage(e: any) {
    this.toBase64(e.target.files[0]).then(image => {
      // @ts-ignore
      this.baseImage = image.base;
    });
  }

  createPublication() {
    console.log(this.baseImage)
    this.petition.newPublication(this.newPublication.value.name, ""+localStorage.getItem("UserEmail"),
      true, this.newPublication.value.type, this.newPublication.value.describe, this.baseImage).subscribe(data => {
      if (data){
        alert(data.message);
        if(!data.accepted){
          this.invalidToken(data.message);
        }
      }
    })
  }

  // @ts-ignore
  toBase64 = async($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const readre = new FileReader();
      readre.readAsDataURL($event);
      readre.onload = () => {
        resolve({
          base: readre.result
        });
      };
      readre.onerror = error => {
        resolve({
          base: null
        });
      };
    } catch (e){
      return null;
    }
  })

  invalidToken(message: string){
    if(message == "Invalid Token"){
      this.btnLogOut();
    }
  }

  constructor(private router: Router, private petition: PetitionsService,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
  }

}
