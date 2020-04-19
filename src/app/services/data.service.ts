import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private countryLists = new Subject<string>();
  constructor() { }
  missionAnnounced$ = this.countryLists.asObservable();


  setValue(lists: any) {
    this.countryLists.next(lists);
  }

  getValue() {
   return this.countryLists;
  }

}
