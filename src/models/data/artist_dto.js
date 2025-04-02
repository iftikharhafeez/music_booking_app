class ArtistDto {
    constructor(data) {
      this.id = data.id;
      this.name = data.name;
      this.bio = data.bio;
      this.genre = data.genre;
      this.socialLinks = data.socialLinks; // Expecting an array of strings
      this.events = data.events; // Optionally map to EventDto if needed
    }
  }
  
module.exports = ArtistDto;