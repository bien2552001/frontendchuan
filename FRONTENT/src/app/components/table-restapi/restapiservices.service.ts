import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TableRestApiModel } from './tablefilter/table-restapi.model';

@Injectable({
  providedIn: 'root'
})
export class RestapiservicesService {
  BaseUrl = "https://localhost:5001"
  constructor(private http: HttpClient) { }


  //____________________________Get____________________________
  getcurrent(fields: string): Observable<Array<TableRestApiModel>> {
    const url = `${this.BaseUrl}/dtsu666?Fields=${fields}`;
    return this.http.get<Array<TableRestApiModel>>(url);
  }

  //____________________________Get____________________________
  getId(id: string): Observable<Array<TableRestApiModel>> {
    return this.http.get<Array<TableRestApiModel>>('https://localhost:5001/dtsu666' + id);
  }

  //____________________________Post____________________________
  postcurrent(data: any): Observable<Array<TableRestApiModel>> {
    return this.http.post<Array<TableRestApiModel>>('https://localhost:5001/dtsu666', data);
  }

  //____________________________Delete____________________________
 
  deleteCurrent(id: string): Observable<Array<TableRestApiModel>> {
    const url = `https://localhost:5001/dtsu666/${id}`;
    return this.http.delete<Array<TableRestApiModel>>(url);
  }
  //____________________________Put____________________________
  putcurrent(id: string, data: any): Observable<Array<TableRestApiModel>> {
    return this.http.put<Array<TableRestApiModel>>('https://localhost:5001/dtsu666/' + id, data);
  }


  //------------------------------------------------------------------------------------Chart----------------------------------------



}
