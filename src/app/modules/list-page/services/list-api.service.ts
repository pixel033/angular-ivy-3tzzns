import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class ListApiService {
  constructor(private readonly httpClient: HttpClient) {}

  getUser(id: number): Observable<IUser> {
    return this.httpClient.get<IUser>(
      `https://jsonplaceholder.typicode.com/users/${id}`
    );
  }
}
