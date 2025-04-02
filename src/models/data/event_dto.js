const moment = require('moment');
class EventDto {
    constructor(data) {
      this.id = data.id;
      this.title = data.title;
      this.description = data.description;
      this.date = moment(data.date).toISOString(); // Convert date to ISO format
      this.location = data.location;
      this.artist = data.artist; // Optionally map to ArtistDto if needed
      this.availableTickets = data.availableTickets;
      this.price = data.price;
    }
}
  
module.exports = EventDto;