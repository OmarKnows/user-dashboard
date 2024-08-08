import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FAKE_ENV } from '../constants/fakeEnv';

const BASE_URL = FAKE_ENV.BASE_URL;

export function ApiInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const apiReq = req.clone({ url: `${BASE_URL}${req.url}` });
  return next(apiReq);
}
