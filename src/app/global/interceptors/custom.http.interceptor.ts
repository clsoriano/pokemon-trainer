import { DateFormatPipe } from './../pipes/date-format.pipe';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http'
import { catchError, map, Observable, startWith, tap, throwError, timeout, TimeoutError } from 'rxjs';
import { PokeBallService } from './../services/poke-ball.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  
  service_count = 0;

  constructor(
    private pokeBallService: PokeBallService,
    private dateFormatPipe: DateFormatPipe
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const timeOut = 60000; // if need change the default timeout change here. Default is 60 seconds in milliseconds

      this.service_count++; // count request....

      return next
            .handle(req)
            .pipe(
              startWith(null),
              timeout(timeOut),
              tap(
                (event: any) => {

                  if (event != null) {
                    const { type } = event;

                    if (type == 0) this.pokeBallService.showPokeBallLoading(); // valid event type request for show loading

                    if (event instanceof HttpResponse) {
                      /* valid event type response for hide loading, in case you have more than one request 
                      ** we need to declare a variable for count request sending to hide the loading*/
                      this.service_count--;
                      
                      if (this.service_count === 0) this.pokeBallService.hidePokeBallLoading();

                      console.info(`[CustomHttpInterceptor][${this.dateFormatPipe.transform(Date.now(), 'MM/dd/yyyy HH:mm:ss Ss')}][${event.status}][${event.statusText}][${req.method}]`)
                    }

                  }

                },
                (error) => {
                  this.service_count--;
                      
                  if (this.service_count === 0) this.pokeBallService.hidePokeBallLoading();

                  console.error(`[CustomHttpInterceptor][${this.dateFormatPipe.transform(Date.now(), 'MM/dd/yyyy HH:mm:ss Ss')}][${error.status}][${error.statusText}][${req.method}]`)
                }
              ),
              catchError(
                (error) => {

                  this.service_count--;
                      
                  if (this.service_count === 0) this.pokeBallService.hidePokeBallLoading();

                  if (error instanceof TimeoutError) return throwError(() => new Error(`TM: ${error.message}`));
                  
                  return throwError(() => new Error(`ERR: ${error.message}`));
                }
              )
            );

  }
}
