import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/model/Appointment';
import { AppointmentsService } from 'src/app/service/appointments.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent implements OnInit {
  successMsg: string;
  errorMsg: string;
  appointmentDate: string;
  name: string;
  description: string;
  phone: number;
  email: string;

  constructor(private appointmentService: AppointmentsService) { }

  ngOnInit(): void {
  }

  createAppointment() {
    this.successMsg = '';
    this.errorMsg = '';
    this.appointmentService.createAppointment(this.appointmentDate, this.name, this.description, this.phone, this.email)
      .subscribe((createdAppointment: Appointment) => {
        this.appointmentDate = '';
        this.name = '';
        this.description = '';
        this.phone = 123-456-7890;
        this.email = '';
        const appointmentDate = new Date(createdAppointment.appointmentDate).toDateString();
        this.successMsg = `Appointment Booked successfully for ${appointmentDate}`;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }
}
