import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { GridModule, PDFModule, ExcelModule, GridComponent } from '@progress/kendo-angular-grid';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import{HttpClientModule} from '@angular/common/http';
import { EmployeeService } from './shared/employee.service';
import { NgxPaginationModule } from 'ngx-pagination';
import { ErrorComponent } from './error/error.component';
import { LabelModule } from '@progress/kendo-angular-label';
import{ CardModule} from '@progress/kendo-angular-layout';
import { UploadModule } from '@progress/kendo-angular-upload';




@NgModule({
  declarations: [
    AppComponent,
    EmployeeDetailsComponent,
    EmployeeListComponent,
    ErrorComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,ReactiveFormsModule,
    GridModule, PDFModule, ExcelModule,
    InputsModule,DialogModule,ButtonsModule,
    DropDownsModule,BrowserAnimationsModule,
    HttpClientModule,NgxPaginationModule,
    LabelModule,CardModule,UploadModule,
    
    
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA], // Add this line to allow custom elements like kendo-upload
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
