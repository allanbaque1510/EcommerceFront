import { HttpInterceptorFn, HttpXsrfTokenExtractor } from '@angular/common/http';
import { inject } from '@angular/core';
import { environment } from '../../environments/environment';

export const httpTokenInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(HttpXsrfTokenExtractor);
  const csrfTokenName = "X-XSRF-TOKEN";
  const csrfToken = token.getToken() as string;
  if(csrfToken !== null && !req.headers.has(csrfTokenName)){
    req = req.clone({headers:req.headers.set(csrfTokenName,csrfToken)})
    req = req.clone({headers:req.headers.set('Referer',environment.thisUrl)})
  } 
  return next(req);
};
