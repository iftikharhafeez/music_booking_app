const moment = require('moment');
class BookingDto {
    constructor(data) {
      this.id = data.id;
      this.eventId = data.eventId; // Optionally map to EventDto if needed
      this.userId = data.userId;   // Optionally map to UserDto if needed
      this.quantity = data.quantity;
      this.totalPrice = data.totalPrice;
      this.bookingDate = moment(data.bookingDate).toISOString();
    }
}
  
  module.exports = BookingDto;