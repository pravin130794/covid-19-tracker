import { Component, OnInit } from '@angular/core';

import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import { ApiService } from '../services/api.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { HttpResponse } from '@angular/common/http';
declare var $: any;
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private apiService: ApiService,
    private ngxLoader: NgxUiLoaderService,
  ) { }

  ngOnInit() {
    // this.dataService.getValue().subscribe((resp: any) => {
    //   console.log(resp);
    // });
  }

}
