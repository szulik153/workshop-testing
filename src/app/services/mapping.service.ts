import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaselineDto, BaselineSaveDto } from '../types/baseline';
import { EcuDto, EcuSaveDto } from '../types/ecu';

@Injectable({ providedIn: 'root' })
export class MappingService {
  private baseEcuUrl = 'api/ecu';
  private baseBaselineUrl = 'api/baseline';

  private endpoints = {
    getBaselines: this.baseBaselineUrl,
    addBaseline: this.baseBaselineUrl,
    removeBaseline: (id: string) => `${this.baseBaselineUrl}/${id}`,
    getEcus: this.baseEcuUrl,
    addEcu: this.baseEcuUrl,
    removeEcu: (id: string) => `${this.baseEcuUrl}/${id}`,
  };

  constructor(private http: HttpClient) {}

  getAllBaselines(): Observable<BaselineDto[]> {
    return this.http.get<BaselineDto[]>(this.endpoints.getBaselines);
  }

  addBaseline(baseline: BaselineSaveDto): Observable<BaselineDto> {
    return this.http.post<BaselineDto>(this.endpoints.addBaseline, baseline);
  }

  removeBaseline(id: string): Observable<void> {
    return this.http.delete<void>(this.endpoints.removeBaseline(id));
  }

  getAllEcus(): Observable<EcuDto[]> {
    return this.http.get<EcuDto[]>(this.endpoints.getEcus);
  }

  addEcu(baseline: EcuSaveDto): Observable<EcuDto> {
    return this.http.post<EcuDto>(this.endpoints.addEcu, baseline);
  }

  removeEcu(id: string): Observable<void> {
    return this.http.delete<void>(this.endpoints.removeEcu(id));
  }
}
