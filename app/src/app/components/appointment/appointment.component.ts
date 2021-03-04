import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
  appointment: Appointment;
  appointmentId: string;

  constructor(private appointmentService: AppointmentsService, public route: ActivatedRoute) { }

  ngOnInit(): void {
  }

  createAppointment(form: NgForm) {
    this.successMsg = '';
    this.errorMsg = '';
      if (form.invalid) {
        return;
      } else {
        this.appointmentService.addAppointment(form.value.appointmentDate, form.value.name, form.value.description, form.value.phone, form.value.email);
        const date = new Date(form.value.appointmentDate).toDateString();
        this.successMsg = `Appointment successfully booked for ${date}.`;
      }
      form.resetForm();
  }
}
