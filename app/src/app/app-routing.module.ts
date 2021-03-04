import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppointmentListComponent } from './components/appointment-list/appointment-list.component';
import { AppointmentComponent } from './components/appointment/appointment.component';

const routes: Routes = [
  {
    path: '',
    component: AppointmentComponent
  },
  {
    path: 'appointment-list',
    component: AppointmentListComponent
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
