import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { throwError, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = environment.apiUrl;
  indiaDataAPI = environment.indiaUrl;
  public questions = [];
  constructor(private httpClient: HttpClient, private router: Router) {
   }
  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
   // this.toastr.error(errorMessage, 'Error');
    return throwError(errorMessage);
  }

  getQuestions() {
      return this.httpClient.get<{ message: string; questions: any }>( this.apiUrl + '/api/questions/get')
  }

  public httpRequest(requestType: string, apiCall: string, data?: any): Observable<any> {
    if (data && Object.prototype.toString.call(data) === '[object Object]') {
      const allParams = Object.keys(data);
      for (const param of allParams) {
        if (data[param] === undefined || data[param] === null || data[param] === '') {
          delete data[param];
        }
        if (data[param] && Object.prototype.toString.call(data[param]) === '[object String]') {
          data[param] = data[param].trim().replace(/[\\'"]+/g, '');
          if (data[param] === 'true') {
            data[param] = true;
          }
          if (data[param] === 'false') {
            data[param] = false;
          }
          if (data[param] === 'undefined') {
            delete data[param];
          }
        }
      }
    }
    if (requestType === 'get' && data === undefined) {
        return this.httpClient.get(`${environment.apiUrl}/${apiCall}`);
    }
    if (requestType === 'get' && data !== undefined) {
      return this.httpClient.get(`${environment.indiaUrl}/${apiCall}`);
  }

}
}
