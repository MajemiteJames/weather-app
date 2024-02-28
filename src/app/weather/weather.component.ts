import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService } from '../weather-api.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-weather',
  standalone: true,
  templateUrl: './weather.component.html',
  styleUrl: './weather.component.scss',
  imports: [],
})
export class WeatherComponent implements OnInit {
  location!: string;
  temperatures: number[] = [];
  dates: string[] = [];
  chart!: Chart;

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.location = params['location'];
      this.getForecastData();
    });
  }

  getForecastData(): void {
    this.weatherService.getForecast(this.location).subscribe((data) => {
      // Extract temperature data and dates
      const temperatureData = data.properties.periods.map(
        (period: { temperature: any }) => period.temperature
      );
      this.temperatures = temperatureData;
      this.dates = data.properties.periods.map(
        (period: { startTime: any }) => period.startTime
      );

      // Create chart
      this.createChart();
    });
  }

  createChart(): void {
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: this.dates,
        datasets: [
          {
            data: this.temperatures,
            label: 'Temperature Forecast',
            borderColor: '#3cba9f',
            fill: false,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Chart.js Line Chart',
          },
        },
        scales: {
          x: {
            display: true,
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            display: true,
            title: {
              display: true,
              text: 'Temperature (°F)',
            },
          },
        },
      },
    });
  }
}
