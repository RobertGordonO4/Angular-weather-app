import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherDataTypes } from '../weather-data.types';
import { getName } from 'country-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
  title = 'angular-weather-app';
  city = '';
  weatherData: WeatherDataTypes | undefined;
  callErrored = false;
  searchCityWeather = async (city: string) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=0844d47de1a02561e472ca33f1d240c4`;
    const response = await fetch(url);

    if (!response.ok) {
      this.callErrored = true;
      throw new Error('The API call to Open Weather has failed');
    }

    this.callErrored = false;
    const data = await response.json();
    this.weatherData = data;
  };
  handleCityChange = (e: Event) => {
    this.city = (e.target as HTMLInputElement).value;
  };
  kelvinToCelsius = (kelvins: number) => {
    return Math.round((kelvins - 273.15) * 100) / 100;
  };
  getName = getName;
}
