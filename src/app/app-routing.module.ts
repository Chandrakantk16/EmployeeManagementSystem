import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [

  {path:'employee-list' , component: EmployeeListComponent},
  {path:'employee-details' , component: EmployeeDetailsComponent},
  { path: 'employee-list/:id', component: EmployeeDetailsComponent },
  { path: '', redirectTo: '/employee-list', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },  // Wildcard route for invalid paths
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
