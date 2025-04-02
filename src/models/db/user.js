const UserDTO = require('../data/user_dto');
const knex = require('./knex');
const _ = require('lodash');

const ALL_FIELDS = ['id', 'name', 'email'];

function createUserObj(data) {
    if (_.isEmpty(data)) return null;

    return new UserDTO(data);
}

module.exports = () => {
    async function createUser({ name, email }){
        const [user] = await knex('users')
            .insert({ name, email })
            .returning(ALL_FIELDS);

        return createUserObj(user);
    };
    
    async function getUserById(userId) {
        const user = await knex('users').where({ id: userId }).first();
        return createUserObj(user);
    };

    async function getUsers() {
        const users = await knex('users').select(ALL_FIELDS);
        return users.map(createUserObj);
    };

    async function updateUser(userId, data) {
        const [user] = await knex('users')
            .where({ id: userId })
            .update(data)
            .returning(ALL_FIELDS);

        return createUserObj(user);
    };
    async function deleteUser(userId) {
        const [user] = await knex('users')
            .where({ id: userId })
            .del()
            .returning(ALL_FIELDS);

        return createUserObj(user);
    };

    return {
        createUser,
        getUsers,
        getUserById,
        updateUser,
        deleteUser
    };
};
