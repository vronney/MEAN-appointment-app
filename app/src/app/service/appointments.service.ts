import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Appointment } from '../model/Appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsService {
  appointments: Appointment[] = [];
  appointmentsUpdated = new Subject<Appointment[]>();
  BASE_URL = environment.API_URL;

  constructor(private http: HttpClient) { }

  getAppointments() {
    // this.http.get<{message: string, appointments: any}>(`${this.BASE_URL}/appointments`)
    //   .pipe(map((appointmentData) => {
    //     return appointmentData.appointments.map(appointment => {
    //       return {
    //         appointmentDate: appointment.appointmentDate,
    //         name: appointment.name,
    //         description: appointment.description,
    //         phone: appointment.phone,
    //         email: appointment.email,
    //         id: appointment._id
    //       }
    //     });
    //   }))
    //   .subscribe(transformedAppointments => {
    //     this.appointments = transformedAppointments;
    //     this.appointmentsUpdated.next([...this.appointments]);
    //   })
    this.http.get<{ message: string, appointments: Appointment[] }>(`${this.BASE_URL}/appointments`)
      .subscribe(appointmentData => {
        this.appointments = appointmentData.appointments;
        this.appointmentsUpdated.next([...this.appointments]);
      });
  }

  getAppointmentUpdatedListener() {
    return this.appointmentsUpdated.asObservable();
  }

  addAppointment(appointmentDate: string, name: string, description: string, phone: number, email: string) {
    const appointment: Appointment = {id: null, appointmentDate: appointmentDate, name: name, description: description, phone: phone, email: email};
    this.http.post<{message: string, appointmentId: string}>(`${this.BASE_URL}/appointments`, appointment)
      .subscribe(responseData => {
        const id = responseData.appointmentId;
        appointment.id = id;
        this.appointments.push(appointment);
        this.appointmentsUpdated.next([...this.appointments]);
      });
  }

  cancelAppointment(id: string) {
    this.http.delete(`${this.BASE_URL}/appointments/${id}`)
      .subscribe(() => {
        const updatedAppointments = this.appointments.filter(appointment => {
          appointment.id !== appointment.id
        });
        this.appointments = updatedAppointments;
        this.appointmentsUpdated.next([...this.appointments]);
      });
  }
}
