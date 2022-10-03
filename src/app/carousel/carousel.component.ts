import { Component, OnInit } from '@angular/core';
import { FileUploadService } from '../services/file-upload.service';
import { Observable } from 'rxjs';
import { Image } from '../image';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  
  imageInfos?: Observable<any>;
  images: Image[] = [];
  completed: boolean = false;


  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
  }

  generate(): void{
    console.log("generate called");
    this.imageInfos = this.uploadService.generateNFTs(sessionStorage.getItem("access"));
    this.imageInfos.subscribe(
      imageInfo => {
        this.images.push(imageInfo); console.log(imageInfo)},
        () => {},
        () => {this.completed = true; console.log("compelted")}
     );
    console.log("generate done");
  }


}
