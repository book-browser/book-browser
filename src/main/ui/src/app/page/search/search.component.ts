import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from 'src/app/service/book.service';
import { Book } from 'src/app/entity/book';
import { BookSummary } from 'src/app/entity/book-summary';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  books: BookSummary[];
  query = '';

  constructor(private route: ActivatedRoute, private router: Router, private bookService: BookService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params.query) {
        this.query = params.query;
        this.bookService.search(params.query).subscribe((books) => {
          this.books = books;
        });
      }
    });
  }

  search() {
    if (this.query.length > 0) {
      this.router.navigateByUrl(`/search?query=${this.query}`);
    }
  }
}
