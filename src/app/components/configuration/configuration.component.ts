import { Component, OnInit } from '@angular/core';
import {Configuration} from "../../models/configuration.model";
import {ConfigurationService} from "../../services/configuration.service";


@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.css']
})
export class ConfigurationComponent implements OnInit {

  configuration: Configuration = new Configuration();


  constructor(private configurationService: ConfigurationService) { }

  ngOnInit() {
    this.configurationService.getConfigData()
      .subscribe(data => {
        console.log(data);
        this.configuration = data;
      }, error => console.error(error));
  }

  updateConfiguration() {
    this.configurationService.updateConfigData(this.configuration)
      .subscribe(data => {
        console.log(data);

      }, error => console.error(error));
  }

  onSubmit() {
    this.updateConfiguration();
  }

}
