import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookService } from 'src/app/_services/book.service';
import { onlyInputNumber } from 'src/app/_validators/onlyInputNumber-validator';

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit, OnDestroy {

  book: any;

  private subscriptions = new Subscription();

  editForm = this.fb.group({
    bookName: ['', [Validators.required]],
    author: ['', [Validators.required]],
    price: ['', [Validators.required, onlyInputNumber]],
  })

  controls = {
    bookName: this.editForm.get('bookName'),
    author: this.editForm.get('author'),
    price: this.editForm.get('price')
  }


  constructor(private bookService: BookService, private route: ActivatedRoute, private fb: FormBuilder, private toastrService: ToastrService) {

  }
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.getBook();
  }

  getBook() {
    this.subscriptions.add(
      this.route.params.pipe(map(params => params.id)).subscribe(param => {
        this.bookService.getBook(param).subscribe(data => {
          this.book = data;
          console.log(data);
        }, error => {
          console.log(error);
        })
      }, error => {
        console.log(error);
      })
    );
  }

  saveData() {
    this.subscriptions.add(
      this.route.params.pipe(
        map(params => params.id)
      ).subscribe(param => {
        this.bookService.updateBook(+param, this.book).subscribe(_ => {
          this.toastrService.success('Update Successfully!');
          this.editForm.reset(this.book);
        }, error => {
          this.toastrService.error('Something wrong!');
          console.log(error);
        })
      }, error => {
        console.log(error);
      })
    )
  }

   clearData() {

   }

}
