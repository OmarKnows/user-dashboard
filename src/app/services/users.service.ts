import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { IResponse } from '../common/types/eapi.types';
import { EAPI } from '../constants/EAPI';
import { IUser } from '../common/types/user.types';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private httpClient = inject(HttpClient);
  private cacheService = inject(CacheService);

  getUsers(page?: number) {
    return this.fetchUsers(page);
  }

  getUser(id: string) {
    return this.fetchUser(id);
  }

  private fetchUsers(page?: number) {
    const url = EAPI.USERS + `?page=${page}`;
    const cachedResponse = this.cacheService.get(url);

    if (cachedResponse) {
      return cachedResponse;
    } else {
      return this.httpClient.get<IResponse<IUser[]>>(url).pipe(
        tap((response) => this.cacheService.set(url, response)),
        catchError((error: any) => {
          console.log(error);
          return throwError(
            () => new Error('An error occurred while fetching users')
          );
        })
      );
    }
  }

  private fetchUser(id: string) {
    const url = EAPI.USERS + `/${id}`;
    const cachedResponse = this.cacheService.get(url);

    if (cachedResponse) {
      return cachedResponse;
    } else {
      return this.httpClient.get<IResponse<IUser>>(url).pipe(
        tap((response) => this.cacheService.set(url, response)),
        catchError((error: any) => {
          console.log(error);
          return throwError(
            () => new Error('An error occurred while fetching users')
          );
        })
      );
    }
  }
}
