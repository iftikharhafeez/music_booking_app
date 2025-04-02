const EventDTO = require('../data/event_dto');
const knex = require('./knex');
const ALL_FIELDS = ['id', 'title', 'description', 'date', 'location', 'artist_id as artistId', 'available_tickets as availableTickets', 'price'];
const _ = require('lodash');

function createEventObj(data) {
    if (_.isEmpty(data)) return null;

    return new EventDTO(data);
}
module.exports = () => {
    async function createEvent({ title, description, date, location, artistId, availableTickets, price }) {
        const [event] = await knex('events')
            .insert({ title, description, date, location, artist_id: artistId, available_tickets: availableTickets, price })
            .returning(ALL_FIELDS);

        return createEventObj(event);
    };

    async function getEvents() {
        const events = await knex('events').select(ALL_FIELDS);
        return events.map(createEventObj);
    };
    async function getEventById(eventId) {
        const event = await knex('events').select(ALL_FIELDS).where({ id: eventId }).first();
        return createEventObj(event);
    };
    async function updateEvent(eventId, data) {
        const [event] = await knex('events')
            .where({ id: eventId })
            .update(data)
            .returning(ALL_FIELDS);

        return createEventObj(event);
    };
    async function deleteEvent(eventId) {
        const [event] = await knex('events')
            .where({ id: eventId })
            .del()
            .returning(ALL_FIELDS);

        return createEventObj(event);
    };

    return {
        createEvent,
        getEvents,
        getEventById,
        updateEvent,
        deleteEvent
    };
}