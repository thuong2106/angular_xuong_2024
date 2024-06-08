import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from '../../../../services/product.service';
import { NgFor, NgIf } from '@angular/common';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../types/Category';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgIf, CalendarModule, FormsModule],
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css'],
})
export class ProductEditComponent implements OnInit {
  productService = inject(ProductService);
  categoryService = inject(CategoryService);
  toastr = inject(ToastrService);
  route = inject(ActivatedRoute);
  router = inject(Router);
  productId!: string;
  categories: Category[] = [];

  addProductForm: FormGroup = new FormGroup({
    title: new FormControl('', [Validators.required, Validators.minLength(6)]),
    image: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    description: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    category: new FormControl('', Validators.required),
    isShow: new FormControl(true),
    bidTime: new FormControl(''),
    startAt: new FormControl(''),
  });
  datetime24h: any = new Date();

  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.productId = param['id'];

      // Fetch categories
      this.categoryService.getCategories().subscribe({
        next: () => {
          this.categoryService.getCategories().subscribe((data) => {
            this.categories = data;
          });
        },
        error: (error) => {
          console.error('Error fetching categories:', error);
        },
      });

      // Fetch product details
      this.productService.getProductDetails(this.productId).subscribe({
        next: (data) => {
          // const now = new Date(data.startAt);
          // now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
          // const startAt = now.toISOString().slice(0, 16);
          // console.log(startAt);
          this.addProductForm.patchValue({
            ...data,
            startAt: new Date(data.startAt),
            category: data.category._id,
          });
        },
        error: (error) => {
          console.error('Error fetching product details:', error);
        },
      });
    });
  }

  handleEditProduct() {
    if (this.addProductForm.invalid) {
      this.addProductForm.markAllAsTouched();
      return;
    }

    this.productService
      .editProduct(this.productId, this.addProductForm.value)
      .subscribe({
        next: () => {
          this.toastr.success('Cập nhật sản phẩm thành công');
          this.router.navigate(['/admin/products/list']);
        },
        error: () => {
          this.toastr.error('Cập nhật sản phẩm thất bại');
        },
      });
  }
}
