import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Employee } from './employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employeeUrl:string='http://localhost:55860/api/Employees';
  private saveUrl: string = 'http://localhost:55860/api/employees/upload/';
  private imageUrl: string = 'http://localhost:55860/api/employees/getImage/';
 
  

  constructor(private myhttp:HttpClient) { }

  getEmployees(gender: string = 'ALL'): Observable<any> {
    return this.myhttp.get(`${this.employeeUrl}?gender=${gender}`);
  }
  
  // Save employee (Add or Update)
  // saveEmployee(id: number | null, employeeData: any): Observable<Employee> {
  //   if (id) {
  //     return this.myhttp.put<Employee>(`${this.employeeUrl}/${id}`, employeeData);
  //   } else {
  //     return this.myhttp.post<Employee>(this.employeeUrl, employeeData);
  //   }
  // }
  AddEmployee(employee: Employee): Observable<any> {
    console.log('Adding employee with data:', employee);  // Log the data being sent
    return this.myhttp.post<any>(this.employeeUrl, employee);
  }

  getEmployeeById(ID:number):Observable<Employee>
  {
return this.myhttp.get<Employee>(`${this.employeeUrl}/${ID}`);
  }

deleteEmployee(ID:number):Observable<any>
{
  return this.myhttp.delete(`${this.employeeUrl}/${ID}`);
}

updateEmployee(EmployeeId: number, employeeData:any): Observable<any> {
  return this.myhttp.put<any>(`${this.employeeUrl}/${EmployeeId}`, employeeData);
}

uploadEmployeeImage(EmployeeId: number, formData: FormData): Observable<Employee> {
  return this.myhttp.post<Employee>(`${this.saveUrl}/${EmployeeId}`, formData);
}
// New method to get employee image URL by employee ID
getEmployeeImage(EmployeeId: number): Observable<any> {
  return this.myhttp.get<any>(`${this.imageUrl}${EmployeeId}`);
}

}
