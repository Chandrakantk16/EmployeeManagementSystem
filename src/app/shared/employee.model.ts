export interface Employee {
   // ID:number;
    FirstName:string;
    LastName:string;
    Gender:string;
    Salary:string;
    EmployeeImages?: EmployeeImage[];
}

export interface EmployeeImage {
  ID: number;
  EmployeeImagePath: string;
}  // This can store the URL or the file name of the uploaded document


