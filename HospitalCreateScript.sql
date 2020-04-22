CREATE TABLE Unit(
	unitID INT NOT NULL,
	floor_num INT NOT NULL,
	unit_name VARCHAR(100) NOT NUll,
	PRIMARY KEY(unitID)
);
/* Unit needs association to Room and Employee*/

CREATE TABLE Room(
	room_num INT NOT NULL,
	occupied BOOLEAN NOT NULL,
	floor_num INT NOT NULL,
	PRIMARY KEY(room_num),
	FOREIGN KEY(floor_num) REFERENCES Unit(floor_num)
)
/* Room needs association to Patient */

CREATE TABLE Employee(
	employeeID INT CHECK(employeeID > 100000 AND employeeID < 999999) NOT NULL,
	first_name VARCHAR(100) NOT NULL,
	middle_name VARCHAR(100),
	last_name VARCHAR(100) NOT NULL,
	ssn VARCHAR(9) CHECK(length(ssn)== 9) NOT NULL,
	birthday VARCHAR(100) NOT NULL,
	sex CHAR(1) CHECK(sex = 'M' OR sex = 'F') NOT NULL,
	address VARCHAR(100) NOT NULL,
	phone VARCHAR(10) CHECK(LENGTH(phone == 10)) NOT NULL,
	occupation VARCHAR(100) NOT NULL,
	salary INT NOT NULL
	PRIMARY KEY(employeeID)
	)	
/* Employee needs association with Unit and Patient */
	
	CREATE TABLE Patient(
		patientID SERIAL NOT NULL,
		first_name VARCHAR(100) NOT NULL,
		middle_name VARCHAR(100),
		last_name VARCHAR(100) NOT NULL,
		birthday, VARCHAR(100) NOT NULL,
		sex CHAR(1) CHECK(sex = 'M' OR sex = 'F') NOT NULL,
		address VARCHAR(100) NOT NULL,
		phone VARCHAR(10) CHECK(LENGTH(phone == 10)) NOT NULL,
		PRIMARY KEY(patientID)
	)
/*Needs association with Inpatient and Medical Record*/

	CREATE TABLE Inpatient(
		patientID INT NOT NULL,
		floor_num INT NOT NULL,
		room_num INT NOT NULL,
		empl
		FOREIGN KEY(patientID) REFERENCES Patient(patientID),
		FOREIGN KEY(patientID) REFERENCES Unit(floor_num),
		FOREIGN KEY(patientID) REFERENCES Patient(patientID),
	)

