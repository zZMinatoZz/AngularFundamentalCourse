import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { Book } from '../_models/book';

const httpHeaders = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  apiUrl = 'http://localhost:3000/';

  private books: any = [];

  currentBooks$ = new Subject();

  constructor(private http: HttpClient) { }

  getBooks() {
    return this.http.get(this.apiUrl + 'books');
  }

  getBook(id: number) {
    return this.http.get(this.apiUrl + `books/${id}`);
  }

  updateBook(id: number, book: any) {
    return this.http.put(this.apiUrl + `books/${id}`, book, httpHeaders);
  }

  addBook(book: Book) {
    return this.http.post(this.apiUrl + 'books', book, httpHeaders);
  }

  removeBook(id: number) {
    return this.http.delete(this.apiUrl + `books/${id}`);
  }
}
