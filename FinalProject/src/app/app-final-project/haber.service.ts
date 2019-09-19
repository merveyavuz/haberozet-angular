import { Injectable } from '@angular/core';

import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Ozet } from './ozet';
import { resolve, reject } from 'q';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HaberService {
  apiURL = 'http://localhost:8080/news/';

  result: string = "";

  constructor(private http: HttpClient) { 
  }

  getYaziOzeti(title: string, context: string, rangeValue, url: string): Observable<any> {
      return this.http.post<any>(this.apiURL + url, {
        "baslik": title,
        "icerik": context,
        "ozetYuzdesi": rangeValue
      })
  }

  getLinkOzeti(link: string, brand: string, url: string): Observable<any> {
    return this.http.post<any>(this.apiURL + url, {
      "url": link,
      "brand": brand
    })
  }

  getDosyaOzeti(title: string, context: string, url: string): Observable<any> {
    return this.http.post<any>(this.apiURL + url, {
      "baslik": title,
      "icerik": context,
    })
  }



}
