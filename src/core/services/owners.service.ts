import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OwnersService {
  constructor(private http: HttpClient) {}

  get(pagina?) {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });
    return this.http.get(`${environment.urlApi}/users?page=${pagina}`, { headers });

  }

  getDetail(id){
    let headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });
    return this.http.get(`${environment.urlApi}/users/${id}`, { headers });
  }

  getSearchDetail(args, pagina){
    console.log(args, pagina);

    let headers = new HttpHeaders({
      Authorization: `Bearer ${environment.token}`,
    });
    return this.http.get(`${environment.urlApi}/users?first_name=${args}&page=${pagina}`, { headers });
  }

}
