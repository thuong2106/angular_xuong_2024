import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product, ProductForm } from '../types/Product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'http://localhost:4000/product';

  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>(this.apiUrl);
  }

  createProduct(data: ProductForm) {
    return this.http.post(this.apiUrl, data);
  }

  editProduct(id: string, data: ProductForm) {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getProductDetails(id: string) {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }
}
