import { CommonModule } from '@angular/common';
import { NgModule } from "@angular/core";
import { MatTableResponsiveDirective } from "../mat-table-reponsive.directive";

@NgModule({
  declarations: [MatTableResponsiveDirective],
  exports: [MatTableResponsiveDirective]
})
export class MatTableResponsiveModule {}
