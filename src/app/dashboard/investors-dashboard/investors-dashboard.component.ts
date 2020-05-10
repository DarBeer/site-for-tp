import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from "@angular/forms";

import { ToastrService } from 'ngx-toastr';

import { Investor } from 'src/app/data/investor';
import { InvestorsService } from 'src/app/shared/service/investors.service';

@Component({
  selector: 'app-investors-dashboard',
  templateUrl: './investors-dashboard.component.html',
  styleUrls: ['./investors-dashboard.component.scss']
})
export class InvestorsDashboardComponent implements OnInit {

  headElements = ['Изображение', 'ID', 'Название', 'Ссылка на инвестора', 'Редактировать'];

  investors: Investor[];
  investor: Investor;

  investorForm: FormGroup;
  editorContent: string;
  imageFile: File = null;
  imageDef: String = '../../../assets/img/noimage.png';

  constructor(
    private service: InvestorsService,
    private form: FormBuilder,
    private toastr: ToastrService
    ) { this.createForm(); }

  ngOnInit(): void {
    this.getInvestors();
  }

  getInvestors(): void {
    this.service.getInvestor().subscribe(
      investors => this.investors = investors
    );
  }

  createForm(): void {
    this.investorForm = this.form.group({
      name: ['', Validators.required ],
      urlToInv: ['', Validators.required ],
      urlImage: [''],
    });
  }

  //GET uploaded file info
  onSelectedFile(event): void {
    if (<File>event.target.files[0] != null) {
      this.imageFile = <File>event.target.files[0];
    } else {
      this.imageFile = null;
    }

    //SET image preview
    const reader = new FileReader();
    reader.onload = (event: any) => {
      this.imageDef = event.target.result
    };
    reader.readAsDataURL(this.imageFile);
  }

  //DELETE investor by ID
  delInvestor(id: any): void {
    this.service.delInvestor(id)
        .subscribe(
          res => { 
            this.service.getInvestor()
              .subscribe( investors => this.investors = investors)
          }, 
          error => console.dir(error)
        )
  }

  //ADD new investor
  addInvestor(name, urlToInv): void {
    let img = new FormData();
    let imageName: String;

    if (this.imageFile !== null) {
      img.append('investorImage', this.imageFile, this.imageFile.name);
      imageName = 'https://shielded-oasis-48709.herokuapp.com/uploads/investors/' + this.imageFile.name;

      this.service.addInvestor(name, urlToInv, imageName, img)
          .subscribe(
            investor => {
              this.investors.push(investor);
              this.toastr.success('Информация добавлена');
              this.investorForm.reset();
              this.service.getInvestor()
                  .subscribe(investors => this.investors = investors);
            },
            error => console.dir(error)
          );
    } else {
      this.service.addInvestor(name, urlToInv, imageName, img)
          .subscribe(
            investor => {
              this.investors.push(investor);
              this.toastr.success('Информация добавлена');
              this.investorForm.reset();
              this.service.getInvestor()
                  .subscribe(investors => this.investors = investors);
            },
            error => console.dir(error)
          );
    }
  }

}
