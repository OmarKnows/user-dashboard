import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private filterValueSubject = new BehaviorSubject<string>('');
  filterValue$ = this.filterValueSubject.asObservable();

  setFilterValue(value: string) {
    this.filterValueSubject.next(value);
  }
}
