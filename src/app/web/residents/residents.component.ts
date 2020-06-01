import { Component, OnInit } from '@angular/core';
import { Metrika } from 'ng-yandex-metrika';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-residents',
  templateUrl: './residents.component.html',
  styleUrls: ['./residents.component.scss']
})
export class ResidentsComponent implements OnInit {

  constructor(
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
  }

}
