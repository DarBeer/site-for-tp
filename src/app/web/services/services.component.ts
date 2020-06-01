import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/data/service';
import { ServicesService } from 'src/app/shared/service/services.service';
import { Metrika } from 'ng-yandex-metrika';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  services: Service[];

  constructor(
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
    this.getArticles();
  }

  getArticles(): void {
    this.service.getServices().subscribe(services => {
      this.services = services;
    });
  }

}
