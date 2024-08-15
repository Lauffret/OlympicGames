import { Component, OnInit } from '@angular/core';
import { OlympicService } from 'src/app/core/services/olympic.service';
import { Olympic } from 'src/app/core/models/Olympic.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public olympics!: Olympic[];
  public numberOfCountries = 0;
  public numberOfJOs = 0;

  // Options for Pie Chart

  public dataPC: { name: string, value: number }[] = [];
  viewPC: [number, number] = [600, 350];
  animationPC = false;
  labelsPC = true;

  tooltipPC(data: any): string {
    return data.data.name + "<br/>" + data.data.value;
  }

  constructor(private olympicService: OlympicService, private router: Router) { }

  ngOnInit(): void {
    this.olympicService.getOlympics().subscribe((olympics: Olympic[]) => {
        this.olympics = olympics;
        this.numberOfCountries = this.olympics.length;
        this.setDataPC();
        this.getNumberOfJOs();
      });
  }

  setDataPC(): void {
    this.dataPC = this.olympics.map((olympic: Olympic) => ({
      name: olympic.country ?? "",
      value: this.getNumberOfParticipation(olympic)
    }));
  }

  getNumberOfParticipation(olympic: Olympic): number {
    let participation = 0;

    olympic.participations?.map((value) => { participation += value.medalsCount ?? 0 } )

    return participation;
  }

  getNumberOfJOs(): void {
    const years = new Set<number>();

    this.olympics?.forEach(country => {
      country.participations?.forEach(participation =>
        participation.year ? years.add(participation.year) : ""
      );
    });
    this.numberOfJOs = years.size;
  }

  onSelectCountry(event: any): void {
    this.olympics.forEach(country => {
      if (country.country == event.name) {
        this.router.navigateByUrl(`detail/${country.id}`);
      }
    })
  }
}
