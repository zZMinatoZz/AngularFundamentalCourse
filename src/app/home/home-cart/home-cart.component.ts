import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/_models/book';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-home-cart',
  templateUrl: './home-cart.component.html',
  styleUrls: ['./home-cart.component.css']
})
export class HomeCartComponent implements OnInit, OnDestroy {

  booksOnCart: Book[] = [];
  totalPrice: number = 0;

  displayedColumns: string[] = ['identify', 'image', 'bookname', 'quantity', 'totalPrice', 'operation']

  subscriptions = new Subscription();


  constructor(private cartService: CartService, private toastrService: ToastrService) { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.getBooksOnCart();
    this.calculateTotalPriceOfBooksOnCart();
  }

  getBooksOnCart() {
    this.subscriptions.add(this.cartService.getBooksOnCart().subscribe(data => {
      this.booksOnCart = data;
    }, error => {
      console.log(error);
    }))
  }

  removeFromCart(book: Book) {
    this.cartService.removeFromCart(book);
  }

  calculateTotalPriceOfBook(book: Book) {
    return this.cartService.calculateTotalPriceOfBook(book);
  }

  calculateTotalPriceOfBooksOnCart() {
    this.subscriptions.add(this.cartService.currentBookSource$.subscribe(data => {
      this.totalPrice = this.cartService.calculateTotalPriceOfBooksOnCart(data);
    }))
  }

  changeCount(book: Book, value: any) {
    this.cartService.changeBookQuantity(book, +value);
  }

  clearCart() {
    this.booksOnCart = [];
    this.cartService.clearCart();
  }

  checkOut() {
    if(confirm("Are you sure to checkout all items?")) {
      this.toastrService.success('All items have been checkout');
      this.clearCart();
    }
  }

}
