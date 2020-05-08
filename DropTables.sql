/* 
	Drop Table Script 
	Used in the event that we need to redesign the schema. 
*/

--DROP TABLE IF EXISTS Department, Room, Employee, Patient, DepartmentRooms, EmployeePatient, Inpatient, MedicalRecord CASCADE;

SELECT * FROM medicalrecord

