import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import{Observable} from'rxjs';


@Injectable({
  providedIn: 'root'
})
export class EstacionMeteorologica {
  constructor(public http:HttpClient) { }

  getClima(nombreCiudad: string): Observable<any>{
    const ciudadApi=`https://wttr.in/${nombreCiudad}?format=j1`;
    return this.http.get<any>(ciudadApi);
  }
  getCiudad(nombreCiudad:string ): Observable<any>{
    const ciudadApi=`https://nominatim.openstreetmap.org/search?q=${nombreCiudad}&format=json&limit=1`;
    return this.http.get<any>(ciudadApi);
  
}
getClimaporCoords(lat:number,lon:number):Observable<any>{
  const coordsApi=`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
  return this.http.get<any>(coordsApi);
}

}
