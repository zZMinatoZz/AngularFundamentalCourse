import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/_models/book';
import { BookService } from 'src/app/_services/book.service';
import { onlyInputNumber } from 'src/app/_validators/onlyInputNumber-validator';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();

  private books: any = [];

  book: Book = {
    bookName: '',
    author: '',
    price: 0,
    img: './assets/images/default.jpg'
  };

  createForm = this.fb.group({
    bookName: ['', [Validators.required]],
    author: ['', [Validators.required]],
    price: ['', [Validators.required, Validators.min(50000), onlyInputNumber]],
  });

  controls = {
    bookName: this.createForm.get('bookName'),
    author: this.createForm.get('author'),
    price: this.createForm.get('price')
  }

  constructor(private fb: FormBuilder, private bookService: BookService, private toastrService: ToastrService) { }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.bookService.getBooks().subscribe(data => {
      this.books = data;
    }));
  }

  createBook() {
    if(this.checkExist(this.book.bookName)) {
      this.toastrService.error('This book has existed!');
    } else {
      this.subscriptions.add(this.bookService.addBook(this.book).subscribe((data) => {
        this.books.push(data);
        this.toastrService.success('This book was created successfully!');
        this.createForm.reset(this.book);
      }, error => {
        this.toastrService.error('Something wrong!');
        console.log(error);
      }));
    }
  }

  checkExist(bookName: string): boolean {
    const bookExist = this.books.filter(b => b.bookName === bookName);
    if(bookExist.length > 0) return true;
    return false;
  }

}
