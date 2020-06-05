import { Component, OnInit, ViewChild, HostListener, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from "@angular/forms";

import { ToastrService } from 'ngx-toastr';

import { Service } from 'src/app/data/service';
import { ServicesService } from 'src/app/shared/service/services.service';
import { PathService } from 'src/app/shared/service/path.service';

@Component({
  selector: 'app-services-dashboard',
  templateUrl: './services-dashboard.component.html',
  styleUrls: ['./services-dashboard.component.scss']
})
export class ServicesDashboardComponent implements OnInit {
  
  path = PathService.path;

  services: Service[];
  service: Service;

  serviceForm: FormGroup;
  editorContent: string;
  editEditorContent: String;
  imageFile: File = null;
  imageDef: String = '../../../assets/img/noimage.png';

  constructor(
    private cdRef: ChangeDetectorRef,
    private serviceForService: ServicesService,
    private toastr: ToastrService,
    private form: FormBuilder
    ) { this.ctreateForm(); }

  ngOnInit(): void {
    this.getServices();
  }

  ctreateForm(): void {
    this.serviceForm = this.form.group({
      heading: ['', Validators.required ],
      description: [''],
      shortDescription: ['', Validators.required ],
      urlImage: [''],
    });
  }

  getServices(): void {
    this.serviceForService.getServices().subscribe(
      services => this.services = services,
      error => console.dir(error)
    );
  }

  // DELETE article
  delService(id:any) {
    this.serviceForService.delService(id)
        .subscribe(
            res => {
                this.serviceForService.getServices()
                    .subscribe(services => this.services = services)
            },
            error => console.dir(error),
        )
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

  // ADD service
  addService(heading, description, shortDescription) {
    let img = new FormData();
    let imageName;
    if (this.imageFile !== null) {
        img.append('serviceImage', this.imageFile, this.imageFile.name);
        imageName = 'http://tp.polessu.by/uploads/service/' + this.imageFile.name;
        this.serviceForService.addService(heading, description, shortDescription, imageName, img)
            .subscribe(
                service => {
                    this.services.push(service);
                    this.toastr.success('Статья добавлена');
                    this.serviceForm.reset();
                    this.serviceForService.getServices()
                        .subscribe(services => this.services = services);
                },
                error => console.dir(error),
            );
    } else {
        this.serviceForService.addService(heading, description, shortDescription, imageName, img)
            .subscribe(
              service => {
                    this.services.push(service);
                    this.toastr.success('Статья добавлена');
                    this.serviceForm.reset();
                    this.serviceForService.getServices()
                        .subscribe(services => this.services = services);
                },
                error => console.dir(error),
            );
    }
  }

}
