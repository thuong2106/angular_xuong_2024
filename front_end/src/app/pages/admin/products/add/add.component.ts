import { NgIf, NgFor } from '@angular/common';
import { ProductService } from './../../../../services/product.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from '../../../../types/Product';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { CalendarModule } from 'primeng/calendar';
import { CategoryService } from '../../../../services/category.service';
import { Category } from '../../../../types/Category';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule, NgIf, NgFor, ToastModule, CalendarModule, FormsModule],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css',
  providers: [MessageService]
})
export class ProductAddComponent {
productService = inject(ProductService)
categoryService = inject(CategoryService)
router = inject(Router);
toastr = inject(ToastrService)
products: Product[] = [];
categories: Category[] = []
messageService = inject(MessageService)

addProductForm: FormGroup = new FormGroup({
  title: new FormControl('', [Validators.required, Validators.minLength(6)]),
  image: new FormControl('', [Validators.required]),
  price: new FormControl('', [Validators.required, Validators.min(1)]),
  description: new FormControl('', [Validators.required, Validators.minLength(10)]),
  category: new FormControl('', Validators.required),
  isShow: new FormControl(true),
  startAt: new FormControl(''),
  bidTime: new FormControl(''),
});
datetime24h: any;
ngOnInit() {
  this.categoryService.getCategories().subscribe({
    next: (data)=> {
      this.categories = data;
    },
    error: (e)=> {
      this.toastr.error('Lỗi khi lấy danh sách danh mục')
    }
  });
}

handleCreateProduct() {
  console.log(this.addProductForm.value)
  if (this.addProductForm.invalid) {
    this.addProductForm.markAllAsTouched();
    console.error('Form is invalid');
    return;
  }

  this.productService.createProduct({ ...this.addProductForm.value, endAt: new Date()}).subscribe({
    next: () => {
      this.messageService.add({
        severity:'success',
        summary: 'Thông báo',
        detail: 'Tạo sản phẩm thành công'
      })
      setTimeout(()=> this.router.navigate(['/admin/products/list']), 1000)
    },
    error: () => {
      this.messageService.add({
        severity: 'error',
        summary: 'Thông báo',
        detail: 'Tạo sản phẩm thất bại'
      })
    }
  });
}
}
