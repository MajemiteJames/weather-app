import { Component, Input, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
})
export class ChartComponent implements OnInit {
  @Input() temperatures: any;

  constructor() {}

  ngOnInit(): void {
    this.renderChart();
  }

  renderChart(): void {
    const ctx = document.getElementById('weatherChart') as HTMLCanvasElement;
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: this.temperatures.length }, (_, i) =>
          (i + 1).toString()
        ),
        datasets: [
          {
            label: 'Temperature Forecast',
            data: this.temperatures,
            borderColor: 'blue',
            fill: false,
          },
        ],
      },
    });
  }
}
