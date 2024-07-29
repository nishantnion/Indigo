import { Component, OnInit } from '@angular/core';
import { Flight } from '../../models/flight.model';
import { FlightService } from '../../services/flight.service';
import { SocketService } from '../../services/socket.service';

@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit {
  dataSource: { filteredData: Flight[] } = { filteredData: [] };
  private allFlights: Flight[] = [];

  constructor(
    private flightService: FlightService,
    private socketService: SocketService
  ) {}

  ngOnInit() {
    this.loadFlights();
    this.listenForUpdates();
  }

  loadFlights() {
    this.flightService.getFlights().subscribe(flights => {
      this.allFlights = flights;
      this.dataSource.filteredData = flights;
    });
  }

  listenForUpdates() {
    this.socketService.listenForFlightUpdates().subscribe(updatedFlight => {
      const index = this.allFlights.findIndex(flight => flight.flight_id === updatedFlight.flight_id);
      if (index !== -1) {
        this.allFlights[index] = updatedFlight;
        this.applyFilter({ target: { value: '' } });
      }
    });
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value.toLowerCase();
    this.dataSource.filteredData = this.allFlights.filter(flight =>
      flight.flight_id.toLowerCase().includes(filterValue) ||
      flight.airline.toLowerCase().includes(filterValue) ||
      flight.status.toLowerCase().includes(filterValue)
    );
  }

  onFlightSelect(flight: Flight) {
    console.log('Selected flight:', flight);
    // Implement flight details view or dialog
  }
}