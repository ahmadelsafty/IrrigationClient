import {Component, OnInit} from '@angular/core';
import {Plot} from "../../models/plot.model";
import {PlotService} from "../../services/plot.service";
import {Observable} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-plots',
  templateUrl: './list-plots.component.html',
  styleUrls: ['./list-plots.component.css']
})
export class ListPlotsComponent implements OnInit {

  plotsList?: Plot[];

  constructor(private plotService: PlotService, private router: Router) {
  }

  ngOnInit() {
    this.reloadData();
  }

  reloadData() {
    this.plotService.getAllPlots()
      .subscribe(data => {
        console.log(data);
        this.plotsList = data;
      }, error => console.error(error));
  }

  updatePlot(id: number) {
    this.router.navigate(['updatePlot', id]);
  }

  deletePlot(id: number) {
    this.plotService.deletePlot(id)
      .subscribe(data => {
        console.log(data);
        this.reloadData();
      }, error => console.error(error));
  }

}
