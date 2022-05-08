import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { ListPlotsComponent } from './components/list-plots/list-plots.component';
import { AddPlotComponent } from './components/add-plot/add-plot.component';
import { UpdatePlotComponent } from './components/update-plot/update-plot.component';
import { MonitorComponent } from './components/monitor/monitor.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfigurationComponent,
    ListPlotsComponent,
    AddPlotComponent,
    UpdatePlotComponent,
    MonitorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
