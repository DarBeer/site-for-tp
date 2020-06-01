import { Component, OnInit } from '@angular/core';

import { Klaster } from '../../data/klaster';
import { KlasterService } from 'src/app/shared/service/klaster.service';

import { Metrika } from 'ng-yandex-metrika';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-klaster',
  templateUrl: './klaster.component.html',
  styleUrls: ['./klaster.component.scss']
})
export class KlasterComponent implements OnInit {

  klaster: Klaster;

  constructor(
    private service: KlasterService,
    private metrika: Metrika,
    private router: Router,
    private location: Location,
    ) {
    let prevPath = location.path();
    this.router
    .events.pipe(
      filter(event => (event instanceof NavigationEnd))
    )
    .subscribe(() => {
      const newPath = location.path();
      this.metrika.hit(newPath, {
        referer: prevPath,
      });
      prevPath = newPath;
    });
  }

  ngOnInit(): void {
    this.getKlaster();
  }
  
  getKlaster() {
    this.service.getKlaster().subscribe(
      klaster => this.klaster = klaster,
      error => console.dir(error));
  }

}
