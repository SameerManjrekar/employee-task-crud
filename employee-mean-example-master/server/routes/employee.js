const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');

router.get('/allemployees', (req, res, next) => {
    Employee.collection.find({}).toArray((err, employee) => {
        if (err) {
            res.json({ success: false, message: 'Error in Getting all records ', err });
        } else {
            res.json({ success: true, message: employee });
        }
    });
});

router.post('/saveemployee', (req, res, next) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const email = req.body.email;
    const password = req.body.password;
    const dob = req.body.dob;
    const city = req.body.city;
    const userType = req.body.userType;
    const userStatus = req.body.userStatus;

    if (!firstname) {
        res.json({ success: false, message: 'First name is required' });
    } else {
        if (!lastname) {
            res.json({ success: false, message: 'Last name is required' });
        } else {
            if (!email) {
                res.json({ success: false, message: 'Email is required' });
            } else {
                if (!password) {
                    res.json({ success: false, message: 'Password is required' });
                } else {
                    if (!city) {
                        res.json({ success: false, message: 'City is required' });
                    } else {
                        if (!userType) {
                            res.json({ success: false, message: 'User Type is required' });
                        } else {
                            if (!userStatus) {
                                res.json({ success: false, message: 'User Status is required' });
                            } else {
                                Employee.findOne({ email: email }, (err, existingemail) => {
                                    if (err) {
                                        res.json({ success: false, message: err });
                                    }
                                    if (existingemail) {
                                        res.json({ success: false, message: 'Email Id already exists' });
                                    }

                                    let newEmployee = new Employee({
                                        firstname: firstname,
                                        lastname: lastname,
                                        email: email,
                                        password: password,
                                        dob: dob,
                                        city: city,
                                        userType: userType,
                                        userStatus: userStatus
                                    });

                                    newEmployee.save((err, employee) => {
                                        if (err) {
                                            res.json({ success: false, message: 'Error in creating a new employee' });
                                        } else {
                                            res.json({ success: true, message: 'Employee created successfully ' });
                                        }
                                    });
                                });
                            }
                        }
                    }
                }
            }
        }
    }
});

router.get('/:id', (req, res, next) => {
    if (req.params.id === null) {
        res.json({ success: false, message: 'Id not available' });
    } else {
        Employee.find({ _id: req.params.id }).exec((err, employee) => {
            if (err) {
                res.json({ success: false, message: 'Employee Not Found' });
            } else {
                res.json({ success: true, message: employee });
            }
        });
    }
});

router.put('/:id', (req, res, next) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    const dob = req.body.dob;
    const city = req.body.city;
    const userType = req.body.userType;
    const userStatus = req.body.userStatus;
    const empId = req.params.id;    
    if (!firstname || !lastname || !password || !dob || !city || !userType || !userStatus || !empId) {
        res.json({ success: false, message: 'All Mandatory fields are compulsory' });
    } else {
        Employee.findById(empId).exec((err, emp) => {
            if (err) {
                res.json({ success: false, message: 'No Employee Found' });
            }

            if (emp) {
                emp.firstname = firstname,
                emp.lastname = lastname,
                emp.password = password,
                emp.dob = dob,
                emp.city = city,
                emp.userType = userType,
                emp.userStatus = userStatus
            }

            emp.save((err) => {
                if (err) {
                    res.json({ success: false, message: 'Error processing request ', err });
                } else {
                    res.json({ success: true, message: 'Employee details updated successfully' });
                }
            });
        });
    }
});

router.delete('/:id', (req, res, next) => {
    if (req.params.id === null) {
        res.json({ success: false, message: 'Id not available' });
    } else {
        Employee.remove({ _id: req.params.id }).exec((err) => {
            if (err) {
                res.json({ success: false, message: 'Error in Delete Request ', err });
            } else {
                res.json({ success: true, message: 'Employee deleted successfully' });
            }
        });
    }
});

module.exports = router;