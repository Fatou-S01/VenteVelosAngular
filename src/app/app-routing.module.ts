import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MarquesComponent } from './components/marques/marques.component';
import { CategoriesComponent } from './components/categorie/categorie';


const routes: Routes = [
  {
    path: '', component: HomeComponent
  },

  {
    path: 'marque', component: MarquesComponent
  },
  {
    path: 'categorie', component: CategoriesComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
