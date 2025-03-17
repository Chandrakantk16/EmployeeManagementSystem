import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../shared/employee.service';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../shared/employee.model';
 
@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent{
  public genderList: Array<string> = [
    "Male",
    "Female"
  ];
 
  EmployeeForm: FormGroup;
  EmployeeId:number | null = null;
  imagePreview: string | ArrayBuffer | null = 'assets/default-avatar.png';
  selectedFile: File | null = null;
  

  constructor(private router: Router, private fb: FormBuilder,private employeeService: EmployeeService,private activatedRoute: ActivatedRoute) {
    this.EmployeeForm = this.fb.group({
     // ID: [0],
      FirstName: ['',Validators.required,Validators.pattern(/^[a-zA-Z ]*$/)],
      LastName: ['',[Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)]],
      Gender: ['',Validators.required],
      Salary: ['',Validators.min(0)],
      EmployeeImage:['']
    })
 
  }
  ngOnInit(){
    this.activatedRoute.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id && id > 0){
      this.EmployeeId = +id;
      this.loadEmployeeDetails(this.EmployeeId);
    }
    else {
      this.resetForm(); // Prepare for adding a new employee
    }
    })
  }
  
  loadEmployeeDetails(id: number) {
    this.employeeService.getEmployeeById(id).subscribe({
      next: (employee) => {
        this.EmployeeForm.patchValue(employee);
        
      },
      error: (error) => {
        console.error('Error loading employee:', error);
      }
    });
  }

    /*loadEmployeeDetails(id: number): void {
      this.employeeService.getEmployeeImage(id).subscribe({
        next: (employee) => {
          if (employee) {
            // Patching the form with the employee data
            this.EmployeeForm.patchValue({
              FirstName: employee.FirstName,
              LastName: employee.LastName,
              Gender: employee.Gender,
              Salary: employee.Salary
            });
    
            // Setting the image preview URL
            this.imagePreview = employee.ImagePath || 'assets/default-avatar.png';
          }
        },
        error: (err) => {
          // Handle error when the request fails
          alert('Error fetching employee details.');
          console.error('Error:', err);
        }
      });
    }*/
    //reset form for adding new employee
    resetForm() {
      this.EmployeeId = null;
      this.EmployeeForm.reset();
      this.imagePreview = 'assets/default-avatar.png'; // Reset image preview
    }
     // Handle file selection (for image)
  onFileSelect(event: any) {
    const file = event.target.files[0];

    if (file) {
      const allowedTypes = ['image/png', 'image/jpeg' , 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert('Only JPG and PNG images are allowed!');
        return;
      }

      if (file.size > 1048576) { // 1MB limit
        alert('File size must be less than 1MB!');
        return;
      }

      this.selectedFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  navigateToEmployeeList() {
    this.router.navigate(['/employee-list']); // Navigate to the employee list
  }

 
  GoBack() {
    this.EmployeeForm.reset();
    // this.resetForm();
    // this.selectedFile = null;
    // this.imagePreview = 'assets/default-avatar.png'; 
    // this.EmployeeForm.get('EmployeeImage')?.reset();
    //this.router.navigate(['/employee-list']);
  }
 
  /*saveEmployee() {
    if(this.EmployeeForm.valid){
      if(this.EmployeeId){
        //update employee
        this.employeeService.updateEmployee(this.EmployeeId,this.EmployeeForm.value).subscribe({
          next: ()=>{
            alert('Employee Updated Successfully!');
            this.router.navigate(['/employee-list']);
          },
          error(err) {
            console.error('Error Updating Employee:',err);
            alert('Failed to Update Employee.');
          },
        })
      }else {
        //add employee
        this.employeeService.AddEmployee(this.EmployeeForm.value).subscribe({
        next:(response) =>{
          console.log("Employee Added:", response);
          alert('Employee added successfully!');
          this.router.navigate(['/employee-list']);
        },
        error(err) {
          console.error('Error adding employee:',err);
          alert('Failed to add employee.');
        }
      });
    }
    }else{
      alert("Please fill in all required fields.")
    }


  }*/

    saveEmployee() {
      if (this.EmployeeForm.invalid) {
        alert("Please fill in all required fields.");
        return;
      }
    
      const employeeData : Employee = {
       // ID: this.EmployeeForm.get('ID')?.value,
        FirstName: this.EmployeeForm.get('FirstName')?.value,
        LastName: this.EmployeeForm.get('LastName')?.value,
        Gender: this.EmployeeForm.get('Gender')?.value,
        Salary: this.EmployeeForm.get('Salary')?.value
      };
    
      console.log('Employee data:', employeeData); // Log the data before sending
    
      if (this.EmployeeId) {
        // Update employee
        this.employeeService.updateEmployee(this.EmployeeId, employeeData).subscribe({
          next: () => {
            alert('Employee Updated Successfully!');
            this.router.navigate(['/employee-list']);
          },
          error: (err) => {
            console.error('Error Updating Employee:', err);
            alert('Failed to Update Employee. Please check the console for more details.');
          }
        });
      } else {
        // Add employee
        this.employeeService.AddEmployee(employeeData).subscribe({
          next: (response) => {
            alert('Employee added successfully!');
          
            // Ensure an image file is selected before attempting the upload
            if (this.selectedFile && response.ID) {
              const formData = new FormData();
              formData.append('image', this.selectedFile, this.selectedFile.name);
    
              // Upload employee image
              this.employeeService.uploadEmployeeImage(response.ID, formData).subscribe(
                () => {
                  alert("Image uploaded successfully!");
                  this.router.navigate(['/employee-list']);
                },
                // (error) => {
                //   console.error("Image upload error:", error);
                //   alert("Employee saved, but image upload failed.");
                // }
              );
            } else {
              // If no image selected, just navigate to employee list
              this.router.navigate(['/employee-list']);
            }
          },
          error: (err) => {
            console.error('Error adding employee:', err);
            alert(`Failed to add employee. Error: ${err.message || err}`);
          }
        });
      }
    }
      
}


  
  
  

 
