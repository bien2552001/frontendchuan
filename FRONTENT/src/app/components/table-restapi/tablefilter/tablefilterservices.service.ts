import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TableRestApiModel } from './table-restapi.model';

@Injectable({
  providedIn: 'root'
})
export class TablefilterservicesService {

  private dataUrl = 'https://localhost:5001/data/current';

  constructor(private http: HttpClient) { }

  getChartData(): Observable<TableRestApiModel[]> {
    return this.http.get<TableRestApiModel[]>(this.dataUrl);
  }

}
