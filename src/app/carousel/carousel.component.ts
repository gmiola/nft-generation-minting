import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';
import { Observable } from 'rxjs';
import { Image } from '../image';
import { Location } from '@angular/common';
import { ObjToText } from '../obj-to-text';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  
  imageInfos?: Observable<any>;
  images: any;
  completed: boolean = false;

  tempConfigObj: ObjToText = new ObjToText();


  constructor(private uploadService: FileUploadService, private location: Location) { }

  ngOnInit(): void {
    console.log("Carousel received state: ", history.state.data.tempConfigObj);
    this.tempConfigObj = history.state.data.tempConfigObj;

  }

  generate(): void{
    console.log("generate called");
    this.imageInfos = this.uploadService.generateNFTs(sessionStorage.getItem("access"), this.tempConfigObj);
    this.imageInfos.subscribe(
      (res) => {
        
        this.images = res;
        console.log("Images in res: ",this.images);
      },
      () => {},
      () => { this.completed = true;
        console.log("Images body in complete: ", this.images.body);
        }
    );
    console.log("generate done");
  }

  goBack() {
    this.location.back();
  }


}
