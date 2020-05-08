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

start();