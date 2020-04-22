import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  title = 'Технопарк «Полесье»';
  dashboard = 'Главная панель';

  home = ""

  logaut = 'Выйти'
  
  linkList = [
    { link: '/dashboard/articles',        name: 'Статьи'        },
    { link: '/dashboard/services',        name: 'Услуги'        },
    { link: '/dashboard/investors',       name: 'Инвесторы'     },
    { link: '/dashboard/klaster',         name: 'Кластер'       }
  ]

    constructor( ) {
     }

    ngOnInit() {
    }

}
