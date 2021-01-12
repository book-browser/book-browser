import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReferenceData } from '../entity/reference-data';
import { ReferenceDataStore } from '../store/reference-data.store';

@Injectable({
  providedIn: 'root',
})
export class ReferenceDataService {
    constructor(private http: HttpClient, private referenceDataStore: ReferenceDataStore) { }

    updateReferenceData() {
      this.referenceDataStore.setLoading(true);
      this.http.get<ReferenceData>('/api/reference-data')
               .subscribe((referenceData) => {
                 this.referenceDataStore.update(referenceData);
                 this.referenceDataStore.setLoading(false);
               });
    }
}