CREATE TABLE Department(
	departmentID SERIAL NOT NULL UNIQUE,
	floor_num VARCHAR(6) NOT NULL, 
	department_name VARCHAR(100) NOT NUll,
	PRIMARY KEY(floor_num, department_name)
);

CREATE TABLE Room(
	room_num VARCHAR(6) NOT NULL,
	occupied BOOLEAN NOT NULL,
	PRIMARY KEY(room_num)
);

CREATE TABLE DepartmentRooms(
	departmentID INT NOT NULL REFERENCES Department(departmentID),
	room_num VARCHAR(6) NOT NULL REFERENCES Room(room_num),
	PRIMARY KEY(departmentID, room_num)
);


CREATE TABLE Employee(
	employeeID INT CHECK(employeeID > 100000 AND employeeID < 999999) NOT NULL,
	first_name VARCHAR(100) NOT NULL,
	middle_name VARCHAR(100),
	last_name VARCHAR(100) NOT NULL,
	ssn VARCHAR(9) CHECK(length(ssn) = 9) NOT NULL,
	birthday VARCHAR(100) NOT NULL,
	sex CHAR(1) CHECK(sex = 'M' OR sex = 'F') NOT NULL,
	address VARCHAR(100) NOT NULL,
	phone VARCHAR(10) CHECK(LENGTH(phone) = 10) NOT NULL,
	occupation VARCHAR(100) NOT NULL,
	salary INT NOT NULL,
	departmentID INT NOT NULL,
	PRIMARY KEY(employeeID),
	FOREIGN KEY(departmentID) REFERENCES Department(departmentID)
);	


CREATE TABLE Patient(
	patientID SERIAL NOT NULL,
	first_name VARCHAR(100) NOT NULL,
	middle_name VARCHAR(100),
	last_name VARCHAR(100) NOT NULL,
	birthday VARCHAR(100) NOT NULL,
	sex CHAR(1) CHECK(sex = 'M' OR sex = 'F') NOT NULL,
	address VARCHAR(100) NOT NULL,
	phone VARCHAR(10) CHECK(LENGTH(phone) = 10) NOT NULL,
	inpatient BOOLEAN NOT NULL,
	PRIMARY KEY(patientID)
);

CREATE TABLE MedicalRecord(
	med_recordID SERIAL NOT NULL,
	medication VARCHAR(1000),
	illnesses VARCHAR(1000),
	patientID INT NOT NULL,
	PRIMARY KEY(med_recordID),
	FOREIGN KEY(patientID) REFERENCES Patient(patientID)
);


CREATE TABLE EmployeePatient(
	employeeID INT NOT NULL REFERENCES Employee(employeeID),
	patientID INT NOT NULL REFERENCES Patient(patientID),
	PRIMARY KEY(employeeID, patientID)
);

CREATE TABLE Inpatient(
	patientID INT NOT NULL REFERENCES Patient(patientID),
	departmentID INT NOT NULL REFERENCES Department(departmentID),
	room_num VARCHAR(6) NOT NULL REFERENCES Room(room_num),
	PRIMARY KEY(patientID, departmentID, room_num)
);



