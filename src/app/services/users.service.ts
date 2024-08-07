import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { FAKE_ENV } from '../constants/fakeEnv';
import { EAPI } from '../constants/EAPI';
import { IUserModel } from '../modules/users/dummyData';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { IResponse } from '../common/types/eapi.types';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private httpClient = inject(HttpClient);

  getUsers() {
    return this.fetchUsers();
  }

  private fetchUsers() {
    return this.httpClient
      .get<IResponse<IUserModel>>(FAKE_ENV.BASE_URL + EAPI.USERS)
      .pipe(
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
