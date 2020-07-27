import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OwnersService {
  constructor(private http: HttpClient) {}

  get(id?) {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });
    if(id){
      return this.http.get(`${environment.urlApi}/users/${id}`, { headers });
    }
    else{
      return this.http.get(`${environment.urlApi}/users`, { headers });
    }

  }

}
