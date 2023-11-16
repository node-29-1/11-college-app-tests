const Course = require('./Course');
const Student = require('./Student');

Course.belongsToMany(Student, { through: 'CourseStudent' });
Student.belongsToMany(Course, { through: 'CourseStudent' });
