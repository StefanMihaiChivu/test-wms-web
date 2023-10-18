import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Item } from '../models';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ItemService {
  constructor(private http: HttpClient) {}

  getItem(): Observable<any>{
    return this.http.get<Item[]>(`${environment.baseUrl}/products`)
  }
  getItemById(id: number): Observable<any>{
    return this.http.get<Item[]>(`${environment.baseUrl}/products/${id}`)
  }

  addItem(item: Item){
    return this.http.post<Item>(`${environment.baseUrl}/products`, item)
  }

  editItem(item: Item){
    return this.http.patch<Item>(`${environment.baseUrl}/products/${item.id}`, item)
  }

  deleteItem(id: number){
    return this.http.delete<Item>(`${environment.baseUrl}/products/${id}`)
  }
}
