import { AuthorizationLevel } from 'src/authenticable/schema/authenticable.schema';

export class LoginResponse {
  authorization_level: AuthorizationLevel;
  _id: string;
  phone_number?: string;
  name?: string;
  surname?: string;
  manager_city?: string;
  manager_district?: string;
  company_name?: string;
  city?: string;
  district?: string;
  email?: string;
  appointment_config?: AppointmentConfigResponse;
  services?: CompanyServicesResponse[];
}

interface AppointmentConfigResponse {
  working_hour_start: number;
  working_hour_minute_start: number;
  working_hour_end: number;
  working_hour_minute_end: number;
  can_customer_add_note: boolean;
  note_to_customer: string;
}

interface CompanyServicesResponse {
  service_id: string;
  service_name: string;
  price: number;
}
