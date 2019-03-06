import { Component, OnInit } from '@angular/core';
import { ProductService } from './product.service';
import { Product, Page } from '../models/models';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  private products: Array<Product> = []
  private page : Page;
  private totalElements : Number;
  private key : String = "";
  constructor(private service: ProductService) { }

  ngOnInit() {
    // this.pageProducts(0,10);
  }

  buscar(key){
    this.key = key;
    this.pageProducts(0,10);
  }

  listProducts(){
    this.service.getProductList().subscribe(res => {
      this.products = res;
    });
  }

  pageProducts(page, size){
    this.service.getProductPage(this.key, page, size).subscribe(res => {
      this.page = res
      this.products = this.page.content;
      this.totalElements = this.page.totalElements;
    });
  }

  changePage(event){
   this.pageProducts(event.page, event.size);
  }

}
