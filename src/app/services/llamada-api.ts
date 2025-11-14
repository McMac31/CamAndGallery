import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface FotoApi{
  id: string;
  izena: string;
  photo_base64: string;
  photo_name: string;
  photo_geo: string;
}

@Injectable({
  providedIn: 'root'
})
export class LlamadaApi {

  private baseURL = '/api-fotos'; 
  
  constructor(private http: HttpClient) {}

  getPhotos(): Observable<FotoApi[]> {
    return this.http.get<any>(`${this.baseURL}/get/Miguel`).pipe(
      map(res => {
        console.log('API response:', res);
        return res ?? [];
      }),
      catchError(err => {
        console.error('No cargan las fotos', err);
        return of([]);
      })
    );
  }

  uploadPhoto(photoData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/post`, photoData).pipe(
      catchError(err => {
        console.error('Error subiendo foto', err);
        return of(null);
      })
    );
  }

  deletePhoto(photoId: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/delete/${photoId}`).pipe(
      catchError(err => {
        console.error('Error borrando foto', err);
        return of(null);
      })
    );
  }
}