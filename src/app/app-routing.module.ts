import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndiaComponent } from './india/india.component';



const routes: Routes = [
  {path: '', redirectTo: 'COVID19/global', pathMatch: 'full'},
  {path: 'COVID19/global', component: DashboardComponent},
  {path: 'COVID19/india', component: IndiaComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
