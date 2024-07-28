import { Component, OnInit } from '@angular/core';
import { Observable, of, map } from 'rxjs';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public olympics$: Observable<any> = of(null);
  // Options for Pie Chart
  dataPC = [
    {
      name: "Rest",
      value: 53.24,
    },
    {
      name: "China",
      value: 18.47,
    },
    {
      name: "India",
      value: 17.7,
    },
    {
      name: "USA",
      value: 4.25,
    },
    {
      name: "Indonesia",
      value: 3.51,
    },
    {
      name: "Pakistan",
      value: 2.83,
    },
  ];
  viewPC: [number, number] = [700, 400];
  animationPC = true;
  colorSchemePC = "vivid";
  labelsPC = true;
  percentageFormatterPC(data: any): string {
    return data.value + "%";
  }
  
  constructor(private olympicService: OlympicService) {}

  ngOnInit(): void {
    this.olympics$ = this.olympicService.getOlympics();
  }

}
