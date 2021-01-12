import { Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Person } from 'src/app/entity/person';
import { Role } from 'src/app/entity/role';
import { ReferenceDataQuery } from 'src/app/query/reference-data.query';
import { PersonService } from 'src/app/service/person.service';
import { FormsModule, NgForm } from '@angular/forms'; 

@Component({
  selector: 'app-new-book',
  templateUrl: './new-book.component.html',
  styleUrls: ['./new-book.component.scss']
})
export class NewBookComponent implements OnInit {
  url: string | ArrayBuffer;
  file: File;
  
  people$: Observable<Person[]>;
  peopleLoading = false;
  peopleInput$ = new Subject<string>();

  roles$: Observable<Role[]>;

  creators: { person: string, role: string }[];

  creating: false;
  errorMessage: string;

  @ViewChild('f') newBookForm : NgForm;

  @ViewChildren('test') testInputs: QueryList<ElementRef>;


  constructor(private personService: PersonService, private referenceDataQuery: ReferenceDataQuery) { 
    this.creators = [ { person: undefined, role: undefined }];
  }

  ngOnInit() {
    this.people$ = concat(
        of([]), // default items
        this.peopleInput$.pipe(
            distinctUntilChanged(),
            tap(() => this.peopleLoading = true),
            switchMap(term => this.personService.search(term)
              .pipe(
                catchError(() => of([])), // empty list on error
                tap(() => this.peopleLoading = false)
            ))
        )
    );
    
    this.roles$ = this.referenceDataQuery.roles$;
  }

  addTag = (fullName): Person => {
    return {
      id: undefined,
      fullName
    };
  }

  onSelectFile = (event) => { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      this.file = event.target.files[0];

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.url = event.target.result;
      }
    }
  }

  addCreator = () => {
    this.creators.push({
      person: undefined,
      role: undefined
    });
  }

  deleteCreator = (creator) => {
    const index = this.creators.indexOf(creator);
    this.creators.splice(index, 1);
  }

  onSubmit = (form) => {
    console.log(form.value, form.value.creators);
  }
}
