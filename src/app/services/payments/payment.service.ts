import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { SERVER_URL } from 'src/app/config';
import { Page, PagedData } from 'src/app/model/util';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient
  ) { }

  setRequestContentType() {
    return { headers: new HttpHeaders().set('Content-Type', 'application/json') }
  }

  getPayment(paymentId) {
    return this.http.get(SERVER_URL + '/tasks', this.setRequestContentType()).pipe(map((data: any) => {
      let result;
      if (data && data.length) {
        for (let index = 0; index < data.length; index++) {
          const payment = data[index];
          if (payment.id == paymentId) {
            result = payment;
          }
        }
      }
      return result;
    }));
  }

  getListPaginated(params: any, page: Page) {
    let userNameFilter = params.name && params.name != ""  ? "&name_like=" + params.name : "";
    let titleFilter = params.title && params.title != ""  ? "&title_like=" + params.title : "";
    let dateRangeFilter = params.dateRange && params.dateRange.length == 2  ? "&date_gte=" + params.dateRange[0].toISOString() + "&date_lte=" + params.dateRange[1].toISOString(): "";
    let minValueFilter = params.minValue != null && !isNaN(params.minValue) ? "&value_gte=" + params.minValue : "";
    let maxValueFilter = params.maxValue != null && !isNaN(params.maxValue) ? "&value_lte=" + params.maxValue : "";

    let qpFilters = "";
    if (!!userNameFilter || !!titleFilter || !!dateRangeFilter || !!minValueFilter || !!maxValueFilter) {
      qpFilters = "?" + userNameFilter + titleFilter + dateRangeFilter  + minValueFilter + maxValueFilter;
      qpFilters = qpFilters.replace("?&", "?");
    }

    return this.http.get(SERVER_URL + '/tasks'+qpFilters, this.setRequestContentType()).pipe(map((data: any) => {
      let response = new PagedData<any>();
      response.page = page;

      if (data && data.length) {
        //fake server side - pagination payments
        let pageStart =  page.pageNumber * page.size;
        let pageEnd = pageStart + page.size;
        let updatedPage: Page = {
            ...page,
            totalElements: data.length,
            totalPages: Math.ceil(data.length / page.size)
        }

        response.page = updatedPage
        response.data = data.slice(pageStart, pageEnd);
      }
      return response;
    }));
  }

  createPayment(data) {
    return this.http.post(SERVER_URL + '/tasks/', data, this.setRequestContentType()).pipe(map(data => {
      if (data) {
        return true;
      }
      return false;
    }));
  }

  updatePayment(data) {
    return this.http.patch(SERVER_URL + '/tasks/' + data.id, data, this.setRequestContentType()).pipe(map(data => {
      if (data) {
        return true;
      }
      return false;
    }));
  }

  deletePayment(data) {
    return this.http.delete(SERVER_URL + '/tasks/' + data.id, this.setRequestContentType()).pipe(map(data => {
      if (data) {
        return true
      }
      return false;
    }));
  }
}
