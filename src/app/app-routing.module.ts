import { RangeChartComponent } from './range-chart/range-chart.component';
import { LastValuesComponent } from './last-values/last-values.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path: '', redirectTo: 'last-values', pathMatch: 'full' },
  { path: 'last-values', component: LastValuesComponent },
  { path: 'range-chart', component: RangeChartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
