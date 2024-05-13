import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private baseUrl = 'https://reqres.in/api/users';
  constructor(private http: HttpClient) {}

  getUsers(page: number): Observable<any> {
    return this.http.get(`${this.baseUrl}?page=${page}`);
  }

  getUserDetails(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }
}
