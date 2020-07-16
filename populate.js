/*
    * This is the script for autopopulating entries for the database.
    * Tables for autopopulating: Employee, Patient, MedicalRecord, EmployeePatient, Inpatient.
*/

// First install pg from the commpand line using: npm install pg
// Create a client object that will require the pg library
const { Client } = require('pg');
var randomFName = require('./firstnames.json');
var randomMName = require('./middlenames.json');
var randomName = require('node-random-name');
const cityData = require('./areas.json');

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
 * Parameters for Employee Table
 * @param {[PK] INT} employeeid 
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

/**
 * Parameters for EmployeePatient Table (Asssociation Table)
 * @param {[PK] INT} employeeid 
 * @param {[PK] INT} patientid 
*/

/**
 * Parameters for Inpatient Table (Association Table)
 * @param {[PK] integer} patientid
 * @param {[PK] integer} departmentID
 * @param {[PK] VARCHAR(6)} room_num
*/

/**
 * Parameters for MedicalRecord Table
 * @param {[PK] integer} med_recordid
 * @param {VARCHAR(1000)} medication
 * @param {VARCHAR(1000)} illnesses
 * @param {INT} patientid
*/

/**
 *  Parameters for Patient Table
 * @param {[PK] INT} patientid 
 * @param {VARCHAR(100)} first_name 
 * @param {VARCHAR(100)} middle_name 
 * @param {VARCHAR(100)} last_name 
 * @param {VARCHAR(100)} birthday 
 * @param {CHAR(1)} sex 
 * @param {VARCHAR(100)} address 
 * @param {VARCHAR(10)} phone 
 * @param {BOOLEAN} inpatient
*/

/**
 * Parameters for Room
 * @param {[PK]VARCHAR(6)} room_num
 * @param {BOOLEAN} occupied
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
        // console.log(`Most recent employeeID is ${newestEmployeeID}.`);
        return newestEmployeeID;
    }
    
    catch(error) {
        console.error(`Unable to find newest employee ID inserted: ${error}`);
        return null;
    }
}

const generateSex = async() => {
    try{
        var sexID = Math.floor(Math.random() * Math.floor(2)); //Generates either 0 or 1

        if(sexID == 0){
            return 'M';
        } 
        else{
            return 'F';
        }
    }
    catch(error){
        console.error(`Unable to generate sex: ${error}`);
    }
}

const generateFirstName = async(sex) => {
    try{
        if (sex == 'M'){
            return randomFName.MaleName[Math.floor(Math.random() * Math.floor(999))];
        }
        else{
            return randomFName.FemaleName[Math.floor(Math.random() * Math.floor(999))];
        }
    }
    catch(error){
        console.error(`Unable to generate first name: ${error}`);
        return null;
    }
}

const generateMiddleName = async(sex) => {
    try{
        if (sex == 'M'){
            return randomMName.MaleName[Math.floor(Math.random() * Math.floor(999))];
        }
        else{
            return randomMName.FemaleName[Math.floor(Math.random() * Math.floor(999))];
        }
    }
    catch(error){
        console.error(`Unable to generate middle name: ${error}`);
        return null;
    }
}

const generateBirthDate = async() => {
    try{
        var month =  (Math.floor(Math.random() * (13 - 1)) + 1).toString(); //Generates random number from 1-12 and cast to string
        var day = (Math.floor(Math.random() * (29 - 1)) + 1).toString(); //Generates random number from 1-28 and cast to string
        var year = (Math.floor(Math.random() * (1999 - 1945)) + 1945).toString(); //Generates random number from 1945-1999 and cast to string
        
        return month + "/" + day + "/" + year;
    }
    catch(error){
        console.error(`Unable to generate birthdate: ${error}`);
        return null;
    }
}

const generateLocation = async() => {
    try{
        const randomCityNumber = Math.floor(Math.random() * (84 - 0)) + 0;
        return cityData.Texas[randomCityNumber] + ", TX";
    }
    catch(error){
        console.error(`Unable to generate location: ${error}`);
        return null;
    }
}

const generateOccupation = async() => {
    try{
        var sexID = Math.floor(Math.random() * Math.floor(2)); //Generates either 0 or 1

        if(sexID == 0){
            return 'Doctor';
        } 
        else{
            return 'Nurse';
        }
    }
    catch(error){
        console.error(`Unable to generate sex: ${error}`);
    }
}

const generateSalary = async(occupation) => {
    try{
        if (occupation == 'Nurse'){
            return Math.floor(Math.random() * 95000) + 50000; //generate random number between 50,000 and 95,000

        }
        else {
            return Math.floor(Math.random() * 300000) + 115000; //generate random number between 115,000 and 300,000  
        }
    }
    catch(error){
        console.error(`Unable to generate salary: ${error}`);
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
            var sex = await generateSex();
            var firstName = await generateFirstName(sex);
            var middleName = await generateMiddleName(sex);
            var lastName = await randomName({last: true});
            var dob = await generateBirthDate();
            var address = await generateLocation();
            var occupation = await generateOccupation();
            var salary = await generateSalary(occupation);

            insertEmployee(newestEmployeeID, firstName, middleName, lastName, randomSSN, dob, sex, address, randomPhone, occupation, salary, randomDepartmentID);
            
        }
    }

    catch(error) {
        console.error(`Unable to fill employee data - details: ${error}`);
        return null;
    }
}


start();

fillEmployeeData(1500);




