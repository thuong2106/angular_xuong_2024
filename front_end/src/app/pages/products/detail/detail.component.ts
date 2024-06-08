import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../../services/product.service';
import { Product } from '../../../types/Product';
import { NgFor, NgIf } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BidService } from '../../../services/bid.service';
import { DatePipe } from '@angular/common';
import { CountdownComponent, CountdownConfig } from 'ngx-countdown';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [NgIf, NgFor, ReactiveFormsModule, DatePipe, CountdownComponent],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.css',
})
export class ProductDetailComponent {
  route = inject(ActivatedRoute);
  productService = inject(ProductService);
  product!: Product | undefined;
  productId!: string;
  bidService = inject(BidService);
  config: CountdownConfig = {
    leftTime: 0,
  };
  bidForm: FormGroup = new FormGroup({
    price: new FormControl('', [Validators.min(1)]),
  });

  getProductDetail(id: string) {
    this.productService.getProductDetails(id).subscribe({
      next: (data) => {
        this.product = data;
        const stepTimeBid = Math.floor(
          (new Date(data.endAt).getTime() - new Date().getTime()) / 1000
        );
        console.log(stepTimeBid);
        if (stepTimeBid > 0) {
          this.config = {
            leftTime: stepTimeBid,
          };
        } else {
          console.error('Invalid countdown time');
        }
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  ngOnInit() {
    this.route.params.subscribe((param) => {
      this.productId = param['id'];
      this.getProductDetail(this.productId);
    });
  }

  handleSubmit() {
    if (!this.product) return;
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    if (!Array.isArray(this.product.bids)) {
      console.error('Product bids are not defined or not an array');
      return;
    }

    this.bidService
      .createBid({
        product: this.product._id,
        bids: this.product.bids.map((bid) => bid._id),
        user: userId,
        price: this.bidForm.value.price,
        bidPriceMax: this.product.bidPriceMax,
      })
      .subscribe({
        next: (data) => {
          console.log(data);
          this.getProductDetail(this.productId);
        },
        error: (error) => {
          console.error(error.message);
        },
      });
  }
}
