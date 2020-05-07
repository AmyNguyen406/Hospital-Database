/* Insert data */

/* Adding Departments */
INSERT INTO Department (floor_num, department_name)
VALUES
	('1', 'Admissions'),
	('1', 'Emergency Department'),
	('2', 'General Wellness'),
	('2', 'Imaging and Radiology'),
	('3', 'Anesthesiology and Pain Management'),
	('3', 'Surgery Department');

/* Adding rooms. Room number is formatted as the floor number being in the hundredths place
and the room number in tenths and ones place. */
INSERT INTO Room (room_num, occupied)
VALUES 
	('101', FALSE),
	('102', FALSE),
	('103', FALSE),
	('104', FALSE),
	('105', FALSE),
	('106', FALSE),
	('107', FALSE),
	('108', FALSE),
	('109', FALSE),
	('110', FALSE),
	('111', FALSE),
	('112', FALSE),
	('113', FALSE),
	('114', FALSE),
	('115', FALSE),
	('201', FALSE),
	('202', FALSE),
	('203', FALSE),
	('204', FALSE),
	('205', FALSE),
	('206', FALSE),
	('207', FALSE),
	('208', FALSE),
	('209', FALSE),
	('210', FALSE),
	('211', FALSE),
	('212', FALSE),
	('213', FALSE),
	('214', FALSE),
	('215', FALSE),
	('301', FALSE),
	('302', FALSE),
	('303', FALSE),
	('304', FALSE),
	('305', FALSE),
	('306', FALSE),
	('307', FALSE),
	('308', FALSE),
	('309', FALSE),
	('310', FALSE),
	('311', FALSE),
	('312', FALSE),
	('313', FALSE),
	('314', FALSE),
	('315', FALSE);

/*Association table used to tie together which rooms are used for which departments. */
INSERT INTO DepartmentRooms (departmentID, room_num)
VALUES
	(1, '101'),
	(1, '102'),
	(1, '103'),
	(1, '104'),
	(2, '105'),
	(2, '106'),
	(2, '107'),
	(2, '108'),
	(2, '109'),
	(2, '110'),
	(2, '111'),
	(2, '112'),
	(2, '113'),
	(2, '114'),
	(2, '115'),
	(3, '201'),
	(3, '202'),
	(3, '203'),
	(3, '204'),
	(3, '205'),
	(3, '206'),
	(3, '207'),
	(4, '208'),
	(4, '209'),
	(4, '210'),
	(4, '211'),
	(4, '212'),
	(4, '213'),
	(4, '214'),
	(4, '215'),
	(5, '301'),
	(5, '302'),
	(5, '303'),
	(5, '304'),
	(5, '305'),
	(5, '306'),
	(5, '307'),
	(5, '308'),
	(5, '309'),
	(5, '310'),
	(5, '311'),
	(6, '312'),
	(6, '313'),
	(6, '314'),
	(6, '315');


INSERT INTO Employee(employeeID, first_name, middle_name, last_name, ssn, birthday, sex, 
			address, phone, occupation, salary, departmentID)
VALUES
	(100001, 'Simon', 'Ghost', 'Riley', 111111111, '12-02-1968', 'M', 'Dallas, TX', '1234567890', 'Doctor', 150000, 2),
	(100002, 'Sandra', 'Ashley', 'Smith', 222222222, '01-15-1975', 'F', 'Carrollton, TX', '1458965841', 'Nurse', 90000, 1),
	(100003, 'Ashe', 'Laura', 'Grey', 333333333, '06-04-1986', 'F', 'Dallas, TX', '6489563218', 'Doctor', 140000, 3),
	(100004, 'Robert', 'Carl', 'Sanders', 444444444, '05-23-1990', 'M', 'Dallas, TX', '7485123654', 'Nurse', 65000, 3),
	(100005, 'Soojin', 'Mina', 'Kim', 555555555, '11-15-1989', 'F', 'Addison, TX', '9578164358', 'Doctor', 160000, 5),
	(100006, 'Chelsea', 'Elizabeth', 'Jones', 666666666, '07-12-1978', 'F', 'Dallas, TX', '1238954769', 'Doctor', 150000, 6),
	(100007, 'Kelly', 'Kayla', 'Turner', 777777777, '06-16-1994', 'F', 'Plano, TX', '1236571028', 'Nurse', 65000, 2),
	(100008, 'Mykie', 'Azalea', 'Forrest', 888888888, '10-20-1997', 'F', 'Dallas, TX', '1098346507', 'Nurse', 60000, 4),
	(100009, 'Alejandro', 'Emilio', 'Blanco', 999999999, '03-22-1965', 'M', 'Dallas, TX', '2039876042', 'Nurse', 85000, 5);
	
	
INSERT INTO MedicalRecord(medication, illnesses)
VALUES
	('Fluticasone', 'Asthma'),
	('Cetirizine', 'Seasonal Allergies'),
	('Levothyroxine', 'Hypothyroidism'),
	('Benazepril', 'High Blood Pressure'),
	('Triamcinolone acetonide, Cetirizine', 'Eczema'); 
	 
INSERT INTO Patient(first_name, middle_name, last_name, birthday, sex, address, phone, med_recordID, inpatient)
VALUES
	 ('Anisa', 'Lacey', 'Jones', '04-02-1999', 'F', 'Carrollton, TX', '9854651204', 1, TRUE),
	 ('Ansu', null, 'Mani', '03-15-1979', 'F', 'Plano, TX', '2142220047', 2, FALSE),
	 ('Louis', null, 'George', '09-21-1969', 'M', 'Dallas, TX', '9729899961', 3, FALSE),
	 ('Sophia', 'Iris', 'Mendez', '10-22-1984', 'F', 'Dallas, TX', '4124445863', 4, TRUE),
	 ('Spencer', 'Jackson', 'Reid', '02-02-1999', 'M', 'Dallas, TX', '5158790362', 5, FALSE);

INSERT INTO EmployeePatient(employeeID, patientID)
VALUES
	 (100001, 1),
	 (100007, 1),
	 (100003, 2),
	 (100003, 3),
	 (100006, 4),
	 (100003, 5);


INSERT INTO Inpatient(patientID, departmentID, room_num)
VALUES
	(1, 1, '101'),
	(4, 3, '311');