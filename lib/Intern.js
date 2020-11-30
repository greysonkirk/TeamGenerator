//Adding on to the Employee class for interns 
const Employee = require("./Employee");
class Manager extends Employee {
    constructor(name, id, email, school) {

        super(name, id, email);

        this.school = school;
    }
    getSchool() {
        return this.school
    }

    getRole() {
        return 'Intern'
    }

}

module.exports = Manager;