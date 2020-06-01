import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Metrika } from 'ng-yandex-metrika';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

import { ServicesService } from 'src/app/shared/service/services.service';
import { Service } from '../../../data/service';

@Component({
  selector: 'app-service-page',
  templateUrl: './service-page.component.html',
  styleUrls: ['./service-page.component.scss']
})
export class ServicePageComponent implements OnInit {

  services = new Service();

  constructor(
    private route: ActivatedRoute,
    private service: ServicesService,
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
    this.getService();
  }

  getService(): void {
    this.service.getService(this.route.snapshot.paramMap.get('id')).subscribe(service => {
      this.services = service;
      console.dir(service)
    })
  }
}
