import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ReferenceData } from '../entity/reference-data';


export function createInitialState(): ReferenceData {
  return {
    roles: [],
  }
}

@StoreConfig({ name: 'reference-data' })
@Injectable({
  providedIn: 'root',
})
export class ReferenceDataStore extends Store<ReferenceData> {
  constructor() {
    super(createInitialState());
  }
}