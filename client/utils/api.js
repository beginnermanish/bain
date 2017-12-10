const baseUrl = 'http://localhost:3000/'
module.exports = {
    login: baseUrl + 'login',
    search: baseUrl + 'api/rooms',
    room: baseUrl + 'api/room',
    reserve: baseUrl + 'api/rooms/book',
    providers: baseUrl + 'api/providers'
};