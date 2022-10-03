import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


const MatComponents = [
  MatButtonModule,
  MatStepperModule,
  MatCardModule,
  MatFormFieldModule,
  MatProgressSpinnerModule
];
@NgModule({
  declarations: [],
  imports: [MatComponents], 
  exports: [MatComponents]
})
export class MaterialModule { }
