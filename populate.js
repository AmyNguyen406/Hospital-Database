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

// Connect to Hospital database
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


const insertEmployee = async(employeeID, first_name, middle_name, last_name, ssn, birthday, sex, 
    address, phone, occupation, salary, departmentID) => {
    try{
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

const getNewestEmployeeID = async() => {
    try{
        var result = await hospitalDatabase.query(
            `SELECT employeeID
            FROM Employee
            ORDER BY employeeID DESC
            LIMIT 1;
            `
        );

        var newestEmployeeID = result.rows[0]['employeeid']; //This is not a 2D array, this is returning the JSON object field, employeeid's, value. 
        console.log(`Most recent employeeID is ${newestEmployeeID}.`);
        return newestEmployeeID;

    }
    catch(error){
        console.error(`Unable to find newest employee ID inserted: ${error}`);
        return null;
    }
    
}


start();
//insertEmployee(100010, `Tomoi`, `Davaidoi`, `Asuncoi`, 112548976, `05/02/1969`, `M`, `Fort Worth, TX`, `8005980485`, `Doctor`, 200000, 3);
getNewestEmployeeID();



