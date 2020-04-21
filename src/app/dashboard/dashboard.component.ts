import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { HttpResponse } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DataService } from '../services/data.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  getGlobalSubscription: Subscription;
  getCountryDetailsSubscription: Subscription;
  countryList: any;
  CurrentData;
  totalConfirmed;
  totalRecovered;
  totalDeath;
  currentDate;
  constructor(
    private apiService: ApiService,
    private ngxLoader: NgxUiLoaderService,
    private dataService: DataService
  ) {}

  ngOnInit() {
    this.ngxLoader.start();
    this.getGlobalData();
  }

  getGlobalData() {
    this.getGlobalSubscription = this.apiService.httpRequest('get', '/summary').subscribe((response: any) => {
      this.ngxLoader.stop();
      // console.log(response);
      this.totalConfirmed = response.Global.TotalConfirmed;
      this.totalRecovered = response.Global.TotalRecovered;
      this.totalDeath = response.Global.TotalDeaths;
      this.dataService.setValue(response.Countries);
      this.countryList = response.Countries;
      this.currentDate = response.Date;
    },
    (error: HttpResponse<any>) => {
      console.error(error);
    });
  }
  updateValues(value) {
    console.log(value);
    this.ngxLoader.start();
    if (value !== '') {
      this.getCountryDetailsSubscription = this.apiService.httpRequest('get', 'total/country/' + value).subscribe((response: any) => {
        this.ngxLoader.stop();
        if (response.length > 0 ) {
          this.CurrentData = response.pop();
          this.totalConfirmed = this.CurrentData.Confirmed;
          this.totalRecovered = this.CurrentData.Recovered;
          this.totalDeath = this.CurrentData.Deaths;
          this.currentDate = this.CurrentData.Date;
        } else {
          this.totalConfirmed = 0;
          this.totalRecovered = 0;
          this.totalDeath = 0;
          // write here toaster
        }
      },
      (error: HttpResponse<any>) => {
        console.error(error);
      });
    } else {
      this.getGlobalData();
    }
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    if (this.getGlobalSubscription !== undefined) {
      this.getGlobalSubscription.unsubscribe();
    }
    if (this.getCountryDetailsSubscription !== undefined) {
      this.getCountryDetailsSubscription.unsubscribe();
    }
  }

}
