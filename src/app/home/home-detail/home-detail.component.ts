import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from 'src/app/_services/book.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-home-detail',
  templateUrl: './home-detail.component.html',
  styleUrls: ['./home-detail.component.css']
})
export class HomeDetailComponent implements OnInit, OnDestroy {

  book: any;
  subscriptions: Subscription;
  // quantity: number = 1;

  constructor(private bookService: BookService, private route: ActivatedRoute, private cartService: CartService) { }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.getBook();
  }

  getBook() {
    this.subscriptions = this.route.params.pipe(
      map(params => params.id)
    ).subscribe(param => {
      this.bookService.getBook(+param).subscribe(data => {
        this.book = data;
      })
    });
  }

  increase() {
    if(this.book.quantity < 20) this.book.quantity++;
  }

  decrease() {
    if(this.book.quantity > 1) this.book.quantity--;
  }

  addToCart(book: any) {
    this.cartService.addToCart(book, true);
  }

}
