import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@envs/environment.development';
import { tap } from 'rxjs';

import { Product } from '@shared/models/product.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
  public products = signal<Product[]>([]);

  private readonly _http = inject(HttpClient);
  private readonly _endPoint = environment.apiUrl;

  constructor() {
    this.getProducts();
  }

  public getProducts() {
    this._http
      .get<Product[]>(`${this._endPoint}?sort=desc`)
      .pipe(tap((data: Product[]) => this.products.set(data)))
      .subscribe();
  }

  public getProductById(id: number) {
    return this._http.get<Product>(`${this._endPoint}/${id}`);
  }
}
