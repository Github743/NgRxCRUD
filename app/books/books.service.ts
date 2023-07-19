import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Book } from './store/book';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private httpClient: HttpClient) { }

  get() {
    return this.httpClient.get<Book[]>('http://localhost:3000/books')
  }

  create(payLoad: Book) {
    return this.httpClient.post<Book>('http://localhost:3000/books', payLoad);
  }

  update(payLoad: Book) {
    return this.httpClient.put<Book>(`http://localhost:3000/books/${payLoad.id}`, payLoad);
  }

  delete(id: number) {
    return this.httpClient.delete(`http://localhost:3000/books/${id}`);
  }
}
