import { ProductService } from './../../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Product } from '../../../types/Product';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-home',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './list-home.component.html',
  styleUrl: './list-home.component.css'
})
export class ListHomeComponent {
  productService = inject(ProductService)
  products: Product[] = [];
  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (error) => {
        console.error('Có lỗi xảy ra:', error);
        alert('Đã xảy ra lỗi khi lấy dữ liệu sản phẩm.');
      },
    });
  }

}
