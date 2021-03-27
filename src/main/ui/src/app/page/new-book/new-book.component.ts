import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm } from '@angular/forms';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, distinctUntilChanged, switchMap, tap } from 'rxjs/operators';
import { Person } from 'src/app/entity/person';
import { Role } from 'src/app/entity/role';
import { ReferenceDataQuery } from 'src/app/query/reference-data.query';
import { PersonService } from 'src/app/service/person.service';

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

  creating: false;
  errorMessage: string;

  @ViewChild('f') test : NgForm;

  newBookForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    thumbnail: new FormControl(''),
    creators: new FormArray([
      new FormGroup({
        name: new FormControl(''),
        role: new FormControl('')
      })
    ])   
  });

  constructor(private personService: PersonService, private referenceDataQuery: ReferenceDataQuery) { 
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

  get title() { return this.newBookForm.get('title') }

  get description() { return this.newBookForm.get('description') }

  get thumbnail() { return this.newBookForm.get('thumbnail') }

  get creators() { return this.newBookForm.get('creators') as FormArray }

  addCreator = () => {
    this.creators.push(new FormGroup({
      name: new FormControl(''),
      role: new FormControl('')
    }));
  }

  deleteCreator = (index) => {
    this.creators.removeAt(index);
  }

  onSubmit = () => {
    console.log(this.newBookForm.value);
  }
}
