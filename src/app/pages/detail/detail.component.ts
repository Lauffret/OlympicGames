import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Olympic } from 'src/app/core/models/Olympic.model';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit {
  public country?: Olympic;
  public olympicData?: Olympic[];
  public countryName?: string;
  public nbOfMedals: number = 0;
  public nbOfAthletes: number = 0;
  public minNbMedals: number = 0;
  public maxNbMedals: number = 0;
  public nbEntries: number = 0;

  public dataLC: { name: string, serie: { value: number, name: number }[] } = { name: "Medal Count", serie: [] };

  viewLC: [number, number] = [700, 400]
  showGridLinesLC = true;
  xAxisLC = true;
  yAxisLC = true;

  nbMedalsLC(nbMedal: number): string {
    return `${nbMedal} medals`;
  }

  yearsLC(year: number): string {
    return `${year} year`;
  }
  constructor(private olympicService: OlympicService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.olympicService.getOlympics().subscribe((olympics: Olympic[]) => {
      this.olympicData = olympics;
      this.country = this.olympicData?.find((country: Olympic) => country.id == id);
      this.setDataLC();
    });
  }

  setDataLC() {
    this.countryName = this.country?.country ?? "";
    this.dataLC.name = this.countryName;
    this.nbEntries = this.country?.participations?.length ?? 0;

    this.country?.participations?.forEach(participation => {
      let nbMedal = participation.medalsCount ?? 0;
      let nbAthletes = participation.athleteCount ?? 0;

      this.nbOfAthletes += nbAthletes;
      this.nbOfMedals += nbMedal;

      if (nbMedal < this.minNbMedals) {
        this.minNbMedals = nbMedal;
      }

      if (nbMedal > this.maxNbMedals) {
        this.maxNbMedals = nbMedal;
      }

      this.dataLC.serie.push(
        {
          value: nbMedal,
          name: participation.year ?? 0
        });
    })
  }

  backPage(): void {
    this.olympicService.loadInitialData().subscribe(() => {
      this.router.navigate(['/']);
    });
  }
}
