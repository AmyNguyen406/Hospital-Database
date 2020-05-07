# Hospital-Database

This is an example Hospital Database. 

The CreateTable script creates the tables for the hospital database. These tables include;
  - Department
  - Room
  - DepartmentRooms (Association table for Department and Room)
  - Employee
  - Patient
  - Medical Record
  - EmployeePatient (Association table for Employee and Patient)
  - Inpatient (Association table for Patient, Department, and Room)
  
The Insert script inserts a few rows of basic data into the database. As of 5/6 I am in the process of creating a Node.js script that will automatically generate rows for specific tables.
  
The DropTables script is used to drop all of the tables from the rows. This was created for debugging reasons when issues arose when developing the Insert script. The drop script can be easily altered to specify for certain tables. 
