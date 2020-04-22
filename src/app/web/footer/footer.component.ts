import { Component, OnInit } from '@angular/core';
import { InvestorsService } from 'src/app/shared/service/investors.service';
import { Investor } from 'src/app/data/investor';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  investors: Investor[];
  date = new Date();

  constructor(private service: InvestorsService) { }

  ngOnInit(): void {
    this.getInvestors();
  }

  getInvestors(): void {
    this.service.getInvestor().subscribe(
      investors => this.investors = investors
    );
  }

}
