import { Component, OnInit } from '@angular/core';
import {Plot} from "../../models/plot.model";
import {PlotService} from "../../services/plot.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-plot',
  templateUrl: './add-plot.component.html',
  styleUrls: ['./add-plot.component.css']
})
export class AddPlotComponent implements OnInit {

  plot: Plot = new Plot();
  submitted: boolean = false;

  constructor(private plotService: PlotService,
              private router: Router) { }

  ngOnInit() {
  }

  newPlot() {
    this.submitted = false;
    this.plot = new Plot();
  }

  save() {
    this.plotService
      .createPlot(this.plot).subscribe(data => {
        console.log(data)
        this.plot = new Plot();
        //this.gotoList();
      },
      error => console.log(error));
  }

  onSubmit() {
    this.submitted = true;
    this.save();
  }

  gotoList() {
    this.router.navigate(['/listPlots']);
  }

}
