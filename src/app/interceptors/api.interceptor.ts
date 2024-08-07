import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'https://reqres.in/api/';

export function ApiInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const apiReq = req.clone({ url: `${BASE_URL}${req.url}` });
  return next(apiReq);
}
