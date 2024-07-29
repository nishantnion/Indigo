export interface Notification {
    notification_id: string;
    flight_id: string;
    message: string;
    timestamp: Date;
    method: string;
    recipient: string;
  }