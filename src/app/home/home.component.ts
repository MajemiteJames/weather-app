import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  selectedValue: string = 'TOP';
  constructor(private router: Router) {}

  getSelectedValue(selectedValue: string) {
    if (selectedValue == 'Choose') {
      console.log('you must select a state');
      alert('you must select a state');
      return false;
    }
    console.log(selectedValue);

    this.router.navigateByUrl(`/weather/${selectedValue}`);

    // Do whatever you need to do with the selected value
    return false;
  }

  redirectToOtherPage() {
    this.router.navigateByUrl('/weather/');
  }
}
