/*
    * This is the script for autopopulating entries for the database.
    * Tables for autopopulating: Employee, Patient, MedicalRecord, EmployeePatient, Inpatient.
*/

// First install pg from the commpand line using: npm install pg
// Create a client object that will require the pg library
const { Client } = require('pg');

// Filling out info for database connection.
const hospitalDatabase = new Client({

    user: 'postgres',
    password: 'password',
    host: 'localhost',
    port: 5432,
    database: 'Hospital'
});

/**
 * Creates a connection to the database - must be invoked before running any other scripts on the database!
 */
const start = async() => {
    try {
        await hospitalDatabase.connect();
        console.log(`Connected to ${hospitalDatabase.database} on port ${hospitalDatabase.port}`);
        return true;
    }

    catch(error) {
        console.error(`Unable to connect: ${error}`);
        return false;
    }
}


/**
 * Inserts an employee into the database
 * @param {[PK] INT} employeeID 
 * @param {VARCHAR(100)} first_name 
 * @param {VARCHAR(100)} middle_name 
 * @param {VARCHAR(100)} last_name 
 * @param {VARCHAR(9)} ssn 
 * @param {VARCHAR(100)} birthday 
 * @param {CHAR(1)} sex 
 * @param {VARCHAR(100)} address 
 * @param {VARCHAR(10)} phone 
 * @param {VARCHAR(100)} occupation 
 * @param {INT} salary 
 * @param {INT} departmentID 
 */
const insertEmployee = async(employeeID, first_name, middle_name, last_name, ssn, birthday, sex, 
    address, phone, occupation, salary, departmentID) => {
    try {
        await hospitalDatabase.query(
            `INSERT INTO Employee(employeeID, first_name, middle_name, last_name, ssn, birthday, sex, 
                address, phone, occupation, salary, departmentID)
            VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,[employeeID, first_name, middle_name, last_name, ssn, birthday, sex, 
                address, phone, occupation, salary, departmentID]
        );
        console.log(`Employee added.`)
        return true;
    }

    catch(error) {
        console.error(`Unable to insert employee: ${error}`);
        return false;
    }
}

/**
 * Returns an INT value of the newest employee ID - used in conjuction with the fillEmployeeData() method
 */
const getNewestEmployeeID = async() => {
    try {
        var result = await hospitalDatabase.query(
            `SELECT employeeID
            FROM Employee
            ORDER BY employeeID DESC
            LIMIT 1;
            `
        );
        var newestEmployeeID = Number(result.rows[0]["employeeid"]); // Returns the JSON object element, the employeeId's, value
        console.log(`Most recent employeeID is ${newestEmployeeID}.`);
        return newestEmployeeID;
    }
    
    catch(error) {
        console.error(`Unable to find newest employee ID inserted: ${error}`);
        return null;
    }
}

/**
 * Fills in the employee table with a number of employees to fill. This will continously call insertEmployee() and getNewestEmployeeID()
 *  'n' amount of times to generate employees. The employee data will be randomly generated through the use of libraries
 * @param {int} numberOfEmployees 
 */
const fillEmployeeData = async(numberOfEmployees) => {
    try {
        for(var i=0; i < numberOfEmployees; i++) {

            var newestEmployeeID = await getNewestEmployeeID() + 1;
            var randomSSN = Math.random().toString().slice(2,11); // Generates a random 9 digit number between 0 - 1 in string format (adjust the 11 to change the size)
            var randomPhone = Math.random().toString().slice(2,12); // Generates a random 10 digit number between 0 - 1 in string format (adjust the 12 to change the size)
            var randomDepartmentID = Math.floor(Math.random() * 4) + 1  ; // Generate a random number between 1 and 4
            

            insertEmployee(newestEmployeeID, "First Name", "Middle Name", "Last Name", randomSSN, "00/00/0000", "M", "City, State", randomPhone, "Doctor", 100000, randomDepartmentID); // TODO: fill this info with generated data
            
        }
    }

    catch(error) {
        console.error(`Unable to fill employee data - details: ${error}`);
        return null;
    }
}


start();
//insertEmployee(100010, `Tomoi`, `Davaidoi`, `Asuncoi`, 112548976, `05/02/1969`, `M`, `Fort Worth, TX`, `8005980485`, `Doctor`, 200000, 3);
fillEmployeeData(1);
// getNewestEmployeeID();



