// this file can be further modularized by splitting into separate files for each type of resolver
// but for simplicity, we keep it in one file

const { create } = require('lodash');
const { UserModel, ArtistModel, EventModel, BookingModel } = require('../models/db');

const resolvers = {
  Query: {
    artists: async () => {
      // Fetch all artists from the database
      return await ArtistModel.getArtists();
    },
    artist: async (_, { id }) => {
      return await ArtistModel.getArtistById(id);
    },
    events: async () => {
      return await EventModel.getEvents();
    },
    event: async (_, { id }) => {
      return await EventModel.getEventById(id);
    },
    bookings: async () => {
      return await BookingModel.getBookings();
    }
  },

  Mutation: {
    createUser: async (_, { name, email }) => {
      // Create a new user in the database
      return await UserModel.createUser({ name, email });
    },
    createArtist: async (_, { name, bio, genre, socialLinks }) => {
      return await ArtistModel.createArtist({ name, bio, genre, socialLinks });
    },
    createEvent: async (_, { title, description, date, location, artistId, availableTickets, price }) => {
      return await EventModel.createEvent({ title, description, date, location, artistId, availableTickets, price });
    },
    bookEvent: async (_, { eventId, userId, quantity }) => {
      // Example booking process with availability check and transaction handling
      const event = await EventModel.getEventById(eventId);
      if (!event || event.availableTickets < quantity) {
        throw new Error('Not enough tickets available');
      }
      return await BookingModel.bookEvent({ eventId, userId, quantity, totalPrice: event.price * quantity });
    }
  },

  Artist: {
    events: async (artist) => {
      return await EventModel.getEventsByArtist(artist.id);
    }
  },

  Event: {
    artist: async (event) => {
      return await ArtistModel.getArtistById(event.artistId);
    }
  },

  Booking: {
    event: async (booking) => {
      return await EventModel.getEventById(booking.eventId);
    },
    user: async (booking) => {
      return await UserModel.getUserById(booking.userId);
    }
  }
};

module.exports = resolvers;
