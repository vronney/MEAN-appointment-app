import { Component, OnInit, OnDestroy } from '@angular/core';
import { Appointment } from 'src/app/model/Appointment';
import { AppointmentsService } from 'src/app/service/appointments.service';
import { mergeMap } from 'rxjs/operators';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.scss']
})
export class AppointmentListComponent implements OnInit, OnDestroy {

  mobile = false;
  loading = true;
  errorMsg: string;
  successMsg: string;
  appointments: Appointment[] = [];
  appointmentSub: Subscription;
  columns = ['appointmentDate', 'name', 'description', 'phone', 'email' , 'cancel'];

  constructor(private appointmentService: AppointmentsService) { }

  ngOnInit(): void {
    if (window.screen.width <= 600) {
      this.mobile = true;
    }
    this.loading = true;
    this.appointmentService.getAppointments();
    this.appointmentSub = this.appointmentService.getAppointmentUpdatedListener()
      .subscribe((appointments: Appointment[]) => {
        this.loading = false;
        this.appointments = appointments;
      });
  }

  onDelete(appointmentId: string) {
    this.appointmentService.cancelAppointment(appointmentId);
    this.appointmentService.getAppointments();
    location.reload();
  }

  ngOnDestroy() {
    this.appointmentSub.unsubscribe();
  }


}
