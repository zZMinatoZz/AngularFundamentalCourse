import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Book } from '../_models/book';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  books: Book[] = [];
  currentBookSource$ = new BehaviorSubject<Book[]>(this.books);

  constructor() { }

  addToCart(book: any, multiAdd: boolean = false) {
    debugger;
    const indexOfBookExist = this.books.findIndex(b => b.id === book.id);

    // if has existed
    if(indexOfBookExist > -1) {
      if(multiAdd) {
        this.books[indexOfBookExist].quantity += book.quantity;
      } else {
        this.books[indexOfBookExist].quantity += 1;
      }
      
    } else {
      this.books.push(book);
    }
    // emit new value
    this.currentBookSource$.next(this.books)
  }

   removeFromCart(book: Book) {

     this.books.splice(this.books.findIndex(b => b.id === book.id), 1)

     this.currentBookSource$.next(this.books);
   }

   clearCart() {
     this.books = [];
     this.currentBookSource$.next(this.books)
   }

   getBooksOnCart() {
     return of(this.books);
   }

   calculateTotalPriceOfBook(book: Book) {
     return book.price * book.quantity;
   }

   calculateTotalPriceOfBooksOnCart(books: Book[]) {
      return books.map(b => b.price * b.quantity).reduce((total, val) => { return total + val }, 0);
   }

   changeBookQuantity(book: Book, quantity: number) {
    const index = this.books.findIndex(b => b.id === book.id);
    this.books[index].quantity = quantity;
    this.currentBookSource$.next(this.books);
   }
}
