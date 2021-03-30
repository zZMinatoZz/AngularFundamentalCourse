import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/_models/book';
import { BookService } from 'src/app/_services/book.service';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-home-content',
  templateUrl: './home-content.component.html',
  styleUrls: ['./home-content.component.css']
})
export class HomeContentComponent implements OnInit, OnDestroy {

  books: any;
  subscriptions = new Subscription();

  constructor(private bookService: BookService, private cartService: CartService) { }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.subscriptions.add(this.bookService.getBooks().subscribe(data => {
      this.books = data;
    }));
  }

  addToCart(book: Book) {
    this.cartService.addToCart(book, false);
  }

}
