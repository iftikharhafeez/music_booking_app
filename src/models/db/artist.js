const ArtistDTO = require('../data/artist_dto');
const knex = require('./knex');
const ALL_FIELDS = ['id', 'name', 'bio', 'genre', 'social_links as socialLinks'];
const _ = require('lodash');

function createArtistObj(data) {
    if (_.isEmpty(data)) return null;

    return new ArtistDTO(data);
}

module.exports = () => {
    async function createArtist({ name, bio, genre, socialLinks }) {
        const [artist] = await knex('artists')
            .insert({ name, bio, genre, social_links: JSON.stringify(socialLinks) })
            .returning(ALL_FIELDS);

        return createArtistObj(artist);
    };

    async function getArtists() {
        const artists = await knex('artists').select(ALL_FIELDS);
        return artists.map(createArtistObj);
    };

    async function getArtistById(artistId) {
        const artist = await knex('artists').where({ id: artistId }).first();
        return createArtistObj(artist);
    };
    async function updateArtist(artistId, data) {
        const [artist] = await knex('artists')
            .where({ id: artistId })
            .update(data)
            .returning(ALL_FIELDS);

        return createArtistObj(artist);
    };
    async function deleteArtist(artistId) {
        const [artist] = await knex('artists')
            .where({ id: artistId })
            .del()
            .returning(ALL_FIELDS);

        return createArtistObj(artist);
    };
    async function getArtistEvents(artistId) {
        const events = await knex('events').select(ALL_FIELDS).where({ artist_id: artistId });
        return events;
    };

    async function getArtistByOptions(options) {
        const artist = await knex('artists').where(options).first();
        return createArtistObj(artist);
    }
    async function getArtistsByOptions(options) {
        const artists = await knex('artists').select(ALL_FIELDS).where(options);
        return artists.map(createArtistObj);
    }

    return {
        createArtist,
        getArtists,
        getArtistById,
        updateArtist,
        deleteArtist,
        getArtistEvents,
        getArtistByOptions,
        getArtistsByOptions
    }
}