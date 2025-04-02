const UserModel = require('./user')();
const ArtistModel = require('./artist')();
const EventModel = require('./event')();
const BookingModel = require('./booking')();

module.exports = {
  UserModel,
  ArtistModel,
  EventModel,
  BookingModel
};