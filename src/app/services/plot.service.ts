import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Plot} from "../models/plot.model";

@Injectable({
  providedIn: 'root'
})
export class PlotService {

  private baseUrl = 'http://localhost:8080/irrigation-server/plot';

  constructor(private http: HttpClient) {
  }

  getAllPlots(): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/getAllPlots');
  }

  findPlotById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/findPlot/' + id);
  }

  createPlot(plot: Plot): Observable<any> {
    return this.http.post(`${this.baseUrl}` + '/createPlot', plot);
  }

  updatePlot(plot: Plot): Observable<any> {
    return this.http.put(`${this.baseUrl}` + '/updatePlot', plot);
  }

  deletePlot(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}` + '/deletePlot/' + id);
  }

  getPlotSensors(plotId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}` + '/getPlotSensors/' + plotId);
  }

  updateSensorStatus(sensorId: number, status: boolean) {
    return this.http.put(`${this.baseUrl}` + '/updateSensorStatus/' + sensorId + '/' + status, {});
  }
}

