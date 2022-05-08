import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConfigurationComponent} from "./components/configuration/configuration.component";
import {ListPlotsComponent} from "./components/list-plots/list-plots.component";
import {AddPlotComponent} from "./components/add-plot/add-plot.component";
import {UpdatePlotComponent} from "./components/update-plot/update-plot.component";
import {MonitorComponent} from "./components/monitor/monitor.component";

const routes: Routes = [
  { path: '', redirectTo: 'configuration', pathMatch: 'full' },
  { path: 'configuration', component: ConfigurationComponent },
  { path: 'listPlots', component: ListPlotsComponent },
  { path: 'addPlot', component: AddPlotComponent },
  { path: 'updatePlot/:id', component: UpdatePlotComponent },
  { path: 'monitor', component: MonitorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
