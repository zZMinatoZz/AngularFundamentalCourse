import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { BookService } from 'src/app/_services/book.service';

@Component({
  selector: 'app-admin-books',
  templateUrl: './admin-books.component.html',
  styleUrls: ['./admin-books.component.css']
})
export class AdminBooksComponent implements OnInit, OnDestroy {

  books: any = [];
  displayedColumns: string[] = [
    'id', 'bookName', 'author', 'price', 'img', 'quantity', 'operations'
  ]

  subscriptions = new Subscription();

  constructor(private bookService: BookService, private toastrService: ToastrService) { }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.getBooks();
  }

  getBooks() {
    this.subscriptions.add(this.bookService.getBooks().subscribe(data => {
      this.books = data;
    }, error => {
      console.log(error);
    }));
  }

  removeBook(id: number) {
    if(confirm('Are you sure to delete this book?')) {
      this.subscriptions.add(this.bookService.removeBook(id).subscribe(() => {
        this.books = this.books.filter(b => b.id !== id);
        this.bookService.currentBooks$.next(this.books);
        this.toastrService.success('This book has been removed!');
      }, error => {
        this.toastrService.error('Something wrong!');
        console.log(error);
      }));
    }
  }

}
