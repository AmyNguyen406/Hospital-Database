CREATE TABLE Unit(
	unitID INT NOT NULL,
	floor_num INT NOT NULL UNIQUE, /* Need UNIQUE constaint to prevent no unique constraint matching given keys for ref table */
	unit_name VARCHAR(100) NOT NUll,
	PRIMARY KEY(unitID)
);

CREATE TABLE Room(
	room_num INT NOT NULL,
	occupied BOOLEAN NOT NULL,
	PRIMARY KEY(room_num)
);

CREATE TABLE UnitRooms(
	unitID INT NOT NULL REFERENCES Unit(unitID),
	room_num INT NOT NULL REFERENCES Room(room_num),
	PRIMARY KEY(unitID, room_num)
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
	unitID INT NOT NULL,
	PRIMARY KEY(employeeID),
	FOREIGN KEY(unitID) REFERENCES Unit(unitID)
);	

CREATE TABLE Inpatient(
	inpatientID INT NOT NULL,
	floor_num INT NOT NULL,
	room_num INT NOT NULL,
	PRIMARY KEY(inpatientID),
	FOREIGN KEY(floor_num) REFERENCES Unit(floor_num),
	FOREIGN KEY(room_num) REFERENCES Room(room_num)
);

CREATE TABLE MedicalRecord(
	med_recordID SERIAL NOT NULL,
	medication VARCHAR(1000),
	illnesses VARCHAR(1000),
	PRIMARY KEY(med_recordID)
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
	inpatientID INT NOT NULL,
	med_recordID INT NOT NULL,
	FOREIGN KEY(inpatientID) REFERENCES Inpatient(inpatientID),
	FOREIGN KEY(med_recordID) REFERENCES MedicalRecord(med_recordID),
	PRIMARY KEY(patientID)
);

CREATE TABLE EmployeePatient(
	employeeID INT NOT NULL REFERENCES Employee(employeeID),
	patientID INT NOT NULL REFERENCES Patient(patientID),
	PRIMARY KEY(employeeID, patientID)
);



