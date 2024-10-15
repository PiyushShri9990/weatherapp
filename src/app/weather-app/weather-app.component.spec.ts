import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Weather } from './weather.model';

declare var google: any;

@Component({
  selector: 'app-weather-app',
  templateUrl: './weather-app.component.html',
  styleUrls: ['./weather-app.component.css'],
})
export class WeatherAppComponent implements OnInit, AfterViewInit {
  city: any;
  weather: any | undefined;
  map: any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 37.7749, lng: -122.4194 },
      zoom: 12,
    });
  }

  getWeather(): void {
    const apiUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const apiKey = '7616d358c307f9c89facedc4822b273b';
    const params = new HttpParams()
      .set('q', this.city)
      .set('units', 'metric')
      .set('appid', apiKey);

    this.http.get(apiUrl, { params }).subscribe((response) => {
      this.weather = response;
      this.addMarker();
    });
  }

  addMarker(): void {
    const lat = this.weather.coord.lat;
    const lng = this.weather.coord.lon;
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.map,
      title: 'Weather in ' + this.city,
    });
  }
}
