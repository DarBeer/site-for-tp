import { Component, OnInit } from '@angular/core';

import { Klaster } from '../../data/klaster';
import { KlasterService } from 'src/app/shared/service/klaster.service';

@Component({
  selector: 'app-klaster',
  templateUrl: './klaster.component.html',
  styleUrls: ['./klaster.component.scss']
})
export class KlasterComponent implements OnInit {

  klaster: Klaster;

  constructor(private service: KlasterService) { }

  ngOnInit(): void {
    this.getKlaster();
  }
  
  getKlaster() {
    this.service.getKlaster().subscribe(
      klaster => this.klaster = klaster,
      error => console.dir(error));
  }

}
