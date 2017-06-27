const mongoose = require('mongoose');

let validEmailChecker = (email) => {
    if(!email) {
        return false;
    } else {
        const emailRegex = new RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
        return emailRegex.test(email);
    }
}

const emailValidators = [
{
    validator: validEmailChecker,
    message: 'Must be a valid Email'
}];

let validfirstnameChecker = (firstname) => {
    if(!firstname) {
        return false;
    } else {
        const nameRegex = new RegExp(/^[a-zA-Z ]{2,30}$/);
        return nameRegex.test(firstname);
    }
};

const firstnameValidators = [   
    {
        validator: validfirstnameChecker,
        message: 'First name should not contain any special characters'
    }
];

let validlastnameChecker = (lastname) => {
    if(!lastname) {
        return false;
    } else {
        const nameRegex = new RegExp(/^[a-zA-Z ]{2,30}$/);
        return nameRegex.test(lastname);
    }
};

const lastnameValidators = [   
    {
        validator: validlastnameChecker,
        message: 'last name should not contain any special characters'
    }
];

let validcityChecker = (city) => {
    if(!city) {
        return false;
    } else {
        const nameRegex = new RegExp(/^[a-zA-Z ]{2,30}$/);
        return nameRegex.test(city);
    }
};

const cityValidators = [   
    {
        validator: validcityChecker,
        message: 'City should not contain any special characters'
    }
];

const employeeSchema = mongoose.Schema({
    firstname: { type: String, validate: firstnameValidators },
    lastname: { type: String, validate: lastnameValidators },
    email: { type: String, validate: emailValidators },
    password: { type: String },
    dob: { type: Date },
    city: { type: String, validate: cityValidators },
    userType: { type: String },
    userStatus: { type: String }
});

module.exports = mongoose.model('Employee', employeeSchema);