import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

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
    private location: Location
  ) { }

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
