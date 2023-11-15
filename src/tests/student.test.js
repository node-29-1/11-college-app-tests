const request = require('supertest');
const app = require('../app');

let id;

test("GET /students debería traerme todos los estudiantes", async () => {
    const res = await request(app).get('/students');
    expect(res.status).toBe(200);
    expect(res.body).toBeInstanceOf(Array);
});


test("POST /students debe crear un estudiante", async () => {
    const student = {
        name: "Cesar",
        birthday: "1995-10-10",
        program: "Ingeniería informática",
    }
    const res = await request(app).post('/students').send(student);
    id = res.body.id;
    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe(student.name);
});


test('PUT /students/:id debe actualizar un estudiante', async () => {
    const student = {
        name: "Cesar actualizado"
    }
    const res = await request(app).put(`/students/${id}`).send(student);
    expect(res.status).toBe(200);
    expect(res.body.name).toBe(student.name);
});


test('DELETE /students/:id debe eliminar un estudiante', async () => {
    const res = await request(app).delete(`/students/${id}`);
    expect(res.status).toBe(204);
});
