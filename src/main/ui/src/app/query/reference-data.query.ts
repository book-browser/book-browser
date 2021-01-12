import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ReferenceData } from '../entity/reference-data';
import { ReferenceDataStore } from '../store/reference-data.store';

@Injectable({
  providedIn: 'root',
})
export class ReferenceDataQuery extends Query<ReferenceData> {  
  referenceData$ = this.select();

  roles$ = this.select('roles');

  constructor(protected store: ReferenceDataStore) {
    super(store);
  }
}