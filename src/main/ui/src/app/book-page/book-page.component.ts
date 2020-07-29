import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../service/book.service';
import { Book } from '../entity/book';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.scss']
})
export class BookPageComponent implements OnInit {
  book: Book;

  constructor(private route: ActivatedRoute, private bookService: BookService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.bookService.findById(params.id).subscribe((book) => {
        this.book = book;
        console.log('book', book);
      })
    });
  }

}
