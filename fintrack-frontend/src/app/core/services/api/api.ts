import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class Api {

  private BASE_URL = environment.apiUrl;

  constructor(private http: HttpClient){}
post(url: string, data: any){
  return this.http.post(`${this.BASE_URL}${url}`, data)
}

get(url: string){
      const headers = new HttpHeaders({
      'Cache-Control': 'no-cache, no-store, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0'
    });
  return this.http.get(`${this.BASE_URL}${url}`)
}
}
