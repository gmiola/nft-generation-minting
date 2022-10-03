import { Component, OnInit } from '@angular/core';
import { NumberValueAccessor } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.css']
})
export class ConfigComponent implements OnInit {

  configForm = new FormGroup({
    numLayers: new FormControl(''),
    numNFTtoGenerate: new FormControl(''),
    layers: new FormControl('')

  });
  
  


  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    // TODO: Use EventEmitter with form value
    console.warn('Numero layers: ' + this.configForm.value.numLayers);
    console.warn('Numero NFT: ' + this.configForm.value.numNFTtoGenerate);
    console.warn('Layers: ' + this.configForm.value.layers);


  }

}
