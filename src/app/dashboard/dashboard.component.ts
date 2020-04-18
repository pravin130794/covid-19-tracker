import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { HttpResponse } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  getGlobalSubscription: Subscription;
  totalConfirmed;
  totalRecovered;
  totalDeath;
  constructor(
    private apiService: ApiService,
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit() {
    this.ngxLoader.start();
    this.getGlobalSubscription = this.apiService.httpRequest('get', '/summary').subscribe((response: any) => {
      // console.log(response);
      this.ngxLoader.stop();
      this.totalConfirmed = response.Global.TotalConfirmed;
      this.totalRecovered = response.Global.TotalRecovered;
      this.totalDeath = response.Global.TotalDeaths;
    },
    (error: HttpResponse<any>) => {
      console.error(error);
    });
  }

}
