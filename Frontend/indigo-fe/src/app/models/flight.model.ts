export interface Flight {
    flight_id: string;
    airline: string;
    status: string;
    departure_gate: string;
    arrival_gate: string;
    scheduled_departure: Date;
    scheduled_arrival: Date;
    actual_departure: Date | null;
    actual_arrival: Date | null;
  }