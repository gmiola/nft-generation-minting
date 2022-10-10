import { Component, OnInit, Input } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { NumberFormatStyle } from '@angular/common';
import { ThisReceiver } from '@angular/compiler';
import { ObjToText } from 'src/app/obj-to-text';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-images-selection',
  templateUrl: './images-selection.component.html',
  styleUrls: ['./images-selection.component.css']
})
export class ImagesSelectionComponent implements OnInit {

  selectedFiles?: FileList;
  message: string[] = [];
  previews: string[] = [];
  generable: boolean = false;

  //for obj-to-txt (json) configuration construction
  numLayers: number;
  numNFTtoGenerate: number;
  layers: string[] = [];
  cardinalities: Map<string, number> = new Map<string, number>;
  weights: Map<string, number[]> = new Map<string, number[]>;
  tempConfigObj: ObjToText = new ObjToText(); 

  //form for parameters (weights)
  paramGroup = this.fb.group({weightForms: this.fb.array(
    [])
  });


  constructor(
    private uploadService: FileUploadService, 
    private router: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.generable=false;
    this.numLayers = history.state.data.numLayers;
    this.numNFTtoGenerate = history.state.data.numNFTtoGenerate;
    //Create array from comma separated string, also removing whitespaces
    this.layers = history.state.data.layers.split(',');
    this.layers = this.layers.map(str => str.trim());

    console.log('History: ');
    console.log(this.numLayers);
    console.log(this.numNFTtoGenerate);
    console.log(this.layers);
  }

  selectFiles(event: any, layer: string): void {
    this.message = [];
    this.selectedFiles = event.target.files;
    this.previews = [];
    this.removeAllWeightsControl();

    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      //update the cardinality of the selected layer
      this.cardinalities.set(layer, numberOfFiles);
      console.log(this.cardinalities);

      //clear the backend directory
      this.uploadService.delete(sessionStorage.getItem("access"), layer).subscribe();

      //create image previevws and weight forms
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };
        //reads from local url
        reader.readAsDataURL(this.selectedFiles[i]);
        //add a form
        this.addWeightControl();   
      }
    } 
  }

  get weightForms(): FormArray {
    return this.paramGroup.get('weightForms') as FormArray;
  }

  addWeightControl() {
    this.weightForms.push(this.fb.control(1,null,null));
  }

  removeAllWeightsControl(){
    this.weightForms.clear();
  }

  uploadFiles(layer: string): void {
    this.message = [];

    if (this.selectedFiles) {
       
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i], sessionStorage.getItem("access"), layer);
      }
    }
    this.previews = [];
    this.selectedFiles = null;
    //submit and clear the forms array
    console.log(this.weightForms.getRawValue());

    this.weights.set(layer, this.weightForms.getRawValue());
    this.removeAllWeightsControl();

  }

/*   upload(idx: number, file: File, address: string, layer: string): void {
    if (file) {
      this.uploadService.upload(file, address, layer).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded: ' + file.name;
            this.message.push(msg);
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        });
    }
  } */

  upload(idx: number, file: File, address: string, layer: string): void {
    if (file) {
      this.uploadService.upload(file, address, layer).subscribe(
        (event: any) => {},
        (err: any) => {
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        },
        () => {
          const msg = 'Uploaded: ' + file.name;
          this.message.push(msg);
        });
          
    }
  }

  sendConfig(){
    let ObjectToConvertToTxt: ObjToText = new ObjToText;
    ObjectToConvertToTxt.address = sessionStorage.getItem("access");
    ObjectToConvertToTxt.numLayers = this.numLayers;
    ObjectToConvertToTxt.numNFTtoGenerate = this.numNFTtoGenerate;
    ObjectToConvertToTxt.layers = this.layers;
    //cardinalities from map -> number list (for json compatibility)
    this.layers.forEach((value) => ObjectToConvertToTxt.cardinalities.push(this.cardinalities.get(value)));
    //weights from map -> list of number lists (for json compatibility)
    this.layers.forEach((value) => ObjectToConvertToTxt.weights.push(this.weights.get(value)));

    console.log(ObjectToConvertToTxt);

    this.tempConfigObj = ObjectToConvertToTxt;
    
  }


}
