import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WeatherApiService {
  constructor(private http: HttpClient) {}

  getWeatherForecast(location: string): Observable<any> {
    const url = `https://api.weather.gov/gridpoints/${location}/forecast`;
    return this.http.get(url);
  }
}
