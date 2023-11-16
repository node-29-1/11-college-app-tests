const request = require('supertest');
const app = require('../app');
const Student = require('../models/Student');
require('../models');

let id;

test('GET /courses debe traer todas las materias', async () => {
    const res = await request(app).get('/courses');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});

test('POST /courses debe crear un curso', async () => {
    const course = {
        name: "Programación",
        credits: 5,
    }
    const res = await request(app).post('/courses').send(course);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(course.name);
});

test('PUT /courses/:id debe actualizar un curso', async () => {
    const course = {
        name: "Programación actualizada"
    }
    const res = await request(app).put(`/courses/${id}`).send(course);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(course.name);
});

test('POST /courses/:id/students debe insertar los estudiantes del curso', async () => {
    const student = await Student.create({
        name: "Alexander",
        birthday: "1995-10-10",
        program: "Ingeniería informática",
    });
    const res = await request(app)
        .post(`/courses/${id}/students`)
        .send([student.id]);
    await student.destroy();
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(1);
});

test('DELETE /courses/:id debe eliminar un curso', async () => {
    const res = await request(app).delete(`/courses/${id}`);
    expect(res.status).toBe(204);
});


