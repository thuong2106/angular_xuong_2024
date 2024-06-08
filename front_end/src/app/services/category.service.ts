import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Category } from '../types/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  apiUrlCate = 'http://localhost:4000/category';
  http = inject(HttpClient)

  getCategories() {
    return this.http.get<Category[]>(this.apiUrlCate);
  }
}
