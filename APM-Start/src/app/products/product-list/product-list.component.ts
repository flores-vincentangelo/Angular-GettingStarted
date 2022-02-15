import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from 'src/app/shared/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'pm-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy{


  pageTitle: string = "Product List";
  imageWidth: number = 50;
  imageMargin: number = 2;
  listFilter = 'cart';
  showImage: boolean = true;
  filteredProducts: IProduct[] = [];
  products: IProduct[] = [];
  errorMessage: string = '';
  sub!: Subscription;

  constructor(private productService: ProductService) { }
  
  performFilter(filterBy: string) : IProduct[]{
    filterBy = filterBy.toLocaleLowerCase();
    return this.products.filter((product: IProduct) => {
      product.productName.toLocaleLowerCase().includes(filterBy);
    });
  }

  toggleImage(): void{
    this.showImage = !this.showImage 
  }

  ngOnInit(): void {
    this.sub = this.productService.getProducts().subscribe({
      next: data => {
        this.products = data;
        this.filteredProducts = this.products;
      },
      error: err => this.errorMessage = err
    });
  }

  ngOnDestroy(): void {
      this.sub.unsubscribe();
  }

}
