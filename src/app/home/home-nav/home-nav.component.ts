import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/_services/cart.service';

@Component({
  selector: 'app-home-nav',
  templateUrl: './home-nav.component.html',
  styleUrls: ['./home-nav.component.css']
})
export class HomeNavComponent implements OnInit, OnDestroy {

  booksCount = 0;
  subscriptions = new Subscription();

  constructor(private cartService: CartService) { }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.countOfBooks();
  }

  countOfBooks() {
    this.subscriptions.add(this.cartService.currentBookSource$.subscribe(data => {
      this.booksCount = data.length;
    }, error => {
      console.log(error);
    }));
  }

}
