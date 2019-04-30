const express = require('express');
const HttpStatus = require('http-status-codes');
const bodyParser = require('body-parser');

const PeopleService = require('./people-service');
const peopleService = new PeopleService();
const app = express();
const v1 = express.Router();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/api/v1', v1);

v1.put('/people/:id', async (request, response) => {
    const id = request.params.id;
    const object = request.body;

    const people = peopleService.updatePeople(id, object);

    if (people) {
        response.sendStatus(HttpStatus.OK);
    } else {
        response.sendStatus(HttpStatus.NOT_FOUND);
    }
});

v1.get('/people', async (request, response) => {
    const data = await peopleService.getPeople(request.query);

    data ? response.send(data) : response.sendStatus(HttpStatus.NOT_FOUND);
});

module.exports = app;
