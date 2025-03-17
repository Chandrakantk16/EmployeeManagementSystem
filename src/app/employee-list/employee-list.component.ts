import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../shared/employee.service';

 
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent {
  EmployeeList:any
  psize=5;
  currentPage = 1;
  
  
 
  constructor(private route:Router,private myhttp:HttpClient,private employeeService: EmployeeService ){
    this.getData();
  }
  
  
  EditEmployee(ID: number) {
    this.route.navigate(['/employee-list',ID]);
    
  }

  deleteEmployee(employeeID: number) {
    const confirmDelete = confirm('Are you sure you want to delete this employee?');
    if (confirmDelete) {
      this.employeeService.deleteEmployee(employeeID).subscribe(()=>{
        this.getData();
      });
      alert('Employee deleted successfully');
    }
  }
  
  AddEmployee(){
  this.route.navigate(['/employee-details'])
}
getData() {

  this.myhttp.get('http://localhost:55860/api/employees')  // Adjusted query parameter
    .subscribe((response: any) => {
      this.EmployeeList = response;
      console.log(this.EmployeeList);  
    });
}
}