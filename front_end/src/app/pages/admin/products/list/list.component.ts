import { ProductService } from './../../../../services/product.service';
import { Component, inject } from '@angular/core';
import { Product } from '../../../../types/Product';
import { NgFor } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Category } from '../../../../types/Category';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, RouterLink, RouterModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ProductListComponent {
  category: Category[] = [];
  products: Product[] = [];
  productService = inject(ProductService);
  toastr = inject(ToastrService);

  ngOnInit() {
    this.productService.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (error) => {
        console.error('Có lỗi xảy ra:', error);
        alert('Đã xảy ra lỗi khi lấy dữ liệu sản phẩm.');
      },
    });
  }

  handleDelete(id: string) {
    if (window.confirm(`Are you sure you want to delete product id: ${id}`)) {
      this.productService.deleteProduct(id).subscribe({
        next: () => {
          this.toastr.success('Xóa sản phẩm thành công');
          this.products = this.products.filter((item) => item._id !== id);
        },
        error: (error) => {
          this.toastr.error('Xóa sản phẩm thất bại');
        },
      });
    }
  }
}
