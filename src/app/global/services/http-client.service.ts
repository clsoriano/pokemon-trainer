import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  private headers!: HttpHeaders;

  constructor(
    private httpClient: HttpClient
  ) { }

  requestMapping(url: string, body: any, method: string, appendHeaders: any){
    this.headers = new HttpHeaders({ 'Access-Control-Allow-Origin': '*'});

    // Adding more headers
    this.mapHeaders(appendHeaders);

    const options = {
      headers: this.headers,
      body,
      reportProgress: true
    };
    url = url.replace(`${environment.baseUrl}`,'');
    return this.httpClient.request(method, `${environment.baseUrl}${url}`, options);
  }

  getConfig(url: string){
    return this.httpClient.get(url);
  }

  protected mapHeaders(headers: any){
    for (let h in headers){
      this.headers = this.headers.append(headers[h].key, headers[h].value);
    }
  }

}
