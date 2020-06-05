import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from "@angular/forms";

import { ToastrService } from 'ngx-toastr';

import { Service } from 'src/app/data/service';
import { ServicesService } from 'src/app/shared/service/services.service';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-service-edit-dashboard',
  templateUrl: './service-edit-dashboard.component.html',
  styleUrls: ['./service-edit-dashboard.component.scss']
})
export class ServiceEditDashboardComponent implements OnInit {

  service: Service;

  serviceForm: FormGroup;
  editorContent: String;
  imageFile: File = null;
  imageDef: String = '../../../../assets/img/noimage.png';

  

  constructor(private cdRef: ChangeDetectorRef,
    private serviceForService: ServicesService,
    private toastr: ToastrService,
    private form: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    ) { this.ctreateForm(); }

  ngOnInit(): void {
    this.getService();
  }

  ctreateForm(): void {
    this.serviceForm = this.form.group({
      heading: ['', Validators.required ],
      description: [''],
      shortDescription: ['', Validators.required ],
      urlImage: [''],
    });
  }

  getService(): void {
    this.serviceForService.getService(this.route.snapshot.paramMap.get('id')).subscribe(service => {
      this.service = service;
      this.serviceForm = this.form.group({
        heading: [service.heading, Validators.required ],
        description: [service.description],
        shortDescription: [service.shortDescription, Validators.required ],
        urlImage: [service.imgUrl],
      });
      this.editorContent = service.description;
      this.imageDef = service.imgUrl;
    })
  }

  // GET uploaded file info
  onSelectedFile(event) {
    if (<File>event.target.files[0] != null) {
        this.imageFile = <File>event.target.files[0];
    } else {
        this.imageFile = null;
    }

    // Image preview
    const reader = new FileReader();
    reader.onload = (event:any) => {
        this.imageDef = event.target.result
    };
    reader.readAsDataURL(this.imageFile)
  }

  updateService(id, heading, description, shortDescription) {
    let img = new FormData();
    let imageName;
    if (this.imageFile !== null) {
        img.append('serviceImage', this.imageFile, this.imageFile.name);
        imageName = 'http://tp.polessu.by/uploads/service/' + this.imageFile.name;
        this.serviceForService.updateService(id, heading, description, shortDescription, imageName, img)
            .subscribe(
                service => {
                    console.dir(service);
                    this.location.back();
                },
                error => console.dir(error),
            );
    } else {
        this.serviceForService.updateService(id, heading, description, shortDescription, imageName, img)
            .subscribe(
              service => {
                    this.serviceForService.getServices()
                        .subscribe(services => {
                          console.dir(service);
                          this.location.back();
                        });
                },
                error => console.dir(error),
            );
    }
  }
}
