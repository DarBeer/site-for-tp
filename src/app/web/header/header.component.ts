import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  home = 'Главная';
  title = 'ПТП';

  linkList = [
    { name: 'Новости', link: '/articles'},
    { name: 'Резидентам', link: '/residents' },
    { name: 'Услуги', link: '/services' }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
