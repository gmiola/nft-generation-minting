import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CarouselComponent } from './carousel/carousel.component';
import { ImagesSelectionComponent } from './components/images-selection/images-selection.component';
import { ConfigComponent } from './config/config.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path: '',   redirectTo: '/login', pathMatch: 'full'},
  {path: 'config', component: ConfigComponent },
  {path: 'login', component: LoginComponent },
  {path: 'images-selection', component: ImagesSelectionComponent },
  {path: 'generate', component: CarouselComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
