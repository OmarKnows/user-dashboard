import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IResponse } from '../common/types/eapi.types';
import { EAPI } from '../constants/EAPI';
import { IUser } from '../common/types/user.types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private httpClient = inject(HttpClient);

  getUsers(page?: number) {
    return this.fetchUsers(page);
  }

  getUser(id: string) {
    return this.fetchUser(id);
  }

  private fetchUsers(page?: number) {
    return this.httpClient
      .get<IResponse<IUser[]>>(EAPI.USERS + `?page=${page}`)
      .pipe(
        catchError((error: any) => {
          console.log(error);
          return throwError(
            () => new Error('An error occurred while fetching users')
          );
        })
      );
  }

  private fetchUser(id: string) {
    return this.httpClient.get<IResponse<IUser>>(EAPI.USERS + `/${id}`).pipe(
      map((response: any) => response.data),
      catchError((error: any) => {
        console.log(error);
        return throwError(
          () => new Error('An error occurred while fetching users')
        );
      })
    );
  }
}
