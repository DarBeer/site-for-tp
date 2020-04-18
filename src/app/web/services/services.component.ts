import { Component, OnInit } from '@angular/core';
import { Service } from 'src/app/data/service';
import { ServicesService } from 'src/app/shared/service/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {

  services: Service[];

  constructor(private service: ServicesService) { }

  ngOnInit(): void {
    this.getArticles();
  }

  getArticles(): void {
    this.service.getServices().subscribe(services => {
      this.services = services;
    });
  }

}
