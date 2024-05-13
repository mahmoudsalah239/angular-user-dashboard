import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CashingService } from './cashing.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'https://reqres.in/api/users';
  constructor(
    private http: HttpClient,
    private cachingService: CashingService
  ) {}

  getUsers(page: number): Observable<any> {
    const cachedData = this.cachingService.get(`users-page-${page}`);
    if (cachedData) {
      return cachedData;
    } else {
      const request = this.http.get(`${this.baseUrl}?page=${page}`);
      request.subscribe((response) => {
        this.cachingService.set(`users-page-${page}`, response);
      });
      return request;
    }
  }

  getUserDetails(id: number): Observable<any> {
    const cachedData = this.cachingService.get(`user-id-${id}`);
    if (cachedData) {
      return cachedData;
    } else {
      const request = this.http.get(`${this.baseUrl}/${id}`);
      request.subscribe((response) => {
        this.cachingService.set(`user-id-${id}`, response);
      });

      return request;
    }
  }
}
