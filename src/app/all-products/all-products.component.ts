import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {PetitionsService} from "../petitions.service";
import * as events from "events";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  pages: number = 1;

  @ViewChild('products', {static: true}) products!: ElementRef;

  allPublications: any = [];
   publications: any[] = [];

  constructor(private render: Renderer2, private router: Router,
              private petition: PetitionsService, private modal: NgbModal) { }

  ngOnInit(): void {
    this.askPublications();
  }

  askPublications(): void{
    this.petition.getAllProductos().subscribe(data => {
      if (data){
        if(data.message){
          alert(data.message);
          this.invalidToken(data.message());
        }else {
          for (const i of data) {
            let imageAd = "";
            if(i.imageAddress == null){
              imageAd = "./assets/images/iconoPublication.png";
            }else {
              imageAd = i.imageAddress;
            }
            let newP = {
              id: i.id_publication,
              titulo: i.titulo,
              emailOwner: i.emailOwner,
              availabe: i.isAvailabe,
              tipo: i.productType,
              description: i.description,
              image: imageAd
            }
            this.allPublications.push(newP);
            this.publications.push(newP);
          }
        }
      }
    })
  }

  invalidToken(message: string){
    if(message == "Invalid Token"){
      this.btnLogOut();
    }
  }

  filterType(type: any){
    this.publications = [];
    if(type.target.value == "all"){
      for (let i = 0; i < this.allPublications.length; i++) {
        this.publications.push(this.allPublications[i]);
      }
    }else {
      for (let i = 0; i < this.allPublications.length; i++) {
        if(this.allPublications[i].tipo === type.target.value)
          this.publications.push(this.allPublications[i]);
      }
    }
  }

  btnLogOut(){
    localStorage.removeItem("token");
    localStorage.removeItem("UserEmail");
    localStorage.removeItem("idUser");
    this.router.navigateByUrl('/');
  }

  selectInterest(e: any) {
    this.petition.newInterest(""+localStorage.getItem("idUser"), e.target.value).subscribe(data => {
      if (data){
        alert(data.message);
        if(!data.accepted){
          this.invalidToken(data.message);
        }else {
          window.location.reload();
        }
      }
    });
  }

  openModal(content: any) {
    this.modal.open(content);
  }


}
