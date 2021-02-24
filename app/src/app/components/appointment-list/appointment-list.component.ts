import { Component, OnInit, ViewChild } from '@angular/core';
import { Appointment } from 'src/app/model/Appointment';
import { AppointmentsService } from 'src/app/service/appointments.service';
import { mergeMap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit {

  loading = true;
  errorMsg: string;
  successMsg: string;
  appointments: Appointment[];
  columns = ['appointmentDate', 'name', 'description', 'phone', 'email' , 'cancel'];

  constructor(private appointmentService: AppointmentsService) { }

  ngOnInit(): void {
    this.appointmentService.getAppointments()
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
        this.loading = false;
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
        this.loading = false;
      })
  }

  cancelAppointment(id: string) {
    this.appointmentService.cancelAppointment(id)
      .pipe(
        mergeMap(() => this.appointmentService.getAppointments())
      )
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
        this.successMsg = 'Successfully cancelled the appointment';
      },
      (error: ErrorEvent) => {
        this.errorMsg = error.error.message;
      });
  }

}
