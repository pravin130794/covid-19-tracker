import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-india',
  templateUrl: './india.component.html',
  styleUrls: ['./india.component.css']
})
export class IndiaComponent implements OnInit {
  getIndiaStateSubscription: Subscription;
  stateList: any;
  finalCount;
  totalConfirmed;
  totalRecovered;
  totalDeath;
  currentDate;
  constructor(
    private apiService: ApiService,
    private ngxLoader: NgxUiLoaderService,
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.ngxLoader.start();
    this.getIndiaData();
  }

  getIndiaData() {
    this.getIndiaStateSubscription = this.apiService.httpRequest('get', '/data.json', {data: 'india'}).subscribe((response: any) => {
      this.ngxLoader.stop();
      this.stateList = response.statewise;
      this.finalCount = response.cases_time_series.pop();
      this.totalConfirmed = this.finalCount.totalconfirmed;
      this.totalRecovered = this.finalCount.totalrecovered;
      this.totalDeath = this.finalCount.totaldeceased;
      this.currentDate = this.finalCount.date;
    },
    (error: HttpResponse<any>) => {
      console.error(error);
    });
  }

  updateValues(value) {
    if (value !== '') {
      this.stateList.forEach(element => {
        if (element.state === value) {
          this.totalConfirmed = element.confirmed;
          this.totalRecovered = element.recovered;
          this.totalDeath = element.deaths;
         // this.currentDate = element.lastupdatedtime;
        }
      });
      // this.getCountryDetailsSubscription = this.apiService.httpRequest('get', 'country/' + value).subscribe((response: any) => {
      //   this.ngxLoader.stop();
      //   if (response.length > 0 ) {
      //     this.CurrentData = response.pop();
      //     this.totalConfirmed = this.CurrentData.Confirmed;
      //     this.totalRecovered = this.CurrentData.Recovered;
      //     this.totalDeath = this.CurrentData.Deaths;
      //     this.currentDate = this.CurrentData.Date;
      //   } else {
      //     this.totalConfirmed = 0;
      //     this.totalRecovered = 0;
      //     this.totalDeath = 0;
      //     // write here toaster
      //   }
      // },
      // (error: HttpResponse<any>) => {
      //   console.error(error);
      // });
    } else {
      this.getIndiaData();
    }
  }


    // tslint:disable-next-line: use-lifecycle-interface
    ngOnDestroy() {
      if (this.getIndiaStateSubscription !== undefined) {
        this.getIndiaStateSubscription.unsubscribe();
      }
      // if (this.getCountryDetailsSubscription !== undefined) {
      //   this.getCountryDetailsSubscription.unsubscribe();
      // }
    }
}
