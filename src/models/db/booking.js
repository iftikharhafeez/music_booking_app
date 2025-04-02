const BookingDTO = require('../data/booking_dto');
const knex = require('./knex');
const ALL_FIELDS = ['id', 'user_id as userId', 'event_id as eventId', 'booking_date as bookingDate', 'quantity', 'total_price as totalPrice'];
const _ = require('lodash');

function createBookingObj(data) {
    if (_.isEmpty(data)) return null;

    return new BookingDTO(data);
}

module.exports = () => {

  async function getBookings() {
      const bookings = await knex('bookings').select(ALL_FIELDS);
      return bookings.map(createBookingObj);
  };

  async function getBookingById(bookingId) {
      const booking = await knex('bookings').where({ id: bookingId }).first();
      return createBookingObj(booking);
  };

  const bookEvent = async ({ eventId, userId, quantity, totalPrice }) => {
    return await knex.transaction(async trx => {
      const event = await trx('events')
        .where({ id: eventId })
        .select('available_tickets')
        .forUpdate()
        .first();
  
      if (!event) {
        throw new Error('Event not found');
      }
  
      if (event.available_tickets < quantity) {
        throw new Error('Not enough tickets available');
      }
  
      await trx('events')
        .where({ id: eventId })
        .decrement('available_tickets', quantity);
  
      const [booking] = await trx('bookings')
        .insert({
          event_id: eventId,
          user_id: userId,
          quantity,
          total_price: totalPrice
        })
        .returning(ALL_FIELDS);
  
      return createBookingObj(booking);
    });
  };

  return {
    getBookings,
    getBookingById,
    bookEvent
  };
}

