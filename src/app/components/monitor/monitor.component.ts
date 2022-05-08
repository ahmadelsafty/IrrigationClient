import {Component, OnInit} from '@angular/core';
import {PlotService} from "../../services/plot.service";
import {ConfigurationService} from "../../services/configuration.service";
import {Plot} from "../../models/plot.model";
import {Configuration} from "../../models/configuration.model";
import {Sensor} from "../../models/sensor.model";
import {interval, Subscription} from "rxjs";

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {

  currentPlot: Plot = new Plot();
  currentPlotSensors: Sensor[] = [];
  configuration: Configuration = new Configuration();
  plotsList: Plot[] = [];
  job?: Subscription;

  constructor(private plotService: PlotService,
              private configurationService: ConfigurationService) {
  }

  ngOnInit(): void {
    this.plotService.getAllPlots()
      .subscribe(data => {
        console.log(data);
        this.plotsList = data;
      }, error => console.error(error));

    this.configurationService.getConfigData()
      .subscribe(data => {
        console.log(data);
        this.configuration = data;
        this.startPeriodicSensorsCheck();
      }, error => console.error(error));

  }

  plotSelected(evt: any) {
    let element = document.getElementById("plotSelect");
    //console.log(this.selectedPlot);
    // console.log("via select: " + element.value);
    console.log("via evt target: " + evt.target.value);
    console.log("via evt currentTarget: " + evt.currentTarget.value);
    console.log("via evt source: " + evt.srcElement.value);
    debugger;
    let plotId: number = parseInt(evt.target.value);
    if (plotId > 0) {
      this.plotService.findPlotById(plotId)
        .subscribe(data => {
          console.log(data);
          this.currentPlot = data;
          this.plotService.getPlotSensors(this.currentPlot.id)
            .subscribe(data2 => {
              console.log(data2);
              this.currentPlotSensors = data2;
              this.startPeriodicSensorsCheck();
            }, error => console.error(error));

        }, error => console.error(error));
    } else {
      this.currentPlotSensors = [];
    }
  }

  getSensorById(sensorId: number): Sensor {
    let sensor: Sensor = new Sensor();
    for (let i = 0; i < this.currentPlotSensors.length; i++) {
      if (this.currentPlotSensors[i].id == sensorId) {
        sensor = this.currentPlotSensors[i];
        break;
      }
    }
    return sensor;
  }

  getColor(sensorStatus: boolean): string {
    if (sensorStatus == true) return '#00FF00';
    else return '#FF0000';
  }

  sensorCheckChanged(evt: any) {
    let check = evt.target;
    let sensorId = check.id;
    let status: boolean = check.checked;

    console.log("Sensor changed: " + sensorId);
    this.plotService.updateSensorStatus(sensorId, status)
      .subscribe(data => {
        console.log(data);
        this.startPeriodicSensorsCheck();

      }, error => console.error(error));

    if (status == true) {
      evt.srcElement.parentElement.style.backgroundColor = "#00FF00";
    } else {
      evt.srcElement.parentElement.style.backgroundColor = "#FF0000";
    }

  }

  startPeriodicSensorsCheck() {
    let warningsDiv = document.getElementById("warningsDiv");
    while (warningsDiv?.firstChild) {
      warningsDiv.removeChild(warningsDiv.firstChild);
    }
    if (this.configuration?.absorptionTimeInMinutes != 0 &&
      this.configuration?.areaUnitPerSensor != 0 &&
      this.configuration?.retries != 0 &&
      this.configuration?.sensorIrrigationPerMinute != 0 &&
      this.configuration?.slotTimeInMinutes != 0 &&
      this.configuration?.waterMeterPerAreaUnit != 0) {

      if (this.job != undefined) this.job?.unsubscribe();
      let slot = this.configuration?.slotTimeInMinutes * 1000;
      let retry: number = 0;
      //for (let i = 0; i < this.configuration.retries; i++) {
      this.job = interval(slot).subscribe(() => {
        let now = new Date();
        console.log(now.toLocaleString());
        retry++;
        this.plotService.getPlotSensors(this.currentPlot.id)
          .subscribe(data => {
            let sensors = data;
            while (warningsDiv?.firstChild) {
              warningsDiv.removeChild(warningsDiv.firstChild);
            }
            let warningsContent: string = '';
            for (let j = 0; j < sensors.length; j++) {
              let sensor = sensors[j];
              if (sensor.status != true) {
                let sensorName: string = 'Sensor ' + sensor.id + ' of ' + this.currentPlot.name;
                let component: string = '<div style="background-color: yellow;">';
                component += sensorName;
                component += ' is idle (retry: ' + retry + ')';
                component += '</div>\n';
                warningsContent += component;
              }
            }
            // @ts-ignore
            warningsDiv.innerHTML = warningsContent;
            if (retry == this.configuration.retries) {
              this.job?.unsubscribe();
            }
          }, error => console.error(error));
      });
      //}
    }
  }

}
