import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from "@angular/forms";

import { ToastrService } from 'ngx-toastr';

import { Klaster } from '../../data/klaster';
import { KlasterService } from 'src/app/shared/service/klaster.service';

@Component({
  selector: 'app-klaster-dashboard',
  templateUrl: './klaster-dashboard.component.html',
  styleUrls: ['./klaster-dashboard.component.scss']
})
export class KlasterDashboardComponent implements OnInit {

  klaster: Klaster;

  klasterForm: FormGroup;
  editorContent: string;
  imageFile: File = null;
  imageDef: String = '../../../assets/img/noimage.png';

  constructor(
    private service: KlasterService,
    private form: FormBuilder,
    private toastr: ToastrService
  ) { this.createForm(); }

  ngOnInit(): void {
    this.getKlaster();
  }

  getKlaster() {
    this.service.getKlaster().subscribe(
      klaster => this.klaster = klaster,
      error => console.dir(error));
  }

  createForm(): void {
    this.klasterForm = this.form.group({
      name: ['', Validators.required ],
      description: ['']
    });
  }

  //ADD klaster
  addKlaster(name, description): void {
    this.service.addKlaster(name, description)
          .subscribe(
            klaster => {
              this.klaster = klaster;
              this.toastr.success('Информация добавлена');
              this.klasterForm.reset();
              this.service.getKlaster()
                  .subscribe(klaster => this.klaster = klaster);
            },
            error => console.dir(error)
          );
  }

  //DELETE klaster by ID
  delKlaster(id: any): void {
    this.service.delKlaster(id)
        .subscribe(
          res => {
            this.service.getKlaster()
              .subscribe(klaster => this.klaster = klaster)
          },
          error => console.dir(error)
        )
  }

}
